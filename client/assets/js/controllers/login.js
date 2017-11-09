function formLogin() {
    var userLog = {
        username: document.querySelector('.loginLog'),
        password: document.querySelector('.passwordLog')
    };
    var user = {},
        isValue = true;

    var validConfig = {
        username: {
            required: true
        },
        password: {
            required: true
        }
    };

    isCoincidence();

    function isCoincidence() {
        VT.obj_forEach(validConfig, function (item, key) {
            if ( item.required ) {
                if (userLog[key].value === '') {
                    userLog[key].classList.add('error');
                    userLog[key].nextElementSibling.innerHTML = 'Required field';
                    isValue = false;
                } else {
                    userLog[key].classList.remove('error');
                    userLog[key].nextElementSibling.innerHTML = '';
                    user[key] = userLog[key].value;
                }
            }
        });
    }

    if ( isValue === true ) {
        HTTP.post('/login', user, errorHandler, render);

        function render(res) {
            HTTP.setToken(res);
            document.location.hash = "edit";
        }
        function errorHandler(code, error) {
            var div = document.querySelector('.field-error');
            if ( code === 391 ) {
                div.firstElementChild.innerHTML = '';
                if ( error.code === 1 ) {
                    userLog.username.classList.add('error');
                    userLog.username.nextElementSibling.innerHTML = error.message;
                } else {
                    userLog.password.classList.add('error');
                    userLog.password.nextElementSibling.innerHTML = error.message;
                }
            } else if ( code === 393 ) {
                div.firstElementChild.innerHTML = 'Required fields';
            } else {
                div.firstElementChild.innerHTML = code + ': ' + error;
            }
        }
    }

    return isValue;
}