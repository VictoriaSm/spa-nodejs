var router = require('express').Router();
var bcrypt = require('bcrypt');
var auth = require('./auth');
var User = require('../models/user').User;

router.get('/user', auth.bearerAuth, function (req, res) {
    User.findOne({_id: req.user['id']}, function (err, user) {
        if (err) {
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        res.json({name: user.name,
        age: user.age,
        gender: user.gender});
    });
});

router.put('/edit', function(req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var gender = req.body.gender;
    User.findOne({username: 'test'}, function(err, user){
        if (err) {
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        user.name = name;
        user.age = age;
        user.gender = gender;
        user.save(function (err) {
            if (err) {
                res.sendStatus(400);
            }
            else res.sendStatus(200);
        });
        if ( req.body.password !== '' ) {
            var password = req.body.password + user.username;
            var saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function(err, hash){
                    if (err){
                        res.sendStatus(500);
                    }
                    else {
                        user.password = hash.slice(29);
                        user.salt = salt;
                        user.save(function (err) {
                            if (err) {
                                res.sendStatus(400);
                            }
                            else res.sendStatus(200);
                        });
                    }
                });
            });
        }
    });
});

module.exports = router;