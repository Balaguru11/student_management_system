const express = require("express");
const staffRouter = express.Router();

const { isStaff } = require("../middlewares/auth");

//importing staffControllers Here
const {
  postStaffLogin,
  getStaffDashboard,
  getStaffProfileForm,
  postStaffProfile,
  showStaffProfile,
  getStaffProfileEdit,
  postEditStaffProfile,
  getStudentsList,
  getOneStudentProfile,
  getClassAssigned, allChangePwd, viweFeeStructure, viewUserAccounts, postAddUser
} = require("../controllers/staffController");

staffRouter.post("/login", postStaffLogin);

staffRouter.get("/dashboard", isStaff, getStaffDashboard);
staffRouter.all('/dashboard/change-password', isStaff, allChangePwd);

// staff Profile CRUD Operations.
staffRouter.get("/profile-create", isStaff, getStaffProfileForm);
staffRouter.post("/profile-create", isStaff, postStaffProfile);
staffRouter.get("/profile", isStaff, showStaffProfile);
staffRouter.get("/profile-edit", isStaff, getStaffProfileEdit);
staffRouter.put("/profile-edit", isStaff, postEditStaffProfile);

// teaching staff = roleId 8
// view Students asigned to the staff
staffRouter.get("/dashboard/students-list", isStaff, getStudentsList);
staffRouter.get(
  "/dashboard/students-list/profile/:student_id",
  isStaff,
  getOneStudentProfile
);
// view classes handled by this staff
staffRouter.get("/dashboard/class-assigned", isStaff, getClassAssigned); // Not working


// staff_role = 9 ADMIN
//create class-medium
staffRouter.get("/dashboard/fee-structure", isStaff, viweFeeStructure);
// staffRouter.post("/dashboard/fee-structure", isStaff, postAddFeeStructure);
// staffRouter.get(
//   "/dashboard/fee-structure/edit/:id",
//   isStaff,
//   getEditFeeStructure
// );
// staffRouter.put(
//   "/dashboard/fee-structure/edit/:id",
//   isStaff,
//   putFeeStructure
// );

// create STAFF Logins 
staffRouter.get("/dashboard/users", isStaff, viewUserAccounts);
staffRouter.post("/dashboard/add-user", isStaff, postAddUser);
// staffRouter.put("/dashboard/user", isStaff, putAddUser);

// STAFF Salary Info
// staffRouter.get("/dashboard/staff-salary-info", isStaff, viewStaffSalInfo);

// Schedule Template Planning
// staffRouter.get("/dashboard/schedule-plan", isStaff, getSchedulePlanForm);
// staffRouter.post("/dashboard/schedule-plan", isStaff, postSchedulePlanForm);

// employee report
// staffRouter.get("/dashboard/emp-report", isStaff, getEmpReport);



// STAFF_ROLE = NON Teaching Faculty 2

// // View other staff profiles
// staffRouter.get('/dashboard/view-staff-profile', isStaff, getStaffProfile);

// // view Student profile
// staffRouter.get('/dashboard/view-student-profile', isStaff, getStaffProfile);

// fee collection & admission 
// staffRouter.get("/dashboard/fee-collection", isStaff, getFeeCollection);
// staffRouter.post("/dashboard/fee-collection", isStaff, postFeeCollection);
// // Due collection
// staffRouter.all("/dashboard/fee-due-collection", isStaff, allDueCollection);


// Make Staff Attendance
// staffRouter.all('/dashboard/staff-attendance', isStaff, getStaffAttendance);

// credit Salary to STAFF
// staffRouter.all('/dashboard/staff-salary-credit', isStaff, allStaffSalCredit);

// Admission REPORT
// staffRouter.get('/dashboard/admission-report', isStaff, getEnrollReport);


//redirect urls
staffRouter.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = staffRouter;
