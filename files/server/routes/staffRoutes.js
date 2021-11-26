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
} = require("../controllers/staffController");

staffRouter.post("/login", postStaffLogin);

staffRouter.get("/dashboard", isStaff, getStaffDashboard);

staffRouter.get("/profile-create", isStaff, getStaffProfileForm);

staffRouter.post("/profile-create", isStaff, postStaffProfile);

staffRouter.get("/profile", isStaff, showStaffProfile);

staffRouter.get("/profile-edit", isStaff, getStaffProfileEdit);

staffRouter.put("/profile-edit", isStaff, postEditStaffProfile);

//redirect urls
staffRouter.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = staffRouter;
