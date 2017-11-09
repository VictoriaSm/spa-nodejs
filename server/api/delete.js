var router = require('express').Router(),
    auth = require('./auth'),
    User = require('../models/user').User;

router.delete('/delete', auth.bearerAuth, function (req, res) {
    User.remove({_id: req.user['id']}, function (err, user) {
        if (err) {
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        res.send(200);
    });
});

module.exports = router;