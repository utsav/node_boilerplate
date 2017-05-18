var Role = require('./../models/roles');

exports.creteRole = function (req, res) {
	Role.count({name: req.body.name}).exec(function(err, roleCount) {
		if (err) {
			res.status(400).json(err);
			return;
		} else {
			console.log(roleCount);
			// if count
			if(roleCount) {
				res.status(400).json({error: "role already exists."});
				return;
			} else {
				// if no count or count === 0 then
				var data = new Role (req.body);
				data.save(function(err, result) {
					if (err) {
						return res.status(400).json(err);
					} else {
						return res.status(200).json({message: 'role successfully created', row: result});
					}
				});
			}
		}
	});
};

exports.getRoles = function (req, res) {
	Role.find().exec(function(err, getData) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(getData);
		}
	});
};

exports.updateRole = function (req, res) {
	Role.update({_id:req.body._id}, req.body, function (err, updateRole) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(updateRole);
		}
	});
};

exports.deleteRole = function (req, res) {
	Role.remove({_id:req.params.id}, function (err, dltRole) {
		if (err) {
			return res.status(400).json(err);
		} else {
			return res.status(200).json(dltRole);
		}
	});
};
