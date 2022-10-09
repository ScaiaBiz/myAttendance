const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
	date: { type: Date, require: true },
	tagId: { type: String, require: true },
	direction: { type: String },
});

// activitySchema.methods.updateActivity = function (activity) {};

module.exports = mongoose.model('Attendance', attendanceSchema);
