'use strict';

var Book = require('../models/bookmodel');

module.exports = function (router) {
    router.get('/', function (req, res) {
      Book.find({},{}, function (err, books){
        if (err){
          console.log(err);
        }

        //shorten text
        books.forEach(function(book){
          book.truncTxt = book.truncTxt(155);
        })
        //shorten text ends

        var model = {
          books: books
        }
        res.render('index', model);
      });
    });
};
