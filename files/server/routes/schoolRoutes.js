const express = require("express");
const schoolRouter = express.Router();
// const dbcon = require("../DB/database");

const { isSchool } = require("../middlewares/auth");
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
  viweFeeStructure,
  viewUserAccounts,
  viewSubjects,
  viewClassSections,
  getEditFeeStructure,
  putFeeStructure,
  getMapSubStaff,
  postMapSubStaff,
} = require("../controllers/schoolController");

schoolRouter.get("/create", getCreateSchool);

schoolRouter.post("/create", postCreateSchool);

schoolRouter.get("/login", getSchoolLogin);

schoolRouter.post("/login", postSchoolLogin);

schoolRouter.get("/dashboard", isSchool, getSchoolDashBoard);

schoolRouter.post("/add-classroom", isSchool, postAddClassroom);

schoolRouter.post("/add-user", isSchool, postAddUser);

schoolRouter.post("/add-subject", isSchool, postAddSubject);

schoolRouter.post("/add-fees", isSchool, postAddFeeStructure);

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

// View data from db with the get routes.
schoolRouter.get("/dashboard/fee-structure", isSchool, viweFeeStructure);

schoolRouter.get("/dashboard/users", isSchool, viewUserAccounts);

schoolRouter.get("/dashboard/subjects", isSchool, viewSubjects);

schoolRouter.get("/dashboard/sections", isSchool, viewClassSections);

schoolRouter.get(
  "/dashboard/fee-structure/edit/:id",
  isSchool,
  getEditFeeStructure
);

schoolRouter.put(
  "/dashboard/fee-structure/edit/:id",
  isSchool,
  putFeeStructure
);

// section-subject-staff mapping
schoolRouter.get("/dashboard/section-subject-staff", isSchool, getMapSubStaff);
schoolRouter.post(
  "/dashboard/section-subject-staff",
  isSchool,
  postMapSubStaff
);
module.exports = schoolRouter;
