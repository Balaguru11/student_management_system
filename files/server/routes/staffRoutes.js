const express = require("express");
const staffRouter = express.Router();

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

staffRouter.get("/dashboard", getStaffDashboard);

staffRouter.get("/profile-create", getStaffProfileForm);

staffRouter.post("/profile-create", postStaffProfile);

staffRouter.get("/profile", showStaffProfile);

staffRouter.get("/profile-edit", getStaffProfileEdit);

staffRouter.post("/profile-edit", postEditStaffProfile);

//redirect urls
staffRouter.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = staffRouter;
