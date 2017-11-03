var jwt = require('jwt-simple');
var config = require('../config');

module.exports.bearerAuth = function (req, res, next) {
    if ( req.headers['x-auth'].length < 10 ) {
        return res.sendStatus(401);
    }
    next();
    // try {
    //     var username = jwt.decode(req.headers['x-auth'], config.secretKey).username;
    // } catch(err) {
    //     return res.sendStatus(401);
    // }
    // next();
};