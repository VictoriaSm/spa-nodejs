var jwt = require('jwt-simple'),
    config = require('./config'),
    redis = require('redis'),
    Message = require('./models/message').Message,
    rooms = [];

module.exports = function (server) {
    var io = require('socket.io')(server),
        client = redis.createClient(),
        sendRoom;

    io.on('connection', function(socket){
        if (socket.handshake.query && socket.handshake.query.token){
            socket.decoded = jwt.decode(socket.handshake.query.token, config.secretKey);
        }

        client.hmset('online', socket.decoded.id, socket.decoded.username);

        client.hvals('online', function (err, obj) {
            socket.emit('users', obj.filter(function (item) {
                return item !== socket.decoded.username;
            }));
        });

        socket.broadcast.emit('user', socket.decoded.username);

        socket.on('dialog', function (user) {
            var room = rooms.filter(function (item) {
                var arr = item.split(' ').filter(function (item) {
                    return ( item === user || item === socket.decoded.username );
                });
                if ( arr.length === 2 ) {
                    var str = arr.join(' ');
                    return str;
                }
            });

            var message = new Message;

            if ( room.length !== 0 ) {
                socket.join(room.join(''));
                sendRoom = room.join('');
                console.log('.................',123);
                message.room = room;
                console.log('.................',123);
                message.save(function (err) {
                    if ( err ) console.log('.................',err);
                });

            } else {
                var newRoom = socket.decoded.username + ' ' + user;
                rooms.push(newRoom);
                socket.join(newRoom);
                sendRoom = newRoom;
                message.room = newRoom;
                message.save(function (err) {
                    if ( err ) console.log('.................',err);
                });
            }
        });

        socket.on('message', function(msg, cb){
            var username = socket.decoded.username[0].toUpperCase() + socket.decoded.username.substr(1);
            socket.in(sendRoom).broadcast.emit('message', username + ': ' + msg);
            Message.find({room: sendRoom}, function (msg) {
                console.log('.................',msg);
            });
            cb && cb();
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('offline', socket.decoded.username);
            client.hdel('online', socket.decoded.id);
        });
    });
};