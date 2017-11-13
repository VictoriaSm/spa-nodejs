var router = require('express').Router(),
    auth = require('./api/auth'),
    jwt = require('jwt-simple'),
    config = require('./config');

router.get('/getToken', auth.bearerAuth, function (req, res) {
    res.json(req.user);
});

module.exports = router;
module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        if (socket.handshake.query && socket.handshake.query.token){
            socket.decoded = jwt.decode(socket.handshake.query.token, config.secretKey);
        }
        socket.on('message', function(msg, cb){
            var username = socket.decoded.username[0].toUpperCase() + socket.decoded.username.substr(1);
            socket.broadcast.emit('message', {username: username,msg: msg});
            cb && cb();
        });
    });
};