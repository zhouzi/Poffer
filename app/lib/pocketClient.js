var _ = require('lodash');
var request = require('request');

var defaults = {
  headers: {
    'content-type': 'application/json; charset=UTF8',
    'X-Accept': 'application/json'
  }
};

module.exports.getRequestToken = function getRequestToken (callback) {
  var options = _.assign({}, defaults, {
    url: 'https://getpocket.com/v3/oauth/request',
    body: JSON.stringify({
      consumer_key: process.env.POCKET_CONSUMER_KEY,
      redirect_uri: process.env.POCKET_REDIRECT_URI
    })
  });

  request.post(options, function (error, response, body) {
    var request_token = JSON.parse(body).code;
    callback(null, request_token);
  });
};
