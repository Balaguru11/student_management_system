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
  allAdmissionDue, allChangePwd, getMyAttendance, getStaffProfile, askMyStaff, myDoubtsList, addThreadMsg, getExamsAndMarks, viewMarkSheet, pdfMarkSheet, dlMarkSheet
} = require("../controllers/studentController");

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

// student seeing his / her staff profile and asking doubts
studentRouter.get('/dashboard/my-staff', isStudent, getStaffProfile);
studentRouter.post('/dashboard/ask-new-doubt/:staff_id', isStudent, askMyStaff);
studentRouter.get('/dashboard/my-doubts', isStudent, myDoubtsList);
studentRouter.post('/dashboard/add-doubt-thread-message', isStudent, addThreadMsg);

// student making paymnent for his own
studentRouter.all("/admission-fee-payment", isStudent, allAdmissionDue);

// attendance show for student
studentRouter.get('/dashboard/my-attendance', isStudent, getMyAttendance);

// Big Exam Marks
studentRouter.get('/dashboard/exam-marks', isStudent, getExamsAndMarks);

studentRouter.get('/dashboard/marksheet/:student_id/:exam_master_id/:class_sec/view', isStudent, viewMarkSheet);
studentRouter.post('/dashboard/marksheet/:student_id/:exam_master_id/:class_sec/pdf', isStudent, pdfMarkSheet);

studentRouter.post('/dashboard/download-marksheet', isStudent, dlMarkSheet);

module.exports = studentRouter;
