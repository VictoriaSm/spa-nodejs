var jwt = require('jwt-simple'),
    config = require('../config');

module.exports.bearerAuth = function (req, res, next) {
    if ( req.headers['x-auth'].length < 10 ) {
        return res.sendStatus(401);
    }
    try {
        req.user = jwt.decode(req.headers['x-auth'], config.secretKey);
    } catch(err) {
        return res.sendStatus(401);
    }
    next();
};