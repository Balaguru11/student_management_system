const express = require("express");
const parentRouter = express.Router();

const { isParent } = require("../middlewares/auth");

const {
  allParentLogin,
  getParentDashboard, trackAStudent, parentPayFeeDue
} = require("../controllers/parentController");

// parent Login
parentRouter.all("/login", allParentLogin);
parentRouter.get("/dashboard", isParent, getParentDashboard);

// parent choosing student to view
parentRouter.get('/dashboard/my-children/:student_id/:stu_school_id', isParent, trackAStudent);

// parent paying due for the children
parentRouter.get('/dashboard/pay-due/:student_id/:stu_school_id', isParent, parentPayFeeDue);

module.exports = parentRouter;
