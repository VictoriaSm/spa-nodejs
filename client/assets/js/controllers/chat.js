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
    // socket.on('online', function () {
    //
    // });
}

socket.on('message', function (msg) {
    createMsg(msg, 'message');
});

function createMsg(msg, style) {
    var messageElem = document.createElement('div'),
        list = document.getElementById('subscribe');
    messageElem.classList.add(style);
    messageElem.appendChild(document.createTextNode(msg));
    list.appendChild(messageElem);
}