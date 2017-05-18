var User = require('./../models/users.js');

exports.createAdminUser = function (req, res) {
	var adminUserObj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		role: 2
	};

	var userData = new User(adminUserObj);
	userData.save(function (err, result) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(result);
		}
	});
};

exports.getAdminUserDetails = function (req, res) {
	User.find({_id : req.params.adminId, is_Archieved : false}, function(err, getUserResult) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(getUserResult);
		}
	});
};

exports.updateAdminUser = function (req, res) {

	var adminUserObj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};

	User.update({_id:req.body._id}, adminUserObj, function (err, updateUser) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(updateUser);
		}
	});
};

exports.deleteAdminUser = function (req, res) {
	User.find({_id : req.params.id}, function(err, resultSuperCheck){
		if(err)
			return res.status(400).json(err);
		else {
			if(resultSuperCheck[0].role !== 1) {
				User.remove({_id:req.params.id}, function(err, deleteResult) {
					if (err) {
						return res.status(400).json(err);
					} else {
						return res.status(200).json(deleteResult);
					}
				});
			} else {
				return res.status(400).json({message : 'Super Admin cant be deleted'});
			}
		}
	});

};

exports.getAdminUserList = function(req, res) {
	User.find({is_Archieved : false}, function(err, resultAdminList){
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(resultAdminList);
		}
	});
};
