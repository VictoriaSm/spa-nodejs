var mongoose = require('../libs/mongoose'),
    SchemaMsg = mongoose.Schema;

var schemaMsg = new SchemaMsg({
    room: {
        type: String
    },
    message: {
        type: String
    }
});

exports.Message = mongoose.model('Message', schemaMsg);