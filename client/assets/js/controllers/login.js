function formLogin() {
    var userInfoLog = {
        login: document.querySelector('.loginLog'),
        password: document.querySelector('.passwordLog')
    };
    var isValue = true;

    var hash;
    var userLog = JSON.parse(localStorage.getItem('user'));

    var validConfig = {
        login: {
            required: true
        },
        password: {
            md5: true
        }
    };

    if ( userLog === null ) {
        return;
    }

    isCoincidence();

    function isCoincidence() {
        VT.obj_forEach(validConfig, function (item, key) {
            if ( item.required ) {
                if (userInfoLog[key].value !== userLog[key]) {
                    userInfoLog[key].classList.add('error');
                    userInfoLog[key].nextElementSibling.innerHTML = 'Incorrect';
                    isValue = false;
                } else {
                    userInfoLog[key].classList.remove('error');
                    userInfoLog[key].nextElementSibling.innerHTML = '';
                }
            }

            if ( item.md5 ) {
                hash = md5(userInfoLog[key].value);
                if ( hash !== userLog[key] ) {
                    userInfoLog[key].classList.add('error');
                    userInfoLog[key].nextElementSibling.innerHTML = 'Incorrect';
                    isValue = false;
                } else {
                    userInfoLog[key].classList.remove('error');
                    userInfoLog[key].nextElementSibling.innerHTML = '';
                }
            }
        });
    }

    if ( isValue === true ) {
        document.location.hash = "homes";
        localStorage.setItem('authorized', 1);
    }

    return isValue;
}