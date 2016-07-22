var router = require('express').Router();
var pocketClient = require('../lib/pocketClient');

router.get('/retrieve', function (req, res) {
  var request_token = req.query.request_token;
  var tag = req.query.tag;
  pocketClient.getAccessToken(request_token, function (err, access_token) {
    if (err) {
      res.statusCode = 500;
      res.json({
        status: 'error',
        message: err.message
      });
      return;
    }

    pocketClient.getItems(access_token, tag, function (err, items) {
      if (err) {
        res.statusCode = 500;
        res.json({
          status: 'error',
          message: err.message
        });
        return;
      }

      res.json(items);
    });
  });
});

module.exports = router;
