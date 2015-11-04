var express = require("express");
var router = express.Router();
var db = require("../models")

router.get("/", function (req, res) {
	res.render("index");
});

router.route("/signup")
	.get(function (req, res) {
		res.render("auth/signup");
	})

	.post(function (req, res) {
		var pass1 = req.body.password1;
		var pass2 = req.body.password2;
		var email = req.body.email;
		var name = req.body.name;

		if (pass1 != pass2) {
			req.flash('danger', 'Passwords do not match');
			res.render('auth/signup', {alerts:req.flash()});
		} else {
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
					res.render('id/settings', {alerts:req.flash()});
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

























