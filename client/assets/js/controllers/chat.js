var token = localStorage.getItem('token');
var socket = io('',{query: {token: token}});

function chatFunc() {
    document.querySelector('textarea').onkeydown = function (event) {
        if ( event.shiftKey && event.keyCode === 13 ) {
            var text = this.value;
            this.value = '';
            socket.emit('message', text, function (data) {
                createMsg('You: ' + text, 'message');
            });
            return false;
        }
    };
    document.forms.publish.onsubmit = function () {
        var text = this.message.value;
        this.message.value = '';
        socket.emit('message', text, function (data) {
            createMsg('You: ' + text, 'message');
        });
        return false;
    };

}

socket.on('users', function (users) {
    createOnlineUser(users);
});

socket.on('user', function (user) {
    createOnlineUser(user)
});

socket.on('message', function (msg) {
    createMsg(msg, 'message');
});

// socket.on('disconnect', function (user) {
//     var offline = document.querySelector('.online'),
//         list = document.getElementById('subscribe');
// });

function createOnlineUser(user) {
    var online = document.createElement('div');
    online.innerHTML = user;
    online.classList.add('online');
    document.querySelector('#online-div').appendChild(online);
}

function createMsg(msg, style) {
    var messageElem = document.createElement('div'),
        list = document.getElementById('subscribe'),
        div = document.querySelector('.block');
    messageElem.classList.add(style);
    messageElem.appendChild(document.createTextNode(msg));
    list.appendChild(messageElem);
    div.scrollTop = div.scrollHeight;
}