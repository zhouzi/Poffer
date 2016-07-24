var mongoose = require('mongoose');

var schema =
  new mongoose.Schema({
    date_created: {
      type: Date,
      default: Date.now
    },
    date_modified: {
      type: Date,
      default: Date.now
    },
    email: {
      type: String
    },
    pocket_id: {
      type: String
    },
    pocket_access_token: {
      type: String
    },
    buffer_id: {
      type: String
    },
    buffer_access_token: {
      type: String
    }
  });

module.exports = mongoose.model('User', schema);
