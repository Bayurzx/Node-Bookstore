'use strict';

var mongoose = require('mongoose');

var catModel = function(){
  var catSchema = mongoose.Schema({
    name:String,
  });

  return mongoose.model('Category', catSchema);
}

module.exports = new catModel();
