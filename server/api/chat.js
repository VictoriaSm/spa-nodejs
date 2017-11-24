var jwt = require('jwt-simple'),
    config = require('../config'),
    async = require('async'),
    redis = require('redis'),
    client = redis.createClient(),
    message = require('../models/message');

module.exports = function (server) {
    var io = require('socket.io')(server),
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
            async.parallel([function (cb) {
                client.hvals('rooms', function (err, rooms) {
                    var room = rooms.filter(function (item) {
                        var arr = item.split(' ').filter(function (item) {
                            return ( item === user || item === socket.decoded.username );
                        });
                        if ( arr.length === 2 ) {
                            return arr.join(' ');
                        }
                    });

                    if ( room.length !== 0 ) {
                        socket.join(room.join(''));
                        sendRoom = room.join('');

                    } else {
                        var newRoom = socket.decoded.username + ' ' + user;
                        client.hmset('rooms', newRoom, newRoom);
                        socket.join(newRoom);
                        sendRoom = newRoom;
                    }
                    cb();
                });
            }], function (err) {
                if ( err ) console.log(err);
                message.messages.find({room: sendRoom})
                    .sort({date: 1})
                    .exec(function (err, reply) {
                        socket.emit('history', reply);
                    });
            });

        });

        socket.on('message', function(data, cb){
            var username = socket.decoded.username,
                msg = username + ': ' + data;

            var receiver = sendRoom.split(' ').filter(function (t) {
                return t !== socket.decoded.username;
            }).join('');

            // var date = new Date();
            // var optDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() +
            //     ' ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

            socket.in(sendRoom).broadcast.emit('message', msg);
            message.messages.create({
                "message": data,
                "receiver": receiver,
                "sender" : socket.decoded.username,
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