var mongoose = require('mongoose');
var userSchema = require('./models/user');
var urlSchema = require('./models/link');

var uri = 'mongodb://localhost/test2';
// mongoose.connect(uri); 
// var db = mongoose.connection;
var db = mongoose.createConnection(uri); 
db.on('error', function () {
  console.log('error creating db connection');
});

db.once('open', function() {
  console.log('created db connection');
  var User = db.model('User', userSchema);
  var user1 = new User({
    username: 'gabe',
    password: 'secret'
  });
  user1.save( function (err, user) {
    if ( err ) {
      return console.log(err);
    }
    console.log(user);
  });  
  var Link = db.model('Link', urlSchema);
  console.log('config file, db.link should be:', db.Link); 
  var link1 = new Link({
    url: 'http://www.google.com',
    title: 'google',
    baseUrl: 'mysite',
  });
  link1.save( function (err, link1) {
    if ( err ) {
      return console.log(err);
    }
    console.log('check out link1: ' + link1);
  });
});

module.exports = db;