var router = require('express').Router(),
    bcrypt = require('bcrypt'),
    User = require('../models/user').User;

router.post('/register', createUser);

function createUser(req, res){
    var user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    user.name = req.body.name;
    user.age = req.body.age;
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
                        if (err.code === 11000 && err.message.indexOf('username') !== -1) {
                            res.status(392).send({message: 'Username already exists', code: 1});
                        } else if (err.code === 11000 && err.message.indexOf('email') !== -1) {
                            res.status(392).send({message: 'Email already exists', code: 2});
                        } else res.sendStatus(500);
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
}

module.exports = router;