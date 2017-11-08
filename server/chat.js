var router = require('express').Router();
var jwt = require('jwt-simple');
var config = require('./config');
var WebSocketServer = new require('ws');
var clients = {};
var webSocketServer = new WebSocketServer.Server({
    port: 3001
});
var userToken;
router.post('/getToken', function (req, res) {
    userToken = jwt.decode(req.headers['x-auth'], config.secretKey);
});

webSocketServer.on('connection', function(ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function(message) {
        console.log('получено сообщение ' + message);

        for (var key in clients) {
            clients[key].send(userToken['username'] + ': ' + message);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });

});

module.exports = webSocketServer;
module.exports = router;