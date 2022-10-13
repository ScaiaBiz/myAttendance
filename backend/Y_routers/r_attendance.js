const express = require('express');

const attendanceCtrl = require('../Z_controllers/c_attendance');

const router = express.Router();

router.get('/postRecord/:tagId', attendanceCtrl.postRecord);

router.post('/getRecors', attendanceCtrl.getRecors);

module.exports = router;
