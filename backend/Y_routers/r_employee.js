const express = require('express');

const employeeCtrl = require('../Z_controllers/c_employee');

const router = express.Router();

router.get('/getEmployeesList', employeeCtrl.getEmplyeesList);
router.get('/getEmployee/:id', employeeCtrl.getEmplyeeData);
router.get('/postNewEmployee', employeeCtrl.postNewEmployee);
router.get('/editEmplyee', employeeCtrl.editEmplyeeData);
