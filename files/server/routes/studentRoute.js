const express = require("express");
const studentRouter = express.Router();

const { isStudent } = require("../middlewares/auth");

// importing schoolController here
const {
  postStuLogin,
  viewStuDashboard,
  getStuProfileForm,
  postStuProfile,
  showStuProfile,
  getStuProfileEdit,
  postEditStuProfile,
  allAdmissionDue,
  allChangePwd, getMyAttendance, getStaffProfile, askMyStaff
} = require("../controllers/studentController");

//middlewares - isStudent

// Student Loging in - POST
studentRouter.post("/login", postStuLogin);

// Student Profile Crud
studentRouter.get("/profile-create", isStudent, getStuProfileForm);
studentRouter.post("/profile-create", isStudent, postStuProfile);
studentRouter.get("/profile", isStudent, showStuProfile);
studentRouter.get("/profile-edit", isStudent, getStuProfileEdit);
studentRouter.put("/profile-edit", isStudent, postEditStuProfile);

// Viewing Student Dasboard after Login
studentRouter.get("/dashboard", isStudent, viewStuDashboard);
studentRouter.all("/dashboard/change-passsword", isStudent, allChangePwd);

// student seeing his / her staff profile
studentRouter.get('/dashboard/my-staff', isStudent, getStaffProfile);
studentRouter.post('/dashboard/ask-my-staff/new-doubt/:staff_id', isStudent, askMyStaff);

// student making paymnent for his own
studentRouter.all("/admission-fee-payment", isStudent, allAdmissionDue);

// attendance show for student
studentRouter.get('/dashboard/my-attendance', isStudent, getMyAttendance);

module.exports = studentRouter;
