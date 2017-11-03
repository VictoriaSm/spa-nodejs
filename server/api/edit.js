var router = require('express').Router();
var auth = require('./auth');
var User = require('../models/user').User;

router.put('/edit', auth.bearerAuth, function(req, res) {
    console.log('.................', req.body);
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