function adminFunc() {
    HTTP.get('/getInfo', {}, ecb, scb);

    function scb(res) {
        var i = 2;
        for ( var key in res.count ) {
            var countUser = document.querySelector('.quantity-data').children[i],
                numb = res.count[key];
            countUser.appendChild(document.createTextNode(numb));
            countUser.classList.add('count-user');
            // countUser.firstChild.innerHTML = res.count[key];
            i--;
        }

        for ( var key in res.online ) {
            var content = document.createElement('div'),
                table = document.querySelector('.online-table');

            content.classList.add('table-content');
            table.appendChild(content);

            content.insertBefore(document.createElement('div'), content.firstChild);
            content.firstChild.classList.add('new-online');
            content.firstChild.innerHTML = res.online[key];
        }

        res.users.forEach(function (user) {
            createInfo(user, '.user-table', 'new-user');
        });
        
        res.msg.forEach(function (msg) {
            createInfo(msg, '.msg-table', 'new-msg');
        });

        function createInfo(data, elem, style) {
            var content = document.createElement('div'),
                table = document.querySelector(elem);

            content.classList.add('table-content');
            table.appendChild(content);

            for ( var key in data ) {
                content.insertBefore(document.createElement('div'), content.firstChild);
                content.firstChild.classList.add(style);
                if ( data[key] === '' ) {
                    var i = document.createElement('i');
                    i.classList.add('fa');
                    i.classList.add('fa-times');
                    content.firstChild.appendChild(i);
                } else if ( data[key].length > 15 ) {
                    content.firstChild.innerHTML = data[key].slice(0, 15) + '...';
                } else content.firstChild.innerHTML = data[key];
            }
        }

    }
    function ecb(code, err) {
        console.log(code, err);
    }
}