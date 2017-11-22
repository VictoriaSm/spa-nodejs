function getUrl( url ){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}
var homesObj = JSON.parse(getUrl( 'homes.json' )),
    authRequired = ['#homes', '#edit', '#chat', '#admin', '#users', '#messages'];

function isAuth(callback) {
    var hashValue = document.location.hash,
        logoutMenu = document.querySelector('#logoutMenu'),
        loginMenu = document.querySelector('#loginMenu'),
        adminMenu = document.querySelector('#adminMenu'),
        userMenu = document.querySelector('#userMenu');

    if ( authRequired.indexOf(hashValue) > -1 ) {
        var t = localStorage.getItem('token');
        if ( t.length > 10 ) {
            if ( hashValue === '#admin' || hashValue === '#users' || hashValue === '#messages' ) {
                adminMenu.classList.remove('hidden');
                userMenu.classList.add('hidden');
            } else {
                logoutMenu.classList.add('hidden');
                loginMenu.classList.remove('hidden');
            }

            callback();
        } else {
            //todo redirect
            document.location.hash = '';
        }
    } else {
        adminMenu.classList.add('hidden');
        userMenu.classList.remove('hidden');
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