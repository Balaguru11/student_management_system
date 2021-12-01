const express = require("express");
const apiRouter = express.Router();
const session = require("express-session");
const dbcon = require("../DB/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

apiRouter.post("/get-class-sections", (req, res) => {
  var getclassection = `SELECT * FROM school_classroom WHERE id='${req.body.id}'`;
  dbcon.query(getclassection, (err, sections) => {
    if (err) throw err;
    res.locals.sections = sections;
  });
});

module.exports = apiRouter;
