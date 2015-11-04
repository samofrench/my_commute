var express = require("express");
var router = express.Router();
var db = require("../models")

router.route("/")
	.get(function (req, res) {
		if(req.session.user) {
			var data;
			db.user.findById(req.session.user).then(function (user) {
				data = user.get();
				res.render("settings/index", {data});
			})
		} else {
			res.send("Please log in to see this page.");
		}
	})

	.post(function (req, res) {
		if (req.session.user) {		
			db.user.findById(req.session.user).then(function (user) {

				user.email = req.body.email;
				user.name = req.body.name;
				user.email = req.body.email;
				// user.address1 = req.body.add1;
				// user.address2 = req.body.add2;
				// user.city = req.body.city;
				// user.state = req.body.state;
				// user.zip = req.body.zip;
				
				user.car_want = req.body.cw;
				user.car_have = req.body.ch;
				user.pt_want = req.body.ptw;
				user.bicycle_want = req.body.bw;
				user.bicycle_have = req.body.bh;
				user.walk_want = req.body.ww;
				user.save().then(function () {
					req.flash('success', 'User information updated successfully');
					res.render('main/index', {alerts:req.flash()});
				
				})
			});
		} else {
			res.send("Please log in.");
		}
	});

module.exports = router;
