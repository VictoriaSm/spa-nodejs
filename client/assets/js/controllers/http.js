var HTTP = (function () {
    var token = false;

    function setToken(_token) {
        token = _token;
    }
    function getToken() {
        return token;
    }
    function send(method, url, params, ecb, scb) {
        var headers = {
            'x-auth': token
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

    return {
        setToken: setToken,
        getToken: getToken,
        get: get,
        post: post,
        put: put
    }

})();

