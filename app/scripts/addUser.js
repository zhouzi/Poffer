var program = require('commander');

program
  .version('0.0.1')
  .option('-e, --email [email]', 'user email')
  .option('-p, --pocket [id]', 'Pocket username')
  .option('-b, --buffer [id]', 'Buffer user id')
  .parse(process.argv);

if (!program.email) {
  console.error('email is a required argument');
  return;
}

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/poffer';
var mongoose = require('mongoose');
mongoose.connect(MONGO_URL);

var data = {
  email: program.email
};

if (program.pocket) {
  data.pocket_id = program.pocket.replace(/^@/, '');
}

if (program.buffer) {
  data.buffer_id = program.buffer;
}

var User = require('../models/User');
new User(data).save(function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(data.email + ' is now a VIP');
  }

  mongoose.disconnect();
});
