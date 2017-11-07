function getUrl( url ){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}
var homesObj = JSON.parse(getUrl( 'homes.json' ));
var logoutMenu = document.querySelector('#logoutMenu');
var loginMenu = document.querySelector('#loginMenu');
var authRequired = ['/homes', '/edit'];

function isAuth(callback) {
    var hashValue = document.location.hash.replace('#', '/');

    if ( authRequired.indexOf(hashValue) > -1 ) {
        var t = localStorage.getItem('token');
        if ( t.length > 10 ) {
            logoutMenu.classList.add('hide-menu');
            loginMenu.classList.remove('hide-menu');
            callback();
        } else {
            //todo redirect
            document.location.hash = 'login';
        }
    } else callback();
}

function logout() {
    HTTP.setToken(false);
}