'use strict';
var Book = require('../models/bookmodel');
var Category = require('../models/categorymodel');

module.exports = function(router){
	router.get('/', function(req, res){
		// Get cart from session
		var cart = req.session.cart;
		var displayCart = {items: [], total:0};
		var total = 0;

		// Get Total
		for(var item in cart){
			displayCart.items.push(cart[item]);
			total += (cart[item].qty * cart[item].price);
		}
		displayCart.total = total;

		// Render Cart
		res.render('cart/index', {
			cart: displayCart
		});
	});
	//Empty the cart
	router.get('/remove', function (req, res){
		req.session.cart = {};
		req.flash('success', 'Your cart was cleared successfully!')
		res.location('/cart');
		res.redirect('/cart');
	})

	router.post('/:id', function(req, res){
		req.session.cart = req.session.cart || {};
		var cart = req.session.cart;

		Book.findOne({_id:req.params.id}, function(err, book){
			if(err){
				console.log(err);
			}

			if(cart[req.params.id]){
				cart[req.params.id].qty++
			} else {
				cart[req.params.id] = {
					item: book._id,
					title: book.title,
					price: book.price,
					qty: 1
				}
			}

			res.redirect('/cart');
		});
	});
}
