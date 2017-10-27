function formValidation() {
    var user = {
        login: '',
        email: '',
        password: '',
        name: '',
        age: ''
    };
    var isValid = true;
    var hash;
    var userInfo = {
        login: document.querySelector('.login'),
        email: document.querySelector('.email'),
        password: document.querySelector('.password'),
        confirmPassword: document.querySelector('.confirmPassword'),
        name: document.querySelector('.name'),
        age: document.querySelector('.age')
    };

    var validationConfig = {
        login: {
            required: true,
            minLength: 3
        },
        email: {
            required: true
        },
        password: {
            required: true,
            minLength: 5
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
        hash = md5(userInfo.password.value.trim());
        user.password = hash;
        localStorage.setItem('user', JSON.stringify(user));
        document.location.hash = "login";
    }

    return isValid;
}