var express = require('express');
var config = require('./index');

var app = express();

app.use(express.static(__dirname + "/../client"));

app.listen(config.port);