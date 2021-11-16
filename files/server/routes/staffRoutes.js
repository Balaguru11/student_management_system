const express = require("express");
const staffRouter = express.Router();

//importing staffControllers Here
const {
  postStaffLogin,
  getStaffDashboard,
  getStaffProfileForm,
  postStaffProfile,
} = require("../controllers/staffController");

staffRouter.post("/login", postStaffLogin);

staffRouter.get("/dashboard", getStaffDashboard);

staffRouter.get("/profile", getStaffProfileForm);

staffRouter.post("/profile", postStaffProfile);

//redirect urls
staffRouter.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = staffRouter;
