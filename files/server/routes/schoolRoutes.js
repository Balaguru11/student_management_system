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
  getMessageR,
  postMessageC,
  putMessageU,
  deleteMessageD,
  getFeeCollection,
  getAddStudent,
  postAddStudent,
} = require("../controllers/schoolController");

// CREATE SCHOOL
schoolRouter.get("/create", getCreateSchool);
schoolRouter.post("/create", postCreateSchool);

// School Login
schoolRouter.get("/login", getSchoolLogin);
schoolRouter.post("/login", postSchoolLogin);

// School Dashboard
schoolRouter.get("/dashboard", isSchool, getSchoolDashBoard);

// Fee Structure CRUD
schoolRouter.get("/dashboard/fee-structure", isSchool, viweFeeStructure);
schoolRouter.post("/dashboard/fee-structure", isSchool, postAddFeeStructure);
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

// USERS CRUD
schoolRouter.get("/dashboard/users", isSchool, viewUserAccounts);
schoolRouter.post("/dashboard/add-user", isSchool, postAddUser);
schoolRouter.put("/dashboard/user", isSchool, postAddUser);

// Subjects CRUD
schoolRouter.get("/dashboard/subjects", isSchool, viewSubjects);
schoolRouter.post("/dashboard/add-subject", isSchool, postAddSubject);

// Class Section CRUD
schoolRouter.get("/dashboard/sections", isSchool, viewClassSections);
schoolRouter.post("/dashboard/sections", isSchool, postAddClassroom);

// section-subject-staff mapping
schoolRouter.get("/dashboard/section-subject-staff", isSchool, getMapSubStaff);
schoolRouter.post(
  "/dashboard/section-subject-staff",
  isSchool,
  postMapSubStaff
);

// STUDDNT CRUD
schoolRouter.get("/dashboard/students", isSchool, getAddStudent);
schoolRouter.post("/dashboard/add-student", isSchool, postAddStudent);

// not completed yet
// Announcements
schoolRouter.get("/dashboard/message", isSchool, getMessageR);
schoolRouter.post("/dashboard/message", isSchool, postMessageC);
schoolRouter.put("/dashboard/message/:id", isSchool, putMessageU);
schoolRouter.delete("/dashboard/message/:id", isSchool, deleteMessageD);

// fee collection CRUD
schoolRouter.get("/dashboard/fee-collection", isSchool, getFeeCollection);

module.exports = schoolRouter;
