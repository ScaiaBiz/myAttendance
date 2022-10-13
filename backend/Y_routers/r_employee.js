const express = require('express');

const employeeCtrl = require('../Z_controllers/c_employee');

const router = express.Router();

router.post('/postNewEmployee', employeeCtrl.postNewEmployee);

router.get('/getEmployeesList', employeeCtrl.getEmplyeesList);
router.get('/getEmployee/:id', employeeCtrl.getEmplyeeData);
router.get('/editEmplyee', employeeCtrl.editEmplyeeData);

module.exports = router;
