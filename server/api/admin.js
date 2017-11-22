var router = require('express').Router(),
    async = require('async'),
    message = require('../models/message'),
    User = require('../models/user').User,
    redis = require('redis'),
    client = redis.createClient();

router.get('/getInfo', getUserInfo);

function getUserInfo(req, res) {
    var data = {count: {msg: 0, online: 0, users: 0}};

    async.parallel([function (cb) {
        User.count({}, function (err, user) {
            if (err) {
                return res.sendStatus(500);
            }
            data.count.users = user - 1;
            cb();
        });
    }, function (cb) {
        client.hlen('online', function (err, obj) {
            data.count.online = obj;
            cb();
        });
    }, function (cb) {
        message.messages.count({}, function (err, msg) {
            if (err) {
                return res.sendStatus(500);
            }
            data.count.msg = msg;
            cb();
        });
    }, function (cb) {
        User.find({username: {$ne: '_admin_'}})
            .select('-_id username email name')
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
                cb();
            });
    }, function (cb) {
        client.hgetall('online', function (err, obj) {
            if ( obj !== null ) {
                data.online = obj;
            }
            cb();
        });
    }, function (cb) {
        message.messages.find({})
            .select('-_id room sender receiver message')
            .sort({$natural: -1})
            .limit(10)
            .exec(function (err, msg) {
                if (err) {
                    return res.sendStatus(500);
                }
                data.msg = msg;
                cb();
            });
    }], function (err) {
        //result
        if ( err ) res.send(err);
        res.json({users: data.users,
            online: data.online,
            msg: data.msg,
            count: data.count});
    });
}

module.exports = router;