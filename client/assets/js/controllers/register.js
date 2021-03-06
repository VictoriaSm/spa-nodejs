function formValidation() {
    var user = {
        username: '',
        email: '',
        password: '',
        name: '',
        age: ''
    };
    var isValid = true;
    var userInfo = {
        username: document.querySelector('.username'),
        email: document.querySelector('.email'),
        password: document.querySelector('.password'),
        confirmPassword: document.querySelector('.confirmPassword'),
        name: document.querySelector('.name'),
        age: document.querySelector('.age')
    };

    var validationConfig = {
        username: {
            required: true,
            minLength: 3
        },
        email: {
            required: true
        },
        password: {
            required: true,
            minLength: 6
        },
        confirmPassword: {
            required: true
        },
        name: {
            required: false
        },
        age: {
            required: false,
            number: true
        }
    };

    isRequired();

    function isRequired() {
        VT.obj_forEach( validationConfig, function (item, key){
            if( item.required ) {
                if ( userInfo[key].value === '' || userInfo[key].value.replace(/\s/g,'') === '' ) {
                    userInfo[key].classList.add('error');
                    userInfo[key].nextElementSibling.innerHTML = 'Required field';
                    isValid = false;
                } else if ( item.minLength ) {
                    if ( userInfo[key].value.length < item.minLength ) {
                        userInfo[key].classList.add('error');
                        userInfo[key].nextElementSibling.innerHTML = 'Value is too short';
                        isValid = false;
                    } else {
                        userInfo[key].classList.remove('error');
                        userInfo[key].nextElementSibling.innerHTML = '';
                        user[key] = userInfo[key].value.trim();
                    }
                } else {
                    userInfo[key].classList.remove('error');
                    userInfo[key].nextElementSibling.innerHTML = '';
                    user[key] = userInfo[key].value.trim();
                }
            } else if ( userInfo[key].value !== '' ) {
                if (userInfo[key].value.replace(/\s/g, '') === '') {
                    userInfo[key].classList.add('error');
                    userInfo[key].nextElementSibling.innerHTML = 'Incorrect';
                    isValid = false;
                } else if (item.number) {
                    if (/\D/.test(userInfo[key].value)) {
                        userInfo[key].classList.add('error');
                        userInfo[key].nextElementSibling.innerHTML = 'Is not a number';
                        isValid = false;
                    } else {
                        userInfo[key].classList.remove('error');
                        userInfo[key].nextElementSibling.innerHTML = '';
                        user[key] = userInfo[key].value.trim();
                    }
                } else {
                    userInfo[key].classList.remove('error');
                    userInfo[key].nextElementSibling.innerHTML = '';
                    user[key] = userInfo[key].value.trim();
                }
            } else {
                userInfo[key].classList.remove('error');
                userInfo[key].nextElementSibling.innerHTML = '';
                user[key] = userInfo[key].value.trim();
            }
        });
    }

    isMatch();

    function isMatch() {
        if ( userInfo.confirmPassword.value !== userInfo.password.value ) {
            userInfo.confirmPassword.classList.add('error');
            userInfo.confirmPassword.nextElementSibling.innerHTML = 'Password does not match.';
            isValid = false;
        } else {
            userInfo.confirmPassword.classList.remove('error');
            userInfo.confirmPassword.nextElementSibling.innerHTML = '';
        }
    }

    if ( isValid === true ) {
        delete user.confirmPassword;

        HTTP.post('/register', user, errorHandler, render);

        function render(res){
            document.location.hash = "";
        }
        function errorHandler(code, error) {
            if ( code === 392 ) {
                if ( error.code === 1 ) {
                    userInfo.username.classList.add('error');
                    userInfo.username.nextElementSibling.innerHTML = error.message;
                } else {
                    userInfo.email.classList.add('error');
                    userInfo.email.nextElementSibling.innerHTML = error.message;
                }
            } else {
                document.location.hash = 'error';
            }
        }
    }

    return isValid;
}