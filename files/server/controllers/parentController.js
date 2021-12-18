const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const sendMail = require("../config/email.config");

// All Parent Login
exports.allParentLogin = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;

  if (req.method == "GET") {
    return res.redirect("/");
  } else {
    try {
      var parentLogin = `SELECT * FROM school_main_login WHERE role_id_fk='5', username='${req.body.username}'`;
      dbcon.query(parentLogin, (err, parent) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        else if (parent.length == 1) {
          const passTyped = req.body.password;
          const parent_password = parent[0].password;
          const verified = bcrypt.compareSync(
            `${passTyped}`,
            `${parent_password}`
          );
          if (verified) {
            let session = req.session;

            session.parent_id = parent[0].id;
            session.roleId = parent[0].role_id_fk;
            session.username = req.body.username;
            session.email = parent[0].email;
            session.parentStatus = parent[0].status;
            session.school_id = parent[0].school_id;
            session.parentPwd = parent[0].password;
            session.logged_in = true;
            req.flash(
              "welcome",
              `Welcome Mr/Mrs. ${session.username}, How do you do?`
            );
            return res.redirect("/parent/dashboard");
          } else {
            req.flash("err_msg", "Credentials doesnot match.");
            return res.redirect("/");
          }
        } else {
          req.flash("err_msg", "No User found.");
          return res.redirect("/");
        }
      });
    } catch (err) {
      return res.render("server-error", { title: "SERVER Error" });
    }
  }
};

// parent dashboard
exports.getParentDashboard = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  try {
    let session = req.session;
    if (session.logged_in && session.roleId == "5") {
      res.locals.parent_status = session.parentStatus;
      res.locals.username = session.username;
      return res.render("parentLevel/parent-dashboard", {
        title: "Parent Dashboard",
      });
    } else {
      req.flash(
        "err_msg",
        "You are unauthorized. You are either not logged in or your account is Inactive."
      );
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};
