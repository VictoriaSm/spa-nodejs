var token = localStorage.getItem('token');
var socket = io('',{query: {token: token}});

function chatFunc() {
    document.querySelector('textarea').onkeydown = function (event) {
        if ( event.shiftKey && event.keyCode === 13 ) {
            var text = this.value;
            this.value = '';
            socket.emit('message', text, function () {
                createMsg('You: ' + text, 'message');
            });
            return false;
        }
    };
    document.forms.publish.onsubmit = function () {
        var text = this.message.value;
        this.message.value = '';
        socket.emit('message', text, function () {
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

socket.on('offline', function (user) {
    var offline = document.querySelector('#online-div');
    for ( var i = 0; i < offline.children.length; i++ ) {
        if ( offline.children[i].textContent === user ) {
            offline.removeChild(offline.children[i]);
        }
    }
});

function createOnlineUser(user) {
    if ( user instanceof Array) {
        user.forEach(function (item) {
            addUser(item);
        });
    } else {
        addUser(user);
    }

    function addUser(user) {
        var online = document.createElement('div'),
            link = document.createElement('a'),
            block = document.querySelector('.block'),
            chat = document.querySelector('.chat');
        online.innerHTML = user;
        online.classList.add('online');
        document.querySelector('#online-div').appendChild(link);
        link.appendChild(online);
        link.classList.add('cursor');
        link.onclick = function () {
            block.classList.add('hidden');
            block.classList.remove('block');
            chat.classList.remove('hidden');
            socket.emit('dialog', user);
        };
    }
}

function createMsg(msg, style) {
    var messageElem = document.createElement('div'),
        list = document.getElementById('subscribe'),
        div = document.querySelector('.chat');
    messageElem.classList.add(style);
    messageElem.appendChild(document.createTextNode(msg));
    list.appendChild(messageElem);
    div.scrollTop = div.scrollHeight;
}