'use strict';

var mongoose = require('mongoose');

var db = function(){
  return{
    config: function(conf){
      mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Connection error'));
      db.once('open', function (){
        console.log('DB connection open...');
      });
    }
  }
}

module.exports= db();
