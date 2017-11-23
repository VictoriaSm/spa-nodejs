var router = require('express').Router(),
    async = require('async'),
    User = require('../../models/user').User,
    redis = require('redis'),
    client = redis.createClient();

router.get('/getAllUsers', getAllUser);

function getAllUser(req, res) {
    var data = {};

    async.parallel([function (cb) {
        User.find({username: {$ne: '_admin_'}})
            .select('-_id -__v')
            .sort({ $natural: -1 })
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
    }], function (err) {
        if ( err ) res.send(err);
        res.json({users: data.users,
            online: data.online});
    });
}

module.exports = router;