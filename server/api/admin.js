var router = require('express').Router(),
    message = require('../models/message'),
    User = require('../models/user').User,
    redis = require('redis');

router.get('/allInfo', getAllUser);

function getAllUser(req, res) {
    var data = {},
        client = redis.createClient();
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
        console.log('.................',obj);

        // data.online;
    });

    message.messages.find({}, {_id: 0, room: 1, sender: 1, receiver: 1, message: 1})
        .sort({data: -1})
        .limit(10)
        .exec(function (err, msg) {
            if (err) {
                return res.sendStatus(500);
            }
            data.msg = msg;
            res.send(data);
        });
}

module.exports = router;