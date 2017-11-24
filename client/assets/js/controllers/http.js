var HTTP = (function () {
    var token = false;

    function setToken(_token) {
        token = _token;
        localStorage.setItem('token', _token);
    }
    function getToken() {
        return token;
    }
    function send(method, url, params, ecb, scb) {
        var t = token || localStorage.getItem('token');
        var headers = {
            'x-auth': t
        };
        VT.send(method, url, params, ecb, scb, headers)
    }
    function get(url, params, ecb, scb) {
        send('GET',url, params, ecb, scb);
    }
    function post(url, params, ecb, scb) {
        send('POST',url, params, ecb, scb);
    }
    function put(url, params, ecb, scb) {
        send('PUT',url, params, ecb, scb);
    }
    function deleteUser(url, params, ecb, scb) {
        send('DELETE',url, params, ecb, scb);
    }

    return {
        setToken,
        getToken,
        get: get,
        post: post,
        put: put,
        deleteUser: deleteUser
    }

})();