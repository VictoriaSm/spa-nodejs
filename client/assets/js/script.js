function getUrl( url ){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}
var homesObj = JSON.parse(getUrl( 'homes.json' ));
var authRequired = ['/homes', '/edit'];

function isAuth() {
    var hashValue = window.location.hash.replace('#', '/');
    var logoutMenu = document.querySelector('#logoutMenu');
    var loginMenu = document.querySelector('#loginMenu');

    if ( authRequired.indexOf(hashValue) > -1 ){
        HTTP.getToken();

        HTTP.get(hashValue, {}, errorHandler, render);

        function render(res) {
            logoutMenu.classList.add('hide-menu');
            loginMenu.classList.remove('hide-menu');
            console.log('.................',res);
        }
        function errorHandler(code, error) {
            //todo redirect
            document.location.hash = 'login';
        }
    }
}