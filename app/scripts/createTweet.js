var program = require('commander');

program
  .version('0.0.1')
  .option('-e, --email [email]', 'user email')
  .option('-p, --pocket [id]', 'Pocket item id')
  .option('-c, --content [content]', 'tweet content')
  .option('-i, --image [image]', 'tweet image')
  .parse(process.argv);

if (!program.email) {
  console.error('email is a required argument');
  return;
}

if (!program.pocket) {
  console.error('pocket is a required argument');
  return;
}

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/poffer';
var mongoose = require('mongoose');
mongoose.connect(MONGO_URL);

var User = require('../models/User');
var Tweet = require('../models/Tweet');

User.findOne({
  email: program.email
}, function (err, user) {
  if (err) {
    console.error(err);
    mongoose.disconnect();
    return;
  }

  new Tweet({
    content: program.content || '',
    image: program.image || '',
    pocket_item_id: program.pocket,
    owner_id: user._id
  }).save(function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('tweet created');
    }

    mongoose.disconnect();
  });
});
