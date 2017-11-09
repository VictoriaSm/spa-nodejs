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
    var id = Math.random();
    console.log("новое соединение " + id);
    socket.on('message', function(msg){
        io.emit('message', msg);
    });
    socket.on('join', function(room) {
        socket.join(room);
        console.log('.................',room);
    });
});

server.listen(port, function () {
    console.log('Server running at http://localhost:' + [port]);
});
