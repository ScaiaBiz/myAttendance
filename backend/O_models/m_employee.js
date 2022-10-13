const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	name: { type: String, require: true },
	surname: { type: String, require: true },
	isActive: { type: Boolean, default: true },
	hiringDate: { type: Date },
	tagId: { type: String },
	roundsIN: { type: Number },
	roundsOUT: { type: Number },
	enableExtras: { typeof: Boolean },
	// turnId: { type: Schema.Types.ObjectId, ref: 'Turn' },
	turnId: { type: String },
	// groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
	groupId: { type: String },
	creationDate: { type: Date },
});

// activitySchema.methods.updateActivity = function (activity) {};

module.exports = mongoose.model('Employee', employeeSchema);
