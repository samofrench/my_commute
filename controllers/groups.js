var express = require("express");
var router = express.Router();
var db = require("../models")

router.route("/")
	.get(function (req, res) {
		if(req.session.user) {
			var data = [];
			db.group.findAll().then(function (groups) {
				data = groups;
				res.render("groups/index", {data});
			});
		} else {
			res.send("Please log in to see this page.");
		}
	})

	.post(function (req, res) {
		if (req.session.user) {		
			var data = [];
			db.group.findAll().then(function (groups) {
				data = groups;
			});
			db.group.findOrCreate({
				where: {
					name: req.body.name
				}, 
				defaults: {
				    userId: req.session.user,
				    address1: req.body.address1,
				    address2: req.body.address2,
				    city: req.body.city,
				    state: req.body.state,
				    zip: req.body.zip
				}
			}).spread(function (newGroup, created) {
				if (created) {
//					data.push(newGroup);
					req.flash('success', 'Success! You have created a new group.');
					res.render('groups/index', {alerts:req.flash(), data:data});
				} else {
					req.flash('danger', 'A group with that email already exists.');
					res.render('groups/index', {alerts:req.flash(), data:data});
				}
			}).catch(function (err) {
				req.flash('danger', err.message);
				res.render('groups/index', {alerts:req.flash(), data:data});
			});
		} else {
			res.send("Please log in.");
		}
	});


module.exports = router;


