var router = require('express').Router(),
    message = require('../../models/message'),
    redis = require('redis'),
    client = redis.createClient();

router.get('/allRooms', getAllRooms);
router.post('/dialogMsg', getDialogMsg);

function getAllRooms(req, res) {

    client.hvals('rooms', function (err, obj) {
        if (obj !== null) {
            res.json(obj);
        }
    });
}

function getDialogMsg(req, res) {
    message.messages.find({room: req.body.room})
        .select('-_id date sender message')
        .sort({date: -1})
        .exec(function (err, msg) {
            if (err) {
                return res.sendStatus(500);
            }
            res.json(msg);
        });
}

module.exports = router;