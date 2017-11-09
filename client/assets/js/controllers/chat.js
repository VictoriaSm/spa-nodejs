var userName;

HTTP.get('/getToken', {}, errcb, succb);
function succb(res) {
    userName = res.username;
}
function errcb(c,e) {
    console.log('.................',c,e);
}

var socket = io();

function chatFunc() {

    var roomNum = 1;

    socket.emit('join', roomNum);

    document.forms.publish.onsubmit = function() {
        socket.emit('message', this.message.value);
        this.message.value = '';
        return false;
    };
    
    socket.on('message', function (msg) {
        var messageElem = document.createElement('div');
        messageElem.classList.add('message');
        messageElem.appendChild(document.createTextNode(msg));
        document.getElementById('subscribe').appendChild(messageElem)
    });
}