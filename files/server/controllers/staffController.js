const session = require("express-session");
const dbcon = require("../DB/database");
// const bcrypt = require("bcrypt");
const flash = require("connect-flash");

exports.postStaffLogin = (req, res) => {
  let err_msg = "";
  let success_msg = "";
  let staff_role = "";

  try {
    var staffLoginQuery = `SELECT * FROM school_main_login WHERE role_id_fk='${req.body.role}' AND username='${req.body.username}' AND password='${req.body.password}'`;

    dbcon.query(staffLoginQuery, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length == 1) {
        let session = req.session;
        session.staff_id = result[0].id;
        session.school_id = result[0].school_id;
        session.roleId = result[0].role_id_fk;
        session.username = req.body.username;
        session.email = result[0].email;
        session.staffStatus = result[0].status;

        staff_role = `${session.roleId}`; //returns 8
        req.flash("staff_role", staff_role);
        session.logged_in = true;
        return res.status(200).redirect("/staff/dashboard");
      } else {
        req.flash("err_msg", "Credentials doesnot match.");
        return res.redirect("/");
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
      staff_role = req.params.staff_role;
      res.render("staffLevel/staff-dashboard", {
        title: "Staff Dashboard",
        staff_role,
      });
    } else {
      req.flash("err_msg", "You are unauthorized. Please login.");
      return res.status(401).redirect("/");
    }
  } catch (e) {
    console.log(e);
  }
};

// displays Staff Profile Form
exports.getStaffProfileForm = (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    let session = req.session;
    if (
      !session.logged_in ||
      (session.logged_in && session.staffStatus == "Inactive")
    ) {
      req.flash(
        "err_msg",
        "You are unauthorized to view this page. You are either NOT LOGGED IN or your account is INACTIVE."
      );
      return res.status(401).redirect("/");
    } else if (session.logged_in && session.staffStatus == "Active") {
      // getting data from session
      const role_id = session.roleId;
      const school_id = session.school_id;
      const staff_email = session.email;

      var checkStaffTable = `SELECT EXISTS (SELECT * FROM school_staff WHERE role_id='${role_id}' AND email='${staff_email}' AND school_id='${school_id}') AS count`;

      dbcon.query(checkStaffTable, (err, staff) => {
        if (err) {
          console.log(err);
        } else if (staff[0].count == 1) {
          // //get all the data here and pass it to the redirect
          let name = staff[0].name;
          console.log(name);
          res.locals.name = name;
          let date_of_birth = staff[0].date_of_birth;
          res.locals.dob = date_of_birth;
          let mobile_number = staff[0].mobile_number;
          res.locals.mobile_number = mobile_number;
          let email = staff[0].email;
          res.locals.email = email;
          // let qualification = staff[0].qualification;
          // res.lcoals.qualification = qualification;
          let city = staff[0].city;
          res.locals.city = city;
          let state = staff[0].state;
          res.locals.state = state;
          return res.redirect("/staff/profile");
        } else {
          res.locals.staff_email = staff_email;
          // req.flash("err_msg", "Please create your Profile first.");
          return res.render("staffLevel/staff-profile", {
            title: "Create Profile",
          });
        }
      });
    } else {
      req.flash("err_msg", "You are not allowed to view this Page.");
      return res.redirect("/");
    }
  } catch (e) {
    console.log(e);
  }
};

// Staff fills their Profile n sent to DB
exports.postStaffProfile = async (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let staff_email = "";
  try {
    let session = req.session;
    const username = session.username;

    if (session.logged_in) {
      var checkStatus = `SELECT * FROM school_main_login WHERE username='${username}'`;
      dbcon.query(checkStatus, (err, result) => {
        if (err) {
          req.flash(
            "err_msg",
            "There is a Problem in updating your Profile Page. Please try again later."
          );
          return res.status(500).redirect("/staff/dashboard");
        } else if (result) {
          const role_id = result[0].role_id_fk;
          const staff_id = result[0].id;
          const school_id = result[0].school_id;
          staff_email = result[0].email;
          // const password = result[0].password;

          var profileQuery = `INSERT INTO school_staff(role_id, staff_id, school_id, name, date_of_birth, mobile_number, email, qualification, city, state) VALUES ('${role_id}', '${staff_id}','${school_id}', '${req.body.staffName}', '${req.body.staff_dob}', '${req.body.staff_mobile}', '${staff_email}', '${req.body.staff_qualification}', '${req.body.staff_city}', '${req.body.staff_state}' ) `;

          dbcon.query(profileQuery, function (err) {
            if (err) {
              console.log(err);
            } else {
              req.flash("success", "Profile saved successfully");
              return res.redirect("/staff/profile");
            }
          });
        } else {
          req.flash("err_msg", "No Account found.");
          return res.redirect("/");
        }
      });
    } else {
      req.flash("err_msg", "Please Login to continue.");
      return res.redirect("/");
    }
  } catch (e) {
    console.log(e);
  }
};

// show profile after creating it.
exports.showStaffProfile = async (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  if (session.logged_in) {
    // include all the profile data here
    var getStaffProfile = `SELECT * FROM school_staff WHERE staff_id='${session.staff_id}' AND email='${session.email}' AND school_id='${session.school_id}'`;
    dbcon.query(getStaffProfile, (err, data) => {
      if (err) throw err;
      res.locals.name = data[0].name;
      res.locals.date_of_birth = data[0].date_of_birth;
      res.locals.mobile_number = data[0].mobile_number;
      res.locals.email = data[0].email;
      res.locals.qualification = data[0].qualification;
      res.locals.city = data[0].city;
      res.locals.state = data[0].state;
      return res.render("staffLevel/staff-profile-show", {
        title: "View Profile",
      });
    });
  } else {
    req.flash("err_msg", "Please login to view your Profile");
    return res.redirect("/");
  }
};

exports.getStaffProfileEdit = (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (session.logged_in) {
      var fetchStaffProfile = `SELECT * FROM school_staff WHERE staff_id='${session.staff_id}' AND email='${session.email}' AND school_id='${session.school_id}'`;
      dbcon.query(fetchStaffProfile, (err, data) => {
        if (err) throw err;
        res.locals.name = data[0].name;
        res.locals.date_of_birth = data[0].date_of_birth;
        res.locals.mobile_number = data[0].mobile_number;
        res.locals.email = data[0].email;
        res.locals.qualification = data[0].qualification;
        res.locals.city = data[0].city;
        res.locals.state = data[0].state;
        return res.render("staffLevel/staff-profile-edit", {
          title: "Edit profile",
        });
      });
    } else {
      req.flash("err_msg", "Please login to view your Profile");
      return res.redirect("/");
    }
  } catch (e) {
    console.log(e);
  }
};

// Staff edits profile and updates - need to update this.
exports.postEditStaffProfile = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let staff_email = "";
  try {
    let session = req.session;
    const email = session.username;

    if (session.logged_in) {
      var checkStatus = `SELECT EXISTS (SELECT * FROM school_staff WHERE username='${username}' AND status='Active') AS count`;

      dbcon.query(checkStatus, (err, result) => {
        if (err) {
          req.flash(
            "err_msg",
            "There is a Problem in updating your Profile Page. Please try again later. "
          );
          return res.status(500).redirect("/staff/dashboard");
        } else if (result[0].count == 1) {
          const role_id = result[0].role_id_fk;
          const staff_id = result[0].id;
          const school_id = result[0].school_id;
          staff_email = result[0].email;
          // const password = result[0].password;

          var profileQuery = `INSERT INTO school_staff(role_id, staff_id, school_id, name, date_of_birth, mobile_number, email, qualification, city, state) VALUES ('${role_id}', '${staff_id}','${school_id}', '${req.body.staffName}', '${req.body.staff_dob}', '${req.body.staff_mobile}', '${staff_email}', '${req.body.staff_qualification}', '${req.body.staff_city}', '${req.body.staff_state}' ) `;

          dbcon.query(profileQuery, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              req.flash("success", "Profile saves successfully");
              return res.redirect("/staff/profile");
            }
          });
        } else {
          console.log(result);
        }
      });
    } else {
      console.log("Testing");
    }
  } catch (e) {
    console.log(e);
  }
};
