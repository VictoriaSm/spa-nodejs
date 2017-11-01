var express = require('express');
var config = require('./config');
var port = process.env.PORT || config.port;
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(__dirname + "/../client"));

app.use(bodyParser.json());

app.use(require('./api/register'));
app.use(require('./api/login'));
// app.use(require('./api/edit'));

app.listen(port, function () {
    console.log('Server running at http://localhost:' + [port]);
});
