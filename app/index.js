var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/poffer';
var mongoose = require('mongoose');
mongoose.connect(MONGO_URL);

var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var publicDir = path.join(__dirname, '../public');
app.use('/', express.static(publicDir));

var viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'jade');

app.get('/status', function (req, res) {
  res.json({
    status: 'ok'
  });
});

app.use(function (req, res) {
  res.render('index', {
    env: JSON.stringify({
      buffer: {
        client_id: process.env.BUFFER_CLIENT_ID,
        redirect_uri: process.env.BUFFER_REDIRECT_URI
      }
    })
  });
});

var PORT = process.env.PORT || '1234';
var IP = process.env.IP || 'localhost';
app.listen(PORT, IP, function () {
  console.log('Listening to ' + IP + ":" + PORT);
});
