const express = require("express");
const parentRouter = express.Router();

const { isParent } = require("../middlewares/auth");

const {
  allParentLogin,
  getParentDashboard,
} = require("../controllers/parentController");

// parent Login
parentRouter.all("/login", isParent, allParentLogin);
parentRouter.get("/dashboard", isParent, getParentDashboard);

module.exports = parentRouter;
