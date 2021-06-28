const express=require('express');
const api_router=express.Router();
const empcontroller=require('../controllers/employeecontroller.js');
api_router.use(express.urlencoded({extended:true}));
api_router.use(express.json());
api_router.post('/employee/add',empcontroller.createEmployee);
api_router.get('/employees/all',empcontroller.findAllEmployees);
api_router.get('/employee/:id',empcontroller.getEmployee);
api_router.put('/employee/update/:id',empcontroller.updateEmployee);
api_router.delete('/employee/delete/:id',empcontroller.deleteEmployee);
module.exports=api_router;

