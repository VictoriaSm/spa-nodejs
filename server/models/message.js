var mongoose = require('../libs/mongoose'),
    SchemaMsg = mongoose.Schema;

module.exports.messages = mongoose.model('message', new SchemaMsg({
    message : String,
    sender: String,
    receiver: String,
    room: String,
    date: Date
}));