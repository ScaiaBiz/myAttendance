const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	name: { type: String, require: true },
	surname: { type: String, require: true },
	active: { type: Boolean, default: true },
	hiringDate: { type: Date },
	tagId: { type: String },
});

// activitySchema.methods.updateActivity = function (activity) {};

module.exports = mongoose.model('Employee', employeeSchema);
