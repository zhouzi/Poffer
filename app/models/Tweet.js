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
    content: {
      type: String,
      require: true
    },
    image: {
      type: String
    },
    pocket_item_id: {
      type: String,
      require: true
    },
    owner_id: {
      type: String,
      require: true
    }
  });

module.exports = mongoose.model('Tweet', schema);
