var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 15
    },
    salt: {
        type: String
    },
    name: {
        type: String,
        required: false,
        minLength: 3,
        maxLength: 20
    },
    age: {
        type: Number,
        required: false,
        min: 10,
        max: 110
    }
});

exports.User = mongoose.model('User', schema);