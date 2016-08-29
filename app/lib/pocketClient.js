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
    var requestToken;
    try {
      requestToken = JSON.parse(body).code;
    } catch (err) {
      callback(err);
      return;
    }

    callback(null, requestToken);
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
    var accessToken;
    try {
      accessToken = JSON.parse(body);
    } catch (err) {
      callback(err);
      return;
    }

    callback(null, accessToken);
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
    var items;
    try {
      items =JSON.parse(body).list;
    } catch (err) {
      callback(err);
      return;
    }

    items = _.mapValues(items, function (item) {
      return _.pick(item, [
        'item_id',
        'resolved_title',
        'resolved_url',
      ]);
    });
    callback(null, items);
  });
};
