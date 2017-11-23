function messagesFunc() {
    HTTP.get('/allRooms', {}, ecb, scb);
    function scb(res) {
        for ( var key in res ) {
            var content = document.createElement('div'),
                table = document.querySelector('.all-msg-table'),
                divI = document.createElement('div'),
                icon = document.createElement('i');

            icon.classList.add('fa');
            icon.classList.add('fa-eye');
            icon.classList.add('cursor');
            icon.onclick = function () {
                HTTP.post('/dialogMsg', {room: res[key]}, errcb, succb);
                function succb(res) {
                    var dialog = document.querySelector('.dialog-table'),
                        contentDialog = document.createElement('div');
                    dialog.innerHTML = '';

                    res.forEach(function (msg) {
                        dialog.appendChild(contentDialog);
                        for ( var key in msg ) {
                            contentDialog.insertBefore(document.createElement('div'), contentDialog.firstChild);
                            contentDialog.firstChild.innerHTML = msg[key];
                        }
                    });
                }
                function errcb(code, err) {
                    console.log(code, err);
                }
            };

            divI.classList.add('div-icon');
            divI.appendChild(icon);
            content.appendChild(divI);

            content.classList.add('msg-table-content');
            table.appendChild(content);

            content.insertBefore(document.createElement('div'), content.firstChild);
            content.firstChild.classList.add('new-all-msg');
            if ( res[key].length > 15 ) {
                content.firstChild.innerHTML = res[key].slice(0, 22) + '...';
            } else content.firstChild.innerHTML = res[key];
        }
    }
    function ecb(code, err) {
        console.log(code, err);
    }
}