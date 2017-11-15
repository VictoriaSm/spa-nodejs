var jwt = require('jwt-simple'),
    config = require('./config'),
    User = require('./models/user').User,
    redis = require('redis');

module.exports = function (server) {
    var io = require('socket.io')(server),
    clients = [];
    io.on('connection', function(socket){
        if (socket.handshake.query && socket.handshake.query.token){
            socket.decoded = jwt.decode(socket.handshake.query.token, config.secretKey);
        }

        User.findOne({_id: socket.decoded.id}, function (err, user) {
            user.status = 'online';
            user.save();
        });

        User.find({status: 'online'}, function (err, users) {
            socket.emit('users', users.map(function (user) {
                return user.username;
            }));
        });

        socket.broadcast.emit('user', socket.decoded.username);

        socket.on('message', function(msg, cb){
            var username = socket.decoded.username[0].toUpperCase() + socket.decoded.username.substr(1);
            socket.broadcast.emit('message', username + ': ' + msg);
            cb && cb();
        });

        socket.on('disconnect', function () {
            User.findOne({username: socket.decoded.username}, function (err, user) {
                user.status = 'offline';
                user.save();
                // socket.emit('disconnect', socket.decoded.username);
            });
        });
    });
};