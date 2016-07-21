var _ = require('lodash');
var router = require('express').Router();
var request = require('request');

var defaults = {
  headers: {
    'content-type': 'application/json; charset=UTF8',
    'X-Accept': 'application/json'
  }
};

router.get('/request', function (req, res) {
  var options = _.assign({}, defaults, {
    body: JSON.stringify({
      consumer_key: process.env.POCKET_CONSUMER_KEY,
      redirect_uri: process.env.POCKET_REDIRECT_URI
    }),
    url: 'https://getpocket.com/v3/oauth/request'
  });

  request.post(options, function (error, response, body) {
    var request_token = JSON.parse(body).code;

    res.json({
      request_token: request_token,
      redirect_uri: process.env.POCKET_REDIRECT_URI
    });
  });
});

module.exports = router;
