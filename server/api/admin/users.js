var router = require('express').Router(),
    User = require('../../models/user').User,
    redis = require('redis'),
    client = redis.createClient();

router.get('/getAllUsers', getAllUser);

function getAllUser(req, res) {
    // var data = {count: {msg: 0, online: 0, users: 0}};

    User.find({})
        .select('-_id -__v')
        .sort({ $natural: -1 })
        .exec(function (err, user) {
            if (err) {
                return res.sendStatus(500);
            }
            if (!user) {
                return res.sendStatus(401);
            }
            console.log('.................',user);
            res.json(user);
        });

    // client.hgetall('online', function (err, obj) {
    //     if ( obj !== null ) {
    //         data.online = obj;
    //     }
    // });

}

module.exports = router;