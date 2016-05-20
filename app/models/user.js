var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
}); 

userSchema.post('save', function () {
  this.hashPassword(); 
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  var user = this; 
  bcrypt.compare(attemptedPassword, user.password, function(err, isMatch) {
    console.log( 'this.password in ', user.password); 
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function() {
  var user = this; 
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      user.password = hash;
      console.log('the hash: ' + user.password);  
    });
};

var User = db.model('User', userSchema);

module.exports = User;
