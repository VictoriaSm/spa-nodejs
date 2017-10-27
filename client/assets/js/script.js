function getUrl( url ){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}
var homesObj = JSON.parse(getUrl( 'homes.json' ));
var authRequired = ['#homes', '#edit'];

function isAuth() {
    var isAuth = localStorage.getItem('authorized') == 1;
    var hashValue = window.location.hash;
    var logoutMenu = document.querySelector('#logoutMenu');
    var loginMenu = document.querySelector('#loginMenu');

    if ( authRequired.indexOf(hashValue) > -1 && !isAuth ){
        //todo redirect
        document.location.hash = "login";
    } else if ( isAuth && hashValue === '#login' ) {
            isAuth = localStorage.setItem('authorized', 0);
    }

    if ( isAuth ) {
        logoutMenu.classList.add('hide-menu');
        loginMenu.classList.remove('hide-menu');
    } else {
        loginMenu.classList.add('hide-menu');
        logoutMenu.classList.remove('hide-menu');
    }
}