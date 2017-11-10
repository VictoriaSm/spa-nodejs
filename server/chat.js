var router = require('express').Router(),
    auth = require('./api/auth');

router.get('/getToken', auth.bearerAuth, function (req, res) {
    res.json(req.user);
});

module.exports = router;