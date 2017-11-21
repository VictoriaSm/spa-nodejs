function adminFunc() {
    HTTP.get('/allInfo', {}, ecb, scb);

    function scb(res) {
        // var countUser = document.querySelector('.quantity-data');
        // countUser.insertBefore(document.createElement('div'), countUser.firstChild);
        // countUser.firstChild.classList.add('count-user');
        // countUser.firstChild.innerHTML = res.users.length;

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
                if ( data[key] === '' ) data[key] = 'not specified';
                content.insertBefore(document.createElement('div'), content.firstChild);
                content.firstChild.classList.add(style);
                content.firstChild.innerHTML = data[key];
            }
        }

    }
    function ecb(code, err) {
        console.log('.................', code, err);
    }
}