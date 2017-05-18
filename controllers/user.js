var userModel = require('./../models/users');

exports.getUserList = function (req, res) {
	userModel.find().exec(function (err, resultUserList) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json(resultUserList);
		}
	});
};

exports.createUser = function (req, res) {
	var userObj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		mobile: req.body.mobile,
		role: 3
	};

	var userData = new userModel(userObj);
	userData.save(function (err, result) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json({message : 'User is successfully created', row: result});
		}
	});
};

exports.getUserDetails = function (req, res) {
	userModel.find({_id : req.params.id})(function(err, getUserResult) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(getUserResult);
		}
	});
};

exports.updateUserDetails = function (req, res) {

	var userObj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		mobile: req.body.mobile,
		role: 3
	};

	userModel.update({_id:req.body._id}, userObj, function (err, updateUser) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json({message : 'User successfully updated'});
		}
	});
};

exports.deleteUser = function (req, res) {
	userModel.remove({_id:req.params.id}, function(err, deleteResult) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json({message : 'User successfully deleted'});
		}
	});
};
