var express = require("express");
var router = express.Router();
var db = require("../models");
var request = require('request');
var key = process.env.GOOGLE_API_KEY;

// router.get("/", function (req, res) {
// 	res.render("index");
// });

router.route("/signup")
	.get(function (req, res) {
		res.render("auth/signup");
	})

	.post(function (req, res) {
		var pass1 = req.body.password1;
		var pass2 = req.body.password2;
		var email = req.body.email;
		var name = req.body.name;
		var address1 = req.body.address1;
		var address2 = req.body.address2;
		var city = req.body.city;
		var state = req.body.state;
		var zip = req.body.zip;
		// var neighborhood;
		// var addressString = [address1, city, state, zip].join('+');
		// addressString = addressString.split(' ');
		// addressString = addressString.join('+');
		// console.log(addressString);
		if (pass1 != pass2) {
			req.flash('danger', 'Passwords do not match');
			res.render('auth/signup', {alerts:req.flash()});
		} else {
			// request("https://maps.googleapis.com/maps/api/geocode/json?address="+addressString+"&key="+key, function (error, response, body) {
			// 	var data = JSON.parse(body);
			// 	var result = data.results[0].address_components;
			// 	result.forEach(function (component) {
			// 		component.types.forEach(function (type) {
			// 			if (type == 'neighborhood') {
			// 				neighborhood = component.long_name;
			// 			}
			// 		});
			// 	});
			// 	res.send(neighborhood);
			// });
			db.user.findOrCreate({
				where: {
					email: email
				}, 
				defaults: {
					password: pass1,
					name: name,
					car_want: false,
					car_have: false,
					pt_want: false,
					bicycle_want: false,
					bicycle_have: false,
					walk_want: false
				}
			}).spread(function (user, created) {
				if (created) {
					req.flash('success', 'Success! You are signed up. Click Login to log in.');
					res.render('main/index', {alerts:req.flash()});
				} else {
					req.flash('danger', 'A user with that email already exists.');
					res.render('auth/signup', {alerts:req.flash()});
				}
			}).catch(function (err) {
				req.flash('danger', err.message);
				res.render('auth/signup', {alerts:req.flash()});
			});
		}
	});

router.route("/login")
	.get(function (req, res) {
		res.render("auth/login");
	})
	.post(function (req, res) {
		db.user.authenticate(req.body.email, req.body.password, function (err, user) {
			if (user) {
				if (err) throw err;
				req.session.user = user.id;
				req.flash('success', 'You are now logged in.');
				res.redirect('/');

			} else {
			req.flash('danger', 'Error');
			res.redirect('/auth/login');	
		}});
	});

router.get("/logout", function (req, res) {
	if (req.session.user) {
		req.session.user = null;
	}
	res.redirect('/');
});

module.exports = router;

























