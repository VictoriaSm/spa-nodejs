function usersFunc() {
    HTTP.get('/getAllUsers', {}, ecb, scb);
    function scb(res) {
        res.users.forEach(function (user) {
            var content = document.createElement('div'),
                table = document.querySelector('.all-users-table'),
                icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-trash');
            icon.classList.add('cursor');
            icon.onclick = function () {
                HTTP.deleteUser('/deleteUser', {user: user.username}, ecb, scb);

                function scb(res) {
                    for ( var i = 0; i < table.children.length; i++ ) {
                        if ( table.children[i].children[0].textContent === user.username ) {
                            table.removeChild(table.children[i]);
                        }
                    }
                }
                function ecb(code, err) {
                    console.log('.................',code, err);
                }
            };
            content.appendChild(icon);

            content.classList.add('table-content');
            table.appendChild(content);

            for ( var key in user ) {
                var i = document.createElement('i');
                content.insertBefore(document.createElement('div'), content.firstChild);
                content.firstChild.classList.add('new-all-user');
                if ( user[key] === '' || user[key] === null ) {
                    i.classList.add('fa');
                    i.classList.add('fa-minus');
                    content.firstChild.appendChild(i);
                } else if ( key === 'gender' ) {
                    if ( user[key] === 'M' ) {
                        i.classList.add('fa');
                        i.classList.add('fa-mars');
                        content.firstChild.appendChild(i);
                    } else {
                        i.classList.add('fa');
                        i.classList.add('fa-venus');
                        content.firstChild.appendChild(i);
                    }
                } else content.firstChild.innerHTML = user[key];
            }
        });

        for ( var key in res.online ) {
            var content = document.createElement('div'),
                table = document.querySelector('.all-online-table');

            content.classList.add('table-content');
            table.appendChild(content);

            content.insertBefore(document.createElement('div'), content.firstChild);
            content.firstChild.classList.add('new-online');
            content.firstChild.innerHTML = res.online[key];
        }
    }
    function ecb(code, err) {
        console.log(code, err);
    }
}