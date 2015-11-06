var express = require("express");
var router = express.Router();
var db = require("../models")

router.route("/")

	.get(function (req, res) {
		if (req.session.user) {
			var userGroups = [];			
			db.user.findById(req.session.user).then(function (user) {
			  user.getGroups().then(function (groups) {
			    userGroups = groups;
				res.render("find/index", {userGroups: userGroups});
			  });
			});	  
		} else {
			res.send("Please log in to see this page.");
		}
	})

	.post(function (req, res) {
		if (req.session.user) {


		} else {
			res.send("Please log in.");
		}
	});

router.route("/results")

	.get(function (req, res) {
		if (req.session.user) {
			var group = req.query.group;
			var mode = req.query.mode;

			db.group.findById(group).then(function (group) {
				group.getUsers().then(function (users) {
					var array = users.filter(function (user) {
						console.log(user);
						return (user[mode] === true);
					});
					console.log("array: "+array);
					res.render('find/results', {array});			
				});						
			});

		} else {
			res.send("Please log in.")
		}
	})

module.exports = router;

