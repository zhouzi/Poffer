var router = require('express').Router();
var bufferClient = require('../lib/bufferClient');

router.post('/add', function (req, res) {
  var request_token = decodeURIComponent(req.query.request_token);
  var tweets = req.body;

  bufferClient.getAccessToken(request_token, function (err, accessToken) {
    if (err) {
      res.statusCode = 500;
      res.json({
        status: 'error',
        message: err.message
      });
      return;
    }

    bufferClient.addItemsToQueue(accessToken, tweets, function (err) {
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
});

module.exports = router;
