var div = document.querySelector('.field-error');

function editFunc() {
    HTTP.get('/user', {}, ecb, scb);

    function scb(res) {
        document.querySelector('.nameEdit').value = res.name;
        document.querySelector('.ageEdit').value = res.age;
        if ( res.gender ) {
            document.querySelector('.gender[value='+res.gender+']').checked = true;
        }
    }
    function ecb(code, error) {
        if ( code === 401 ) {
            document.location.hash = 'login';
            logout();
        } else {
            document.location.hash = 'error';
        }
    }
}

function saveProfile() {
    var userProfile = {
        name: document.querySelector('.nameEdit'),
        age: document.querySelector('.ageEdit'),
        password: document.querySelector('.passwordEdit')
    };

    var user = {},
        isValid = true,
        validConfig = {
        name: {
            whiteSpace: false,
            minLength: 3
        },
        age: {
            whiteSpace: false,
            number: true
        },
        password: {
            whiteSpace: false,
            minLength: 6
        }
    };

    changeProfile();

    function changeProfile() {
        VT.obj_forEach(validConfig, function (item, key) {
            if( !item.whiteSpace && userProfile[key].value !== '' ) {
                if ( userProfile[key].value.replace(/\s/g,'') === '' ) {
                    userProfile[key].classList.add('error');
                    userProfile[key].nextElementSibling.innerHTML = 'Incorrect';
                    isValid = false;
                } else if ( item.minLength ) {
                    if ( userProfile[key].value.length < item.minLength ) {
                        userProfile[key].classList.add('error');
                        userProfile[key].nextElementSibling.innerHTML = 'Value is too short';
                        isValid = false;
                    } else {
                        userProfile[key].classList.remove('error');
                        userProfile[key].nextElementSibling.innerHTML = '';
                        user[key] = userProfile[key].value.trim();
                    }
                } else if ( item.number ) {
                    if ( /\D/.test( userProfile[key].value ) ) {
                        userProfile[key].classList.add('error');
                        userProfile[key].nextElementSibling.innerHTML = 'Is not a number';
                        isValid = false;
                    } else {
                        userProfile[key].classList.remove('error');
                        userProfile[key].nextElementSibling.innerHTML = '';
                        user[key] = userProfile[key].value.trim();
                    }
                }
            } else {
                userProfile[key].classList.remove('error');
                userProfile[key].nextElementSibling.innerHTML = '';
                user[key] = userProfile[key].value.trim();
            }
        });
    }

    if ( isValid === true ) {
        if (document.querySelector('.gender:checked')) {
            user.gender = document.querySelector('.gender:checked').value;
        }

        HTTP.put('/edit', user, errorHandler, render);

        function render(res) {
            userProfile.password.value = '';
            div.classList.add('field-success');
            div.firstElementChild.innerHTML = 'Changes saved';
        }
        function errorHandler(code, error) {
            if ( code === 401 ) {
                document.location.hash = 'login';
                logout();
            } else if ( code === 500 ) {
                document.location.hash = 'error';
            } else div.firstElementChild.innerHTML = code + ': ' + error;
        }
    }
}

function deleteProfile() {
    HTTP.deleteUser('/delete', {}, ecb, scb);

    function scb(res) {
        document.location.hash = 'login';
        logout();
    }
    function ecb(code, error) {
        if ( code === 401 ) {
            document.location.hash = 'login';
            logout();
        } else  {
            document.location.hash = 'error';
        }
    }
}