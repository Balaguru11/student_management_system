const session = require("express-session");
const dbcon = require("../DB/database");

exports.postStaffLogin = async (req, res) => {
  let err_msg = "";
  let success_msg = "";

  try {
    var staffLoginQuery = `SELECT * FROM school_main_login WHERE role_id_fk='${req.body.role}' AND username='${req.body.username}' AND password='${req.body.password}'`;

    dbcon.query(staffLoginQuery, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length == 1) {
        let session = req.session;
        session.username = req.body.username;
        session.logged_in = true;
        res.status(200).redirect("/staff/dashboard");
      } else {
        res.send("No User found");
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

exports.getStaffDashboard = (req, res) => {
  try {
    let session = req.session;

    if (session.logged_in) {
      res.render("staffLevel/staff-dashboard", {
        title: "Staff Dashboard",
      });
    } else {
      err_msg = "You are unauthorized. Please login.";
      return res.status(401).redirect("/staff/login");
    }
  } catch (e) {
    console.log(e);
  }
};
