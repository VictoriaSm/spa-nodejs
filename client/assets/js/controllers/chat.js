var token = localStorage.getItem('token');
var socket = io('',{query: {token: token}});

// HTTP.get('/getToken', {}, errcb, succb);
// function succb(res) {
//     localStorage.setItem('user', res.username);
// }
// function errcb(c,e) {
//     console.log('.................',c,e);
// }

function chatFunc() {

    // var user = localStorage.getItem('user');
    // console.log('.................',user);

    document.querySelector('textarea').addEventListener('keypress', function (event) {
        if ( event.keyCode === 13 ) {}
    });
    document.forms.publish.onsubmit = function () {
        var text = this.message.value;
        this.message.value = '';
        socket.emit('message', text, function (data) {
            createMsg('You: ' + text);
        });
        return false;
    };
}

socket.on('message', function (msg) {
    createMsg(msg.username + ': ' + msg.msg);
    var userElem = document.createElement('li');
    userElem.appendChild(document.createTextNode(msg.username));
    document.getElementById('online-users').appendChild(userElem);
});

function createMsg(msg) {
    var messageElem = document.createElement('div');
    messageElem.classList.add('message');
    messageElem.appendChild(document.createTextNode(msg));
    document.getElementById('subscribe').appendChild(messageElem);
}