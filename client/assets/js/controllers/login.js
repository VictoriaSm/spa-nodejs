function formLogin() {
    var userLog = {
        username: document.querySelector('.loginLog'),
        password: document.querySelector('.passwordLog')
    };
    var user = {};
    var isValue = true;

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
        VT.send('POST', '/login', user, errorHandler, render);

        function render(res) {
            HTTP.setToken(res);
            document.location.hash = "edit";
        }
        function errorHandler(code, error) {
            console.error(code, error);
        }
    }

    return isValue;
}