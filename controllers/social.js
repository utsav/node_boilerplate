var User = require('./../models/users');
var bcrypt = require('bcryptjs');

exports.addFacebookUsers = function(req, res) {
	User.find({ email: req.body.email }, function(err, loginResult) {
		if (err) {
			res.status(400).send(err);
		} else {
			if (loginResult.length === 0) {
				var userDataObj = {
					firstName: req.body.first_name,
					lastName: req.body.last_name,
					email: req.body.email,
					facebookId: req.body.id,
					mobile: req.body.mobile,
					role: 3,
					name:req.body.name,
					created_on: new Date(),
					last_login: new Date()
				};
				var userFbData = new User(userDataObj);
				userFbData.save(function(err, fbResult) {
					if (err) {
						res.status(400).json(err);
						console.log("err");
					} else {
						res.status(200).json(fbResult);
						console.log(fbResult);
					}
				});
			} else {
				res.status(200).send(loginResult[0]);
			}
		}
	});
}

exports.addGoogleUser = function (req,res) {
	User.find({email:req.body.email}, function( err, googleResult) {
		if (err) {
			res.status(400).send(err);
		} else {
			if (googleResult.length === 0) {
				var userDataObj = {
					firstName: req.body.given_name,
					lastName: req.body.family_name,
					email: req.body.email,
					googleId: req.body.id,
					mobile: req.body.mobile,
					role: 3,
					name : req.body.name,
					created_on: new Date(),
					last_login: new Date()
				};
				var userData = new User(userDataObj);
				userData.save( function(err, resp) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.status(200).send(resp);
					}
				});
			} else {
				res.status(200).send(googleResult[0]);
			}
		}
	});
}
