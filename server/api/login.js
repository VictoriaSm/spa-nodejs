var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../config');
var User = require('../models/user').User;

router.post('/login', authUser);

function authUser(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(393);
    } else {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({username: username})
            .select('password salt')
            .exec(function(err, user){
                if (err) {
                    return res.sendStatus(500);
                }
                if (!user) {
                    return res.status(391.1).send({message: 'Username does not exist', code: 1});
                }
                password += username;
                var hash = user.salt + user.password;
                bcrypt.compare(password, hash, function(err, valid){
                    if (err) {
                        return res.sendStatus(500);
                    }
                    if (!valid){
                        return res.status(391.2).send({message: 'Password incorrect', code: 2});
                    }
                    var token = jwt.encode({username: username, id: user._id}, config.secretKey);
                    res.send(token);
                });
            });
    }
}

module.exports = router;