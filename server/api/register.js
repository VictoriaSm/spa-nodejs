var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var User = require('../models/user').User;

router.post('/register', function (req, res){
    var user = new User;
    user.age = req.body.age;
    user.name = req.body.name;
    user.email = req.body.email;
    user.userName = req.body.login;
    var password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){
        if (err){
            res.sendStatus(500);
        }
        else {
            user.password = hash;
            user.save(function (err) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

router.get('/user', function (req, res) {
    if(!req.headers['x-auth']) {
        return res.sendStatus(401);
    }
    try {
        var auth = jwt.decode(req.headers['x-auth'], config.secretkey);
    } catch (err) {
        return res.sendStatus(401);
    }
    User.findOne({username: auth.username}, function(err, user) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            res.json(user);
        }
    })
});

module.exports = router;