var jwt = require('jwt-simple'),
    config = require('./config'),
    redis = require('redis'),
    message = require('./models/message'),
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

            if ( room.length !== 0 ) {
                socket.join(room.join(''));
                sendRoom = room.join('');

            } else {
                var newRoom = socket.decoded.username + ' ' + user;
                rooms.push(newRoom);
                socket.join(newRoom);
                sendRoom = newRoom;
            }

            message.messages.find({room: sendRoom})
                .sort({date: 1})
                .exec(function (err, reply) {
                    socket.emit('history', reply);
                });
        });

        socket.on('message', function(data, cb){
            var username = socket.decoded.username,
                msg = username + ': ' + data;

            var receiver = sendRoom.split(' ').filter(function (t) {
                return t !== socket.decoded.username;
            }).join('');

            socket.in(sendRoom).broadcast.emit('message', msg);
            message.messages.create({
                "message": data,
                "sender" : socket.decoded.username,
                "receiver": receiver,
                "room": sendRoom,
                "date" : new Date()
            });
            cb && cb();
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('offline', socket.decoded.username);
            client.hdel('online', socket.decoded.id);
        });
    });
};