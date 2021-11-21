const express = require("express");
const schoolRouter = express.Router();

const { isAuth } = require("../middlewares/auth-school");
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
  postAddSubject,
} = require("../controllers/schoolController");

schoolRouter.get("/create", getCreateSchool);

schoolRouter.post("/create", postCreateSchool);

schoolRouter.get("/login", getSchoolLogin);

schoolRouter.post("/login", postSchoolLogin);

schoolRouter.get("/dashboard", isAuth, getSchoolDashBoard);

schoolRouter.post("/add-classroom", postAddClassroom);

schoolRouter.post("/add-user", postAddUser);

schoolRouter.post("/add-subject", postAddSubject);

//redirect urls
schoolRouter.get("/add-classroom", (req, res) => {
  res.redirect("/school/dashboard");
});

schoolRouter.get("/add-user", (req, res) => {
  res.redirect("/school/dashboard");
});

schoolRouter.get("/add-subject", (req, res) => {
  res.redirect("/schoo/dashboard");
});

module.exports = schoolRouter;
