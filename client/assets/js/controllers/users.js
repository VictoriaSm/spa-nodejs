function usersFunc() {
    HTTP.get('/getAllUsers', {}, ecb, scb);
    function scb(res) {
        res.forEach(function (user) {
            var content = document.createElement('div'),
                table = document.querySelector('.all-users-table'),
                icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-trash');
            icon.classList.add('cursor');
            icon.onclick = function () {
                console.log('.................',123);
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
                    i.classList.add('fa-times');
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
    }
    function ecb(code, err) {
        console.log(code, err);
    }
}