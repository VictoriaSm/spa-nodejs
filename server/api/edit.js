var router = require('express').Router();
var auth = require('./auth');
var User = require('../models/user').User;

router.get('/edit', auth.bearerAuth, function (req, res) {
    res.send('Ok');
});

router.put('/edit', function(req, res) {
    // User.findOne({username: username}, function(err, user){
    //     if (err) {
    //         return res.sendStatus(500);
    //     }
    //     if (!user) {
    //         return res.sendStatus(401);
    //     }
    //     res.json(user);
    // });
});

module.exports = router;