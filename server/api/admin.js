var router = require('express').Router(),
    message = require('../models/message'),
    User = require('../models/user').User,
    redis = require('redis'),
    client = redis.createClient();

router.get('/allInfo', getAllUser);

function getAllUser(req, res) {
    var data = {count: {msg: 0, online: 0, users: 0}};

    User.find({}, function (err, user) {
        if (err) {
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        data.count.users = user.length;
    });
    client.hlen('online', function (err, obj) {
        data.count.online = obj;
    });
    message.messages.find({}, function (err, msg) {
        if (err) {
            return res.sendStatus(500);
        }
        data.count.msg = msg.length;
    });

    User.find({username: {$ne: '_admin_'}}, {_id: 0, username: 1, email: 1, name: 1})
        .sort({ $natural: -1 })
        .limit(10)
        .exec(function (err, user) {
            if (err) {
                return res.sendStatus(500);
            }
            if (!user) {
                return res.sendStatus(401);
            }
            data.users = user;
        });

    client.hgetall('online', function (err, obj) {
        if ( obj !== null ) {
            data.online = obj;
        }
    });

    message.messages.find({}, {_id: 0, room: 1, sender: 1, receiver: 1, message: 1})
        .sort({$natural: -1})
        .limit(10)
        .exec(function (err, msg) {
            if (err) {
                return res.sendStatus(500);
            }
            data.msg = msg;
            res.json({users: data.users,
                online: data.online,
                msg: data.msg,
                count: data.count});
        });
}

module.exports = router;