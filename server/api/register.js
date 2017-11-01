var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../config');
var User = require('../models/user').User;

router.post('/register', createUser);

router.get('/register', function (req, res) {
    console.log('.................',req.headers);
    if(!req.headers['x-auth']) {
        return res.sendStatus(401);
    }
    try {
        var auth = jwt.decode(req.headers['x-auth'], config.secretKey);
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

function createUser(req, res){
    var user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    user.name = req.body.name;
    user.age = req.body.age;
    var password = req.body.password + user.username;
    var saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        console.log('.................',salt);
        bcrypt.hash(password, salt, function(err, hash){
            if (err){
                res.sendStatus(500);
            }
            else {
                console.log('.................',hash,  user.password);
                user.password = hash.slice(29);
                user.salt = salt;
                user.save(function (err) {
                    if (err) {
                        if (err.code === 11000 && err.message.indexOf('username') !== -1) {
                            res.status(400).send('Username already in use');
                        } else if (err.code === 11000 && err.message.indexOf('email') !== -1) {
                            res.status(400).send('Email already in use');
                        } else res.sendStatus(500);
                    }
                    else res.sendStatus(200);
                });
            }
        });
    });
}

module.exports = router;