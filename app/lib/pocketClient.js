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

module.exports.getAccessToken = function getAccessToken (request_token, callback) {
  var options = _.assign({}, defaults, {
    url: 'https://getpocket.com/v3/oauth/authorize',
    body: JSON.stringify({
      consumer_key: process.env.POCKET_CONSUMER_KEY,
      code: request_token
    })
  });

  request.post(options, function (error, response, body) {
    callback(null, JSON.parse(body));
  });
};

module.exports.getItems = function getItems (access_token, tag, callback) {
  var options = _.assign({}, defaults, {
    url: 'https://getpocket.com/v3/get',
    body: JSON.stringify({
      consumer_key: process.env.POCKET_CONSUMER_KEY,
      access_token: access_token,
      tag: tag,
      sort: 'newest',
      detailType: 'simple'
    })
  });

  request.post(options, function (error, response, body) {
    var items = _.mapValues(JSON.parse(body).list, function (item) {
      return _.pick(item, [
        'item_id',
        'resolved_title',
        'resolved_url',
      ]);
    });
    callback(null, items);
  });
};
