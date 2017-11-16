var jwt = require('jwt-simple'),
    config = require('./config'),
    redis = require('redis');

module.exports = function (server) {
    var io = require('socket.io')(server),
        client = redis.createClient();

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

        socket.on('message', function(msg, cb){
            var username = socket.decoded.username[0].toUpperCase() + socket.decoded.username.substr(1);
            socket.broadcast.emit('message', username + ': ' + msg);
            cb && cb();
        });

        socket.on('dialog', function (user) {
            console.log('.................',user);
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('offline', socket.decoded.username);
            client.hdel('online', socket.decoded.id);
        });
    });
};