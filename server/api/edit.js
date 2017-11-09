var router = require('express').Router(),
    bcrypt = require('bcrypt'),
    auth = require('./auth'),
    User = require('../models/user').User;

router.get('/user', auth.bearerAuth, getUser);
router.put('/edit', auth.bearerAuth, editProfile);

function getUser(req, res) {
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
}

function editProfile(req, res) {
    var name = req.body.name,
        age = req.body.age,
        gender = req.body.gender;

    function errorSave(err) {
        if (err) {
            res.sendStatus(400);
        }
        else res.sendStatus(200);
    }

    User.findOne({username: req.user['username']}, function(err, user){
        if (err) {
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        user.name = name;
        user.age = age;
        user.gender = gender;
        if ( req.body.password !== '' ) {
            var password = req.body.password + user.username;
            var saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err){
                        res.sendStatus(500);
                    }
                    else {
                        user.password = hash.slice(29);
                        user.salt = salt;
                        user.save(errorSave(err));
                    }
                });
            });
        } else {
            user.save(errorSave(err));
        }
    });
}

module.exports = router;