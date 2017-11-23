var router = require('express').Router(),
    User = require('../../models/user').User;

router.delete('/deleteUser', function (req, res) {
    User.remove({username: req.body.user}, function (err, user) {
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