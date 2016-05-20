var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose'); 
var Promise = require('bluebird');


var urlSchema = new mongoose.Schema({
  url: {type: String, required: true},
  title: String,
  baseUrl: String,
  code: String,
  visits: Number
});

urlSchema.pre('save', function (next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);

  this.visits = 0;
  next();
});
         
var Link = db.model('Link', urlSchema);

module.exports = Link;
