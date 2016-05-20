var mongoose = require('mongoose');

var uri = 'mongodb://localhost/test2';

var db = mongoose.createConnection(uri); 
db.on('error', function () {
  console.log('error creating db connection');
});

db.once('open', function() {

});


module.exports = db;