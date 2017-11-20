function getUrl( url ){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}
var homesObj = JSON.parse(getUrl( 'homes.json' )),
    authRequired = ['#homes', '#edit', '#chat', '#admin'];

function isAuth(callback) {
    var hashValue = document.location.hash,
        logoutMenu = document.querySelector('#logoutMenu'),
        loginMenu = document.querySelector('#loginMenu');

    if ( authRequired.indexOf(hashValue) > -1 ) {
        var t = localStorage.getItem('token');
        if ( t.length > 10 ) {
            logoutMenu.classList.add('hidden');
            loginMenu.classList.remove('hidden');
            callback();
        } else {
            //todo redirect
            document.location.hash = '';
        }
    } else {
        loginMenu.classList.add('hidden');
        logoutMenu.classList.remove('hidden');
        if ( hashValue === '' || hashValue === '#register' ) {
            localStorage.setItem('token', false);
        }
        callback();
    }
}

function logout() {
    HTTP.setToken(false);
}

if ( localStorage.getItem('token') === null ) {
    localStorage.setItem('token', false);
}