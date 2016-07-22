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

var pocketRoute = require('./routes/pocket');
app.use('/api/pocket', pocketRoute);

var pocketClient = require('./lib/pocketClient');
app.get('/', function (req, res) {
  pocketClient.getRequestToken(function (err, pocketRequestToken) {
    if (err) {
      res.statusCode = 500;
      res.json({
        status: 'error',
        message: err.message
      });
      return;
    }

    res.render('index', {
      env: JSON.stringify({
        accounts: {
          buffer: {
            client_id: process.env.BUFFER_CLIENT_ID,
            redirect_uri: process.env.BUFFER_REDIRECT_URI
          },
          pocket: {
            request_token: pocketRequestToken,
            redirect_uri: process.env.POCKET_REDIRECT_URI
          }
        }
      })
    });
  });
});

app.get('/pocket/callback', function (req, res) {
  res.render('pocket-callback');
});

app.use(function (req, res) {
  res.statusCode = 404;

  res.json({
    status: 'error',
    code: 404,
    message: 'Page not found'
  });
});

var PORT = process.env.PORT || '1234';
var IP = process.env.IP || 'localhost';
app.listen(PORT, IP, function () {
  console.log('Listening to ' + IP + ":" + PORT);
});
