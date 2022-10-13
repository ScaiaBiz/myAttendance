const express = require('express');

const attendanceCtrl = require('../Z_controllers/c_attendance');

const router = express.Router();

router.get('/postRecord/:tagId', attendanceCtrl.postRecord);
router.post('/insertRecors', attendanceCtrl.insertRecord);

router.post('/getRecords', attendanceCtrl.getRecords);

module.exports = router;
