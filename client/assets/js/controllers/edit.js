function saveProfile() {
    var userProfile = {
        name: document.querySelector('.nameEdit'),
        age: document.querySelector('.ageEdit'),
        password: document.querySelector('.passwordEdit')
    };

    var user = JSON.parse(localStorage.getItem('user'));
    var hash;

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
            minLength: 5
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
        user.gender = document.querySelector('.gender:checked').value;

        if ( user.password === userProfile.password.value ) {
            hash = md5(user.password);
            user.password = hash;
        }
        localStorage.setItem('user', JSON.stringify(user));
    }
}