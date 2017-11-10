var express = require('express'),
    config = require('./config'),
    port = process.env.PORT || config.port,
    bodyParser = require('body-parser'),
    // wss = require('./chat'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.use(express.static(__dirname + "/../client"));

app.use(bodyParser.json());

app.use(require('./api/register'));
app.use(require('./api/login'));
app.use(require('./api/edit'));
app.use(require('./api/homes'));
app.use(require('./api/delete'));
app.use(require('./chat'));

io.on('connection', function(socket){
    socket.on('message', function(msg){
        io.emit('message', msg.message);
    });
});

server.listen(port, function () {
    console.log('Server running at http://localhost:' + [port]);
});