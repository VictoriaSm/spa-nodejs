var mongoose = require('mongoose'),
    config = require('../config');

mongoose.connect(config.mongoose.uri, { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;