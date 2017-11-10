var socket = io();

HTTP.get('/getToken', {}, errcb, succb);
function succb(res) {
    localStorage.setItem('user', res.username);
}
function errcb(c,e) {
    console.log('.................',c,e);
}

function chatFunc() {

    var user = localStorage.getItem('user');
    console.log('.................',user);

    document.forms.publish.onsubmit = function () {
        socket.emit('message', this.message.value);
        this.message.value = '';
        return false;
    };

    socket.on('message', function (msg) {
        var messageElem = document.createElement('div');
        messageElem.classList.add('message');
        messageElem.appendChild(document.createTextNode(msg));
        document.getElementById('subscribe').appendChild(messageElem);
    });

}