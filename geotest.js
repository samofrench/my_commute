// var geocoder = require('geocoder');
// geocoder.geocode("Space Needle", function(err, data) {
//   console.log(data.results[0].geometry.location);
// });

var request = require('request');
var key = process.env.GOOGLE_API_KEY;


// request("https://maps.googleapis.com/maps/api/geocode/json?address=1905+E+Blaine+St,+Seattle,+WA+98112&key=AIzaSyB7SaeoFZJTEV5SSr86WXfMri79alS48Zs", function (error, response, body) {
// 	var data = JSON.parse(body);
// 	var result = data.results[0].address_components;
// 	var neighborhood;
// 	result.forEach(function (component) {
// 		component.types.forEach(function (type) {
// 			if (type == 'neighborhood') {
// 				neighborhood = component.long_name;
// 			}
// 		});
// 	});
// 	console.log(neighborhood);
// });

var pass1 = 'zzzzzzzz';
var pass2 = 'zzzzzzzz';
var email = 'z';
var name = 'z';
var address1 = '1905 e blaine st';
var address2 = 'z';
var city = 'seattle';
var state = 'wa';
var zip = '98112';
var neighborhood;
var addressString = [address1, city, state, zip].join('+');
addressString = addressString.split(' ');
addressString = addressString.join('+');
console.log(addressString);
if (pass1 != pass2) {
	req.flash('danger', 'Passwords do not match');
	res.render('auth/signup', {alerts:req.flash()});
} else {
	request("https://maps.googleapis.com/maps/api/geocode/json?address="+addressString+"&key="+key, function (error, response, body) {
		var data = JSON.parse(body);
		console.log(data);
		var result = data.results[0].address_components;
		result.forEach(function (component) {
			component.types.forEach(function (type) {
				if (type == 'neighborhood') {
					neighborhood = component.long_name;
				}
			});
		});
		console.log(neighborhood);
	});
}







