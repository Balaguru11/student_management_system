const express = require("express");
const schoolRouter = express.Router();

const { isSchool } = require("../middlewares/auth");

// importing schoolController here
const {
  getCreateSchool,
  postCreateSchool,
  getSchoolLogin,
  postSchoolLogin,
  getSchoolDashBoard,
  postAddClassroom,
  postAddUser, putAddUser, 
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
  postFeeCollection,
  getAddStudent,
  postAddStudent,
  getSchedulePlanForm,
  postSchedulePlanForm,
  allChangePwd,
  allDueCollection,
} = require("../controllers/schoolController");

// CREATE SCHOOL
schoolRouter.get("/create", getCreateSchool);
schoolRouter.post("/create", postCreateSchool);

// School Login
schoolRouter.get("/login", getSchoolLogin);
schoolRouter.post("/login", postSchoolLogin);

// School Dashboard
schoolRouter.get("/dashboard", isSchool, getSchoolDashBoard);

// School change Password
schoolRouter.all("/dashboard/change-password", isSchool, allChangePwd);

// Fee Structure CRUD (assigned to staff_role = 9 Admin)
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
// schoolRouter.put("/dashboard/user", isSchool, putAddUser);

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
schoolRouter.post("/dashboard/add-student", isSchool, postAddStudent); // Adding student to main_login (Inactive)

// fee collection CRUD
schoolRouter.get("/dashboard/fee-collection", isSchool, getFeeCollection);
schoolRouter.post("/dashboard/fee-collection", isSchool, postFeeCollection);
// Due collection
schoolRouter.all("/dashboard/fee-due-collection", isSchool, allDueCollection);

// schedule template CRUD
schoolRouter.get("/dashboard/schedule-plan", isSchool, getSchedulePlanForm);
schoolRouter.post("/dashboard/schedule-plan", isSchool, postSchedulePlanForm);

// not completed yet
// Announcements
schoolRouter.get("/dashboard/message", isSchool, getMessageR);
schoolRouter.post("/dashboard/message", isSchool, postMessageC);
schoolRouter.put("/dashboard/message/:id", isSchool, putMessageU);
schoolRouter.delete("/dashboard/message/:id", isSchool, deleteMessageD);

module.exports = schoolRouter;
