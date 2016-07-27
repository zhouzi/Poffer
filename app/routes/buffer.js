var router = require('express').Router();
var bufferClient = require('../lib/bufferClient');
var async = require('async');

router.post('/add', function (req, res) {
  var request_token = decodeURIComponent(req.query.request_token);
  var twitter_username = decodeURIComponent(req.query.twitter_username);
  var tweets = req.body;

  if (!request_token) {
    res.statusCode = 400;
    res.json({
      status: 'error',
      message: 'request_token missing'
    });
    return;
  }

  if (!twitter_username) {
    res.statusCode = 400;
    res.json({
      status: 'error',
      message: 'twitter_username missing'
    });
    return;
  }

  if (!tweets) {
    res.statusCode = 400;
    res.json({
      status: 'error',
      message: 'tweets missing'
    });
    return;
  }

  if (tweets.length === 0) {
    res.statusCode = 400;
    res.json({
      status: 'error',
      message: 'empty tweets'
    });
    return;
  }

  async
    .waterfall([
      function (callback) {
        bufferClient.getAccessToken(request_token, callback);
      },
      function (accessToken, callback) {
        bufferClient.getTwitterProfile(accessToken, twitter_username, function (err, profile) {
          if (err) {
            callback(err);
            return;
          }

          callback(null, accessToken, profile.id);
        });
      },
      function (accessToken, profileId, callback) {
        bufferClient.addItemsToQueue(accessToken, profileId, tweets, callback);
      }
    ], function (err) {
      if (err) {
        res.statusCode = 500;
        res.json({
          status: 'error',
          message: err.message
        });
        return;
      }

      res.json({
        status: 'ok'
      });
    });
});

module.exports = router;
