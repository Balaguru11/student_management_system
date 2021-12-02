const express = require("express");
const studentRouter = express.Router();

// importing schoolController here
const {
  postStuLogin,
  viewStuDashboard,
} = require("../controllers/studentController");

//middlewares - isStudent

// Student Loging in - POST
studentRouter.post("/login", postStuLogin);

// Viewing Student Dasboard after Login
studentRouter.get("/dashboard", viewStuDashboard);

module.exports = studentRouter;
