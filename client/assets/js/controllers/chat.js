// создать подключение
var socket = new WebSocket("ws://localhost:3001");

HTTP.post('/getToken', {}, errcb, succb);
function succb(r) {
}
function errcb(c,e) {
    console.log('.................',c,e);
}

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
    var outgoingMessage = this.message.value;

    socket.send(outgoingMessage);

    document.querySelector('.write-message').value = '';
    return false;
};

// обработчик входящих сообщений
socket.onmessage = function(event) {
    var incomingMessage = event.data;
    showMessage(incomingMessage);
};

// показать сообщение в div#subscribe
function showMessage(message) {
    var messageElem = document.createElement('div');
    messageElem.classList.add('message');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
}