const express = require('express');
const schoolRouter = express.Router();
// const bcrypt = require('bcryptjs');


// importing schoolConttoller here
const {getCreateSchool, postCreateSchool, getSchoolLogin, postSchoolLogin, getSchoolDashBoard, postAddClassroom} = require('../controllers/schoolController')

schoolRouter.get('/create', getCreateSchool);

schoolRouter.post('/create', postCreateSchool);

schoolRouter.get('/login', getSchoolLogin);

schoolRouter.post('/login', postSchoolLogin);

schoolRouter.get('/dashboard', getSchoolDashBoard);

schoolRouter.post('/add-classroom', postAddClassroom);

module.exports = schoolRouter;