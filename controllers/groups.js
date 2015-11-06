var express = require("express");
var router = express.Router();
var db = require("../models")

router.route("/")
	.get(function (req, res) {
		if(req.session.user) {
			var userGroups = [];
			var allGroups = [];
			
			db.user.findById(req.session.user).then(function (user) {
			  user.getGroups().then(function (groups) {
			    userGroups = groups;
			  }).then(function () {
				db.group.findAll().then(function (groups) {
					allGroups = groups;
					res.render("groups/index", {userGroups: userGroups, allGroups: allGroups});
				});			  	
			  });
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
					res.render('main/index', {alerts:req.flash(), data:data});
				} else {
					req.flash('danger', 'A group with that email already exists.');
					res.render('main/index', {alerts:req.flash(), data:data});
				}
			}).catch(function (err) {
				req.flash('danger', err.message);
				res.render('main/index', {alerts:req.flash(), data:data});
			});
		} else {
			res.send("Please log in.");
		}
	});

router.route("/:id")
	.get(function (req, res) {
		if(req.session.user) {
			var id = req.params.id;
			db.group.findById(id).then(function (group) {
				if (group) {
					data = group.get();
					var userId = data.userId;
					db.user.findById(userId).then(function (user) {
						var name = user.name;
						res.render("groups/show", {data: data, name: name})
					});
				} else {
					res.send("Group not found.");
				}	
			})
		} else {
			res.send("Please log in to see this page.");
		}
	})

	.post(function (req, res) {
		if(req.session.user) {
			var groupId = req.params.id;
			var userId = req.session.user;
			db.usersGroups.findOrCreate({
				where: {
					userId: userId,
					groupId: groupId
				}
			}).spread(function (user, created) {
				if (created) {
					req.flash('success', 'Successfully joined group.');
					res.render('main/index', {alerts:req.flash()});
				} else {
					req.flash('success', 'You are already a member of this group.');
					res.render('main/index', {alerts:req.flash()});
				}
			})
		} else {
			res.send("Please log in.");
		}	
	});

module.exports = router;


