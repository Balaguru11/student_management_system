const express = require("express");
const schoolActivate = express.Router();
const dbcon = require("../DB/database");
const session = require("express-session");

schoolActivate.post("/", async (req, res) => {
  let active_msg = "";
  let inactive_msg = "";
  try {
    let session = req.session;
    if (session.logged_in && session.schoolStatus == "Inactive") {
      const schoolId = session.schoolId;
      const code = req.body.activation;

      var checkActive = `SELECT activate_match_g FROM school_activate WHERE school_id='${schoolId}'`;

      dbcon.query(checkActive, function (err, data) {
        if (err) {
          console.log(err);
        } else if (data[0].activate_match_g === code) {
          var changeStatus = `UPDATE school_add_school SET status='Active' WHERE id='${schoolId}'`;
          dbcon.query(changeStatus, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              inactive_msg = "";
              return res.status(200).render("schoolLevel/school-dashboard", {
                title: "School Master Dashboard",
                inactive_msg: inactive_msg,
              });
            }
          });
        } else {
          inactive_msg = "Product Activation failed.";
          return res.status(500).render("schoolLevel/school-dashboard", {
            title: "School Master Dashboard",
            inactive_msg: inactive_msg,
          });
        }
      });
    } else {
      return res.send("The school is already activated");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = schoolActivate;
