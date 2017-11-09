// var WebSocket = new require('ws'),
//     // clients = {},
//     user,
//     auth = require('./api/auth'),
//     router = require('express').Router(),
//     wss = new WebSocket.Server({
//     port: 3001
// });

var router = require('express').Router(),
    auth = require('./api/auth');

router.get('/getToken', auth.bearerAuth, function (req, res) {
    res.json(req.user);
});

module.exports = router;