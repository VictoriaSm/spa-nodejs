var router = require('express').Router();
var auth = require('./auth');

router.get('/homes', auth.bearerAuth, function (req, res) {
    res.json(req.user);
});

module.exports = router;