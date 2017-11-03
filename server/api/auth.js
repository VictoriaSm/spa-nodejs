var jwt = require('jwt-simple');
var config = require('../config');

module.exports.bearerAuth = function (req, res, next) {
    if (!req.headers['x-auth']) {
        console.log('.................',req.headers['x-auth']);
        // return res.redirect('/../client/views/login');
    }
    console.log('.................',123);
    // try {
    //     var username = jwt.decode(req.headers['x-auth'], config.secretKey).username;
    // } catch(err) {
    //     return res.sendStatus(401);
    // }
    // next();
};