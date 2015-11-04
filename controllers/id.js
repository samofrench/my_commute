// var express = require("express");
// var router = express.Router();
// var db = require("../models")

// router.get("/", function (req, res) {
// 	res.render("index");
// });

// router.route("/settings")
// 	.get(function (req, res) {
// 		if(req.session.user === req.params.id) {
// 			res.render("id/settings");
// 		} else {
// 			res.send("Please log in to see this page.");
// 		}
// 	})

// 	.post(function (req, res) {
// 		var id = req.params.id;

// 		if (req.session.user === req.params.id) {		
// 			db.user.findById(id).then(function (user) {
// 				// user.address1 = req.body.add1;
// 				// user.address2 = req.body.add2;
// 				// user.city = req.body.city;
// 				// user.state = req.body.state;
// 				// user.zip = req.body.zip;
// 				user.car_want = req.body.cw;
// 				user.car_have = req.body.ch;
// 				user.pt_want = req.body.ptw;
// 				user.bicycle_want = req.body.bw;
// 				user.bicycle_have = req.body.bh;
// 				user.walk_want = req.body.ww;
// 			}).then(function () {}).catch(function () {});
// 		} else {
// 			res.send("Please log in.");
// 		}
// 	});

// module.exports = router;
