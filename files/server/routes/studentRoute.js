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
  getPaymentForm,
  postPaymentForm, allChangePwd
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
studentRouter.all('/dashboatrd/change-passsword', isStudent, allChangePwd);

// student making paymnent for his own
studentRouter.get("/admission-fee-payment", isStudent, getPaymentForm);
studentRouter.post("/admission-fee-payment", isStudent, postPaymentForm);

module.exports = studentRouter;
