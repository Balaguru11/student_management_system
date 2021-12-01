const express = require("express");
const schoolActivate = express.Router();
const dbcon = require("../DB/database");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const { isSchool } = require("../middlewares/auth");

schoolActivate.post("/school", (req, res) => {
  // let active_msg = "";
  // let inactive_msg = "";
  try {
    let session = req.session;
    console.log(session);
    const code = req.body.activation;

    if (session.schoolStatus == "Inactive") {
      var checkActive = `SELECT * FROM school_activate WHERE school_id='${session.schoolId}'`;

      dbcon.query(checkActive, (err, data) => {
        if (err) {
          throw err;
        } else if (code == "") {
          req.flash("err_msg", "Please enter the Correct Activation Code.");
          return res.status(200).redirect("/school/dashboard");
        } else if (data[0].activate_match_g === code) {
          var changeStatus = `UPDATE school_add_school SET status='Active' WHERE id='${schoolId}'`;
          dbcon.query(changeStatus, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              req.flash("success", "Activation Success. Please Login again.");
              return res.status(200).redirect("/school/login");
            }
          });
        } else {
          req.flash("err_msg", "Activation failed.");
          return res.status(500).redirect("/school/dashboard");
        }
      });
    } else {
      req.flash(
        "welcome",
        `Hi ${session.schoolUserName}, How are you doing today?`
      );
      return res.status(200).redirect("/school/dashboard");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = schoolActivate;
