const express = require("express");
const schoolActivate = express.Router();
const dbcon = require("../DB/database");
const session = require("express-session");

schoolActivate.post("/school", async (req, res) => {
  // let active_msg = "";
  // let inactive_msg = "";
  try {
    let session = req.session;
    const schoolId = session.schoolId;
    const code = req.body.activation;

    if (session.schoolStatus == "Inactive") {
      var checkActive = `SELECT activate_match_g FROM school_activate WHERE school_id='${schoolId}'`;

      dbcon.query(checkActive, function (err, data) {
        if (err) {
          console.log(err);
        } else if (code == "") {
          req.flash("err_msg", "Please enter the Correct Activation Code.");
          return res.status(200).redirect("/school/dashboard");
        } else if (data[0].activate_match_g === code) {
          var changeStatus = `UPDATE school_add_school SET status='Active' WHERE id='${schoolId}'`;
          dbcon.query(changeStatus, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              // inactive_msg = 0;

              req.flash("success", "Activation Success. Please Login again.");
              return res.status(200).redirect("/school/login");
            }
          });
        } else {
          // inactive_msg = 1;
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
