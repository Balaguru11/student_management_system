const express = require("express");
const staffRouter = express.Router();

const {
  isStaff,
  isHM,
  isAdmin,
  isTeacher,
  isNTF,
} = require("../middlewares/auth");

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
  getClassAssigned, getMyScheduleStaff, 
  getStuAttendance,
  postStuAttendance,
  allChangePwd,
  viweFeeStructure,
  viewUserAccounts,
  postAddUser,
  postAddFeeStructure,
  getSchedulePlanForm,
  postSchedulePlanForm,
  viewSubjects,
  postAddSubject,
  getMapSubStaff,
  postMapSubStaff,
  viewClassSections,
  postAddClassroom,
  getAllStaffList,
  putFeeStructure,
  deleteFeeStructure,
  putUserAccount,
  getFeeCollection,
  postFeeCollection,
  allDueCollection,
} = require("../controllers/staffController");

staffRouter.post("/login", postStaffLogin);

staffRouter.get("/dashboard", isStaff, getStaffDashboard);
staffRouter.all("/dashboard/change-password", isStaff, allChangePwd);

// staff Profile CRUD Operations.
staffRouter.get("/profile-create", isStaff, getStaffProfileForm);
staffRouter.post("/profile-create", isStaff, postStaffProfile);
staffRouter.get("/profile", isStaff, showStaffProfile);
staffRouter.get("/profile-edit", isStaff, getStaffProfileEdit);
staffRouter.put("/profile-edit", isStaff, postEditStaffProfile);

// START ******** Staff_role == 8 teaching staff ***********
// view Students asigned to the staff
staffRouter.get(
  "/dashboard/students-list",
  isStaff,
  isTeacher,
  getStudentsList
);

// view classes handled by this staff
staffRouter.get("/dashboard/class-assigned", isStaff, getClassAssigned); // Not working

//view my schedule for teacbhing staff
staffRouter.get('/dashboard/my-schedule', isStaff, isTeacher, getMyScheduleStaff);

// Students Attendance by Teaching Staff
staffRouter.get(
  "/dashboard/student-attendance/add/:class_sec_id/:staff_id",
  isStaff,
  isTeacher,
  getStuAttendance
);

staffRouter.post(
  "/dashboard/student-attendance",
  isStaff,
  isTeacher,
  postStuAttendance
);

// exams conducted for Students by Teaching Staffs
// staffRouter.get('/dashboard/exams', isStaff, getExams);
// staffRouter.get('/dashboard/student-marks', isStaff, getStuExamMarks);
// staffRouter.get('/dashboard/student-performance', isStaff, getStuPerformReport);

//Teaching Staff sending message to Students (Also HM)
// staffRouter.get('/dashboard/message-students', isStaff, getStuMsgForm);

// START ******** Staff_role == 8 teaching staff ***********

// START ******** Staff_role == 9 ADMIN ***********
//create class-medium
staffRouter.get("/dashboard/fee-structure", isStaff, isAdmin, viweFeeStructure);
staffRouter.post(
  "/dashboard/fee-structure",
  isStaff,
  isAdmin,
  postAddFeeStructure
);
// showing edit and showing delete fee structure in ajax call.
//edit Fee Struture POST
staffRouter.put(
  "/dashboard/fee-structure/edit/:id",
  isStaff,
  isAdmin,
  putFeeStructure
);
// delete fee structure
staffRouter.get(
  "/dashboard/fee-structure/delete/:id",
  isStaff,
  isAdmin,
  deleteFeeStructure
);

// create STAFF Logins
staffRouter.get("/dashboard/users", isStaff, isAdmin, viewUserAccounts);
staffRouter.post("/dashboard/add-user", isStaff, isAdmin, postAddUser);
staffRouter.put("/dashboard/users/edit/:id", isStaff, isAdmin, putUserAccount);

// STAFF Salary Info
// staffRouter.get("/dashboard/staff-salary-info", isStaff, viewStaffSalInfo);

// Schedule Template Planning
staffRouter.get(
  "/dashboard/schedule-plan",
  isStaff,
  isAdmin,
  getSchedulePlanForm
);
staffRouter.post("/dashboard/schedule-plan", isStaff, postSchedulePlanForm);

// employee report
// staffRouter.get("/dashboard/emp-report", isStaff, getEmpReport);

// START ******** Staff_role == 9 ADMIN ***********

// START ******** Staff_role == 2 NON Teaching Faculty ***********

// // View other staff profiles
staffRouter.get(
  "/dashboard/view-staff-profile",
  isStaff,
  isNTF,
  getAllStaffList
);

// // view Student profile
staffRouter.get(
  "/dashboard/view-student-profile",
  isStaff,
  isNTF,
  getStudentsList
);

// fee collection & admission
staffRouter.get("/dashboard/fee-collection", isStaff, isNTF, getFeeCollection);
staffRouter.post(
  "/dashboard/fee-collection",
  isStaff,
  isNTF,
  postFeeCollection
);
// Due collection
staffRouter.all(
  "/dashboard/fee-due-collection",
  isStaff,
  isNTF,
  allDueCollection
);

// Make Staff Attendance
// staffRouter.all('/dashboard/staff-attendance', isStaff, getStaffAttendance);

// credit Salary to STAFF
// staffRouter.all('/dashboard/staff-salary-credit', isStaff, allStaffSalCredit);

// Admission REPORT
// staffRouter.get('/dashboard/admission-report', isStaff, getEnrollReport);

// START ******** Staff_role == 2 NON Teaching Faculty ***********

// START ******** Staff_role == 4 Head Master ***********

// view All Student Profile + used in NTF route
staffRouter.get(
  "/dashboard/see-student-profile",
  isStaff,
  isHM,
  getStudentsList
);
staffRouter.get("/dashboard/see-staff-profile", isStaff, isHM, getAllStaffList);

//  creating subjects HM
staffRouter.get("/dashboard/subjects", isStaff, isHM, viewSubjects);
staffRouter.post("/dashboard/add-subject", isStaff, isHM, postAddSubject);

// subject - staff - section mapping by HM
staffRouter.get(
  "/dashboard/section-subject-staff",
  isStaff,
  isHM,
  getMapSubStaff
);
staffRouter.post(
  "/dashboard/section-subject-staff",
  isStaff,
  isHM,
  postMapSubStaff
);

// Class Section CRUD by HM
staffRouter.get("/dashboard/sections", isStaff, isHM, viewClassSections);
staffRouter.post("/dashboard/sections", isStaff, isHM, postAddClassroom);

// message to staff by HM
// staffRouter.get('/dashboard/message-staff', isStaff, getStaffMsgForm);

// get Performance report by HM
// staffRouter.get("/dashboard/student-performance", isStaff, getAllStuPerform);
// staffRouter.post("/dashboard/staff-performance", isStaff, getAllStaffPerform);

//redirect urls
staffRouter.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = staffRouter;
