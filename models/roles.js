var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
	name: {
		type: String,
		Default: null
	},
	roleCode: Number,
});

var Role = mongoose.model('Role', roleSchema);
module.exports = Role;
