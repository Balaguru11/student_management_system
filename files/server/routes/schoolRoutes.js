const express = require("express");
const schoolRouter = express.Router();
const dbcon = require("../DB/database");

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
  postAddFeeStructure,
} = require("../controllers/schoolController");

schoolRouter.get("/create", getCreateSchool);

schoolRouter.post("/create", postCreateSchool);

schoolRouter.get("/login", getSchoolLogin);

schoolRouter.post("/login", postSchoolLogin);

schoolRouter.get("/dashboard", isAuth, getSchoolDashBoard);

schoolRouter.post("/add-classroom", postAddClassroom);

schoolRouter.post("/add-user", postAddUser);

schoolRouter.post("/add-subject", postAddSubject);

schoolRouter.post("/add-fees", postAddFeeStructure);

//redirect urls
schoolRouter.get("/add-classroom", (req, res) => {
  // 2 queries
  // view class sections data

  // fetch class
  res.redirect("/school/dashboard");
});

schoolRouter.get("/add-user", (req, res) => {
  res.redirect("/school/dashboard");
});

schoolRouter.get("/add-subject", (req, res) => {
  res.redirect("/school/dashboard");
});

// working here
schoolRouter.get("/add-fees", (req, res) => {
  var feeStrucData = `SELECT * FROM school_feestructure WHERE school_id='${session.schoolId}' ORDER BY id DESC `;

  dbcon.query(feeStrucData, (err, res) => {
    if (err) {
      req.flash("err_msg", "No Data found.");
      res.redirect("/school/dashboard");
    } else if (res[0].count == 0) {
      console.log(res);
      res.locals.data = res;
      res.redirect("/school/dashboard");
    }
  });
});

module.exports = schoolRouter;
