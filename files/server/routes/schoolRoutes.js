const express = require("express");
const schoolRouter = express.Router();
// const bcrypt = require('bcryptjs');

// importing schoolController here
const {
  getCreateSchool,
  postCreateSchool,
  getSchoolLogin,
  postSchoolLogin,
  getSchoolDashBoard,
  postAddClassroom,
  postAddUser,
} = require("../controllers/schoolController");

schoolRouter.get("/create", getCreateSchool);

schoolRouter.post("/create", postCreateSchool);

schoolRouter.get("/login", getSchoolLogin);

schoolRouter.post("/login", postSchoolLogin);

schoolRouter.get("/dashboard", getSchoolDashBoard);

schoolRouter.post("/add-classroom", postAddClassroom);

schoolRouter.post("/add-user", postAddUser);

//redirect urls
schoolRouter.get("/add-classroom", (req, res) => {
  res.redirect("/school/dashboard");
});

schoolRouter.get("/add-user", (req, res) => {
  res.redirect("/school/dashboard");
});

module.exports = schoolRouter;
