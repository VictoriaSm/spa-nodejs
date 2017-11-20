var mongoose = require('../libs/mongoose'),
    SchemaMsg = mongoose.Schema;

// var schemaMsg = new SchemaMsg({
//     message: String,
//     room: String,
//     // receiver: String,
//     date: Date
// });
//
// exports.Message = mongoose.model('Message', schemaMsg);

module.exports.messages = mongoose.model('message',new SchemaMsg({
    message : String,
    sender: String,
    receiver: String,
    room: String,
    date    : Date
}));