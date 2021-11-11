const express = require("express");
const staffRouter = express.Router();

//importing staffControllers Here
const {
  postStaffLogin,
  getStaffDashboard,
} = require("../controllers/staffController");

staffRouter.post("/login", postStaffLogin);

staffRouter.get("/dashboard", getStaffDashboard);

//redirect urls
staffRouter.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = staffRouter;
