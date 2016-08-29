var _ = require('lodash');
var request = require('request');

module.exports.getAccessToken = function getAccessToken (request_token, callback) {
  var options = {
    url: 'https://api.bufferapp.com/1/oauth2/token.json',
    formData: {
      client_id: process.env.BUFFER_CLIENT_ID,
      client_secret: process.env.BUFFER_CLIENT_SECRET,
      redirect_uri: process.env.BUFFER_REDIRECT_URI,
      code: request_token,
      grant_type: 'authorization_code'
    }
  };

  request.post(options, function (error, response, body) {
    var accessToken;
    try {
      accessToken = JSON.parse(body).access_token;
    } catch (err) {
      callback(err);
      return;
    }

    callback(null, accessToken);
  });
};

module.exports.getTwitterProfile = function getTwitterProfile (accessToken, username, callback) {
  var options = {
    url: 'https://api.bufferapp.com/1/profiles.json?access_token=' + accessToken
  };

  request.get(options, function (error, response, body) {
    var profiles;
    try {
      profiles = JSON.parse(body);
    } catch (err) {
      callback(err);
      return;
    }

    var twitterProfiles = profiles
      .filter(function (profile) {
        return profile.service === 'twitter';
      })
      .map(function (profile) {
        return _.pick(profile, [
          'avatar',
          'id',
          'service_username',
        ]);
      });

    callback(null, _.find(twitterProfiles, function (twitterProfile) {
      return twitterProfile.service_username.toLowerCase() === username.toLowerCase();
    }));
  });
};

module.exports.addItemToQueue = function addItemToQueue (accessToken, profile_id, tweet, callback) {
  var data = {
    text: tweet.content,
    'profile_ids[]': profile_id
  };

  if (tweet.image) {
    data['media[photo]'] = tweet.image;
  }

  var options = {
    formData: data,
    url: 'https://api.bufferapp.com/1/updates/create.json?access_token=' + accessToken
  };

  request.post(options, function (err, res, body) {
    var data;

    try {
      data = JSON.parse(body);
    } catch (err) {
      callback(err);
      return;
    }

    if (data.success !== true) {
      callback(new Error(data.error || data.message));
      return;
    }

    callback();
  });
};
