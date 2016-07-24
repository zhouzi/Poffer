var _ = require('lodash');
var async = require('async');
var router = require('express').Router();
var pocketClient = require('../lib/pocketClient');
var User = require('../models/User');
var Tweet = require('../models/Tweet');

router.get('/retrieve', function (req, res) {
  var request_token = req.query.request_token;
  var tag = req.query.tag;

  async
    .waterfall([
      function (callback) {
        pocketClient.getAccessToken(request_token, callback);
      },
      function (data, callback) {
        pocketClient.getItems(data.access_token, tag, function (err, items) {
          if (err) {
            callback(err);
            return;
          }

          callback(null, items, data.username);
        });
      },
      function (items, pocketId, callback) {
        User.findOne({
          pocket_id: pocketId
        }, function (err, user) {
          if (err) {
            // swallow errors at this point
            callback(null, items);
            return;
          }

          if (user == null) {
            callback(null, items);
            return;
          }

          Tweet.find({
            owner_id: user._id
          }, function (err, tweets) {
            if (err) {
              // swallow errors at this point
              callback(null, items, user.email);
              return;
            }

            if (tweets.length === 0) {
              // return early to avoid going through .pickBy
              // which could be expensive if there are lots of items
              callback(null, items, user.email);
              return;
            }

            var tweetsPocketItems = tweets.map(function (tweet) {
              return tweet.pocket_item_id;
            });

            callback(null, _.pickBy(items, function (item) {
              return tweetsPocketItems.indexOf(item.item_id) < 0;
            }), user.email);
          });
        });
      }
    ], function (err, items, email) {
      if (err) {
        res.statusCode = 500;
        res.json({
          status: 'error',
          message: err.message
        });
        return;
      }

      if (email) {
        res.set('User-Email', email);
      }

      res.json(items);
    });
});

router.post('/delete/:pocket_item_id', function (req, res) {
  var pocket_item_id = req.params.pocket_item_id;

  if (!pocket_item_id) {
    res.statusCode = 400;
    res.json({
      status: 'error',
      message: 'pocket item id missing'
    });
    return;
  }

  var email = req.query.email;

  if (!email) {
    res.statusCode = 400;
    res.json({
      status: 'error',
      message: 'user email missing'
    });
    return;
  }

  async
    .waterfall([
      function (callback) {
        User.findOne({
          email: email
        }, callback);
      },
      function (user, callback) {
        if (user == null) {
          callback(new Error('user not found'));
          return;
        }

        callback(null, user);
      },
      function (user, callback) {
        new Tweet({
          content: '',
          pocket_item_id: pocket_item_id,
          owner_id: user._id
        }).save(callback);
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
