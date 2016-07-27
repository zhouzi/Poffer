var router = require('express').Router();
var bufferClient = require('../lib/bufferClient');
var async = require('async');
var Tweet = require('../models/Tweet');
var bugsnag = require('bugsnag');
var User = require('../models/User');

router.post('/add', function (req, res) {
  var request_token = decodeURIComponent(req.query.request_token);
  var twitter_username = decodeURIComponent(req.query.twitter_username);
  var ownerEmail = decodeURIComponent(req.query.email);
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
        addTweetsToBufferQueueAndIgnorePocketItem(accessToken, profileId, tweets, ownerEmail, callback);
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

function addTweetsToBufferQueueAndIgnorePocketItem (accessToken, profileId, tweets, ownerEmail, callback) {
  async.waterfall([
    function (next) {
      getUserByEmail(ownerEmail, function (err, result) {
        if (err) {
          // swallow errors
          bugsnag.notify(err);
        }

        next(null, result);
      });
    },
    function (user, next) {
      addTweetsToBufferQueue(accessToken, profileId, tweets, user ? user._id : null, next)
    }
  ], callback);
}

function getUserByEmail (email, callback) {
  if (email == null) {
    callback();
    return;
  }

  User.findOne({
    email: email
  }, function (err, result) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, result);
  });
}

function addTweetsToBufferQueue (accessToken, profileId, tweets, ownerId, done) {
  async.eachSeries(
    tweets,
    function (tweet, callback) {
      bufferClient.addItemToQueue(accessToken, profileId, tweet, function (err) {
        if (err) {
          callback(err);
          return;
        }

        if (ownerId == null) {
          callback();
          return;
        }

        new Tweet({
          content: tweet.content,
          image: tweet.image || '',
          pocket_item_id: tweet.pocketId,
          owner_id: ownerId
        }).save(function (err) {
          if (err) {
            // do not stop execution at this point
            // for a database error
            bugsnag.notify(err);
          }

          callback();
        });
      });
    },
    done
  );
}

module.exports = router;
