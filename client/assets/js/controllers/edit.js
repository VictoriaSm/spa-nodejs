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
        console.log(code,error);
    }
}

function saveProfile() {
    var userProfile = {
        name: document.querySelector('.nameEdit'),
        age: document.querySelector('.ageEdit'),
        password: document.querySelector('.passwordEdit')
    };

    var user = {};

    var isValid = true;
    var validConfig = {
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

        VT.send('PUT', '/edit', user, errorHandler, render);

        function render(res) {
            console.log('.................',res);
        }
        function errorHandler(code, error) {
            console.log(code, error);
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
        console.log(code,error);
    }
}