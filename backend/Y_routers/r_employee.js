const express = require('express');

const employeeCtrl = require('../Z_controllers/c_employee');

const router = express.Router();

router.post('/postNewEmployee', employeeCtrl.postNewEmployee);
router.post('/editEmployee', employeeCtrl.editEmplyeeData);
router.post('/deleteEmployee', employeeCtrl.deleteEmplyeeData);

router.get('/getEmployeesList', employeeCtrl.getEmplyeesList);
router.get('/getEmployee/:id', employeeCtrl.getEmplyeeData);

module.exports = router;
