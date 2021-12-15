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
  getClassAssigned, allChangePwd
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
staffRouter.get("/dashboard/class-assigned", isStaff, getClassAssigned);

//redirect urls
staffRouter.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = staffRouter;
