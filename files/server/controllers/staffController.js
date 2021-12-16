const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

exports.postStaffLogin = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    var staffLoginQuery = `SELECT * FROM school_main_login WHERE role_id_fk='${req.body.role}' AND username='${req.body.username}'`;

    dbcon.query(staffLoginQuery, function (err, result) {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else if (result.length == 1) {
        // password verification
        const passwordEntered = req.body.password;
        const staffPass = result[0].password;
        const verified = bcrypt.compareSync(
          `${passwordEntered}`,
          `${staffPass}`
        );
        if (verified) {
          let session = req.session;
          session.staff_id = result[0].id;
          session.school_id = result[0].school_id;
          session.roleId = result[0].role_id_fk;
          session.username = req.body.username;
          session.email = result[0].email;
          session.staffStatus = result[0].status;
          session.staffPwd = result[0].password;
          session.logged_in = true;
          return res.status(200).redirect("/staff/dashboard");
        } else {
          req.flash("err_msg", "Credentials doesnot match.");
          return res.redirect("/");
        }
      } else {
        req.flash("err_msg", "Credentials doesnot match.");
        return res.redirect("/");
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

exports.getStaffDashboard = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    let session = req.session;
    if (session.logged_in) {
      staff_role = session.roleId;
      res.locals.staff_status = session.staffStatus;
      res.locals.username = session.username;
      switch (staff_role) {
        case 2:
          res.render("staffLevel/emp-dashboard", {
            title: "Employee Dashboard",
          });
          break;
        case 4:
          res.render("staffLevel/hm-dashboard", {
            title: "HeadMaster Dashboard",
          });
          break;
        case 8:
          res.render("staffLevel/staff-dashboard", {
            title: "Staff Dashboard",
          });
          break;
        case 9:
          res.render("staffLevel/admin-dashboard", {
            title: "HeadMaster Dashboard",
          });
          break;
        default:
          req.flash("err_msg", "No role assigned to this account.");
          res.redirect("/");
      }
    } else {
      req.flash(
        "err_msg",
        "You are unauthorized. You are either not logged in or your account is Inactive."
      );
      return res.status(401).redirect("/");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// displays Staff Profile Form
exports.getStaffProfileForm = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
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

      var checkStaffTable = `SELECT EXISTS (SELECT * FROM school_staff WHERE role_id='${session.roleId}' AND email='${session.email}' AND school_id='${session.school_id}') AS count`;

      dbcon.query(checkStaffTable, (err, staff) => {
        if (err) {
          return res.render("server-error", { title: "Server Error" });
        } else if (staff[0].count == 1) {
          // //get all the data here and pass it to the redirect
          let name = staff[0].name;
          res.locals.name = name;
          let date_of_birth = staff[0].date_of_birth;
          res.locals.dob = date_of_birth;
          let mobile_number = staff[0].mobile_number;
          res.locals.mobile_number = mobile_number;
          let email = staff[0].email;
          res.locals.email = email;
          let city = staff[0].city;
          res.locals.city = city;
          let state = staff[0].state;
          res.locals.state = state;
          return res.redirect("/staff/profile");
        } else {
          res.locals.staff_email = staff_email;
          return res.render("staffLevel/staff-profile", {
            title: "Create Profile",
          });
        }
      });
    } else {
      req.flash("err_msg", "You are not allowed to view this Page.");
      return res.redirect("/");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Staff fills their Profile n sent to DB
exports.postStaffProfile = async (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;

  try {
    let session = req.session;

    if (session.logged_in) {
      var checkStatus = `SELECT * FROM school_main_login WHERE username='${session.username}'`;
      dbcon.query(checkStatus, (err, result) => {
        if (err) {
          req.flash(
            "err_msg",
            "There is a Problem in creating your Profile Page. Please try again later."
          );
          return res.status(500).redirect("/staff/dashboard");
        } else if (result) {
          const role_id = result[0].role_id_fk;
          const staff_id = result[0].id;
          const school_id = result[0].school_id;
          const staff_email = result[0].email;

          var profileQuery = `INSERT INTO school_staff(role_id, staff_id, school_id, name, date_of_birth, mobile_number, email, qualification, city, state) VALUES ('${role_id}', '${staff_id}','${school_id}', '${req.body.staffName}', '${req.body.staff_dob}', '${req.body.staff_mobile}', '${staff_email}', '${req.body.staff_qualification}', '${req.body.staff_city}', '${req.body.staff_state}' ) `;

          dbcon.query(profileQuery, function (err) {
            if (err) {
              return res.render("server-error", { title: "Server Error" });
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
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// show profile after creating it.
exports.showStaffProfile = async (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  if (session.logged_in) {
    // include all the profile data here
    var getStaffProfile = `SELECT * FROM school_staff WHERE staff_id='${session.staff_id}' AND email='${session.email}' AND school_id='${session.school_id}'`;
    dbcon.query(getStaffProfile, (err, data) => {
      if (err) return res.render("server-error", { title: "Server Error" });
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
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (session.logged_in) {
      var fetchStaffProfile = `SELECT *, DATE_FORMAT(date_of_birth, '%Y-%c-%d') AS dob FROM school_staff WHERE staff_id='${session.staff_id}' AND email='${session.email}' AND school_id='${session.school_id}'`;
      dbcon.query(fetchStaffProfile, (err, data) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.name = data[0].name;
        res.locals.date_of_birth = data[0].dob;
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
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
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

  try {
    if (session.logged_in && session.staffStatus == "Active") {
      var profileQuery = `UPDATE school_staff SET name = '${req.body.staffName}', date_of_birth = '${req.body.staff_dob}', mobile_number = '${req.body.staff_mobile}', qualification = '${req.body.staff_qualification}', city = '${req.body.staff_city}', state = '${req.body.staff_state}' WHERE role_id='${session.roleId}' AND staff_id='${session.staff_id}' AND  school_id='${session.school_id}' AND email='${session.email}'`;

      dbcon.query(profileQuery, function (err, result) {
        if (err) {
          return res.render("server-error", { title: "Server Error" });
        } else {
          req.flash("success", "Profile saves successfully");
          return res.redirect("/staff/profile");
        }
      });
    } else {
      req.flash("err_msg", "Your account is Inactive.");
      return res.redirect("/staff/dashboard");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view students assigned to the staff
//there is an issue with this controller. Want to display only the students assigned to this staff but getting all.
exports.getStudentsList = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    if (session.roleId == "8") {
      var studentList = `SELECT DISTINCT adm.student_id, adm.mobile_number, adm.email, clr.class_id, clr.class_section, sml.username, sfs.class_std, sfs.medium FROM school_student_admission AS adm 
      INNER JOIN school_class_subjects AS scs ON scs.classroom_id=adm.class_section AND scs.staff_id_assigned = '${session.staff_id}'
      INNER JOIN school_feestructure AS sfs ON sfs.id = adm.class_medium
      INNER JOIN school_classroom AS clr ON clr.id=adm.class_section
      INNER JOIN school_main_login AS sml ON sml.id=adm.student_id WHERE scs.staff_id_assigned = '${session.staff_id}'`;
      dbcon.query(studentList, (err, list) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.list = list;
        return res.render("staffLevel/view-students-list", {
          title: "Students List",
        });
      });
    } else {
      req.flash("err_msg", "You are not authorized.");
      return res.redirect("/staff/dashboard");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// get One Student profile from the Student list
exports.getOneStudentProfile = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    // See Profile of a student
    var student_id = req.params.student_id;
    var stuProfile = `SELECT * FROM school_student WHERE student_id='${student_id}'`;
    dbcon.query(stuProfile, (err, stuProfile) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      res.locals.stuProfile = stuProfile;
      return res.redirect("/dashboard/students-list");
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view the list of classes assigned to the teaching staff
exports.getClassAssigned = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    if (session.roleId == "8") {
      var classAssigned = `SELECT DISTINCT scs.subject_id, scs.classroom_id, clr.class_id, clr.class_section, clr.students_filled, sfs.class_std, sfs.medium, sub.subject_name FROM school_class_subjects AS scs
      INNER JOIN school_classroom AS clr ON scs.classroom_id = clr.id
      INNER JOIN school_feestructure AS sfs ON clr.class_id = sfs.id
      INNER JOIN school_subjects AS sub ON scs.subject_id=sub.id
      WHERE scs.school_id='${session.school_id}'`;
      dbcon.query(classAssigned, (err, assignedClasses) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.assignedClasses = assignedClasses;
        return res.render("staffLevel/view-classes-assigned", {
          title: "Classes Assigned",
        });
      });
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// change passsword
exports.allChangePwd = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    if (req.method == "GET") {
      return res.render("changepassword", {
        title: "Change Password",
        layout: "./layouts/home_layout",
      });
    } else {
      const currentPwd = req.body.schoolCurPassword;
      const saved_pass = session.staffPwd;
      const verified = bcrypt.compareSync(`${currentPwd}`, `${saved_pass}`);

      if (
        verified &&
        req.body.schoolNewPassword === req.body.schoolRetypePassword
      ) {
        const newHash = bcrypt.hashSync(`${req.body.schoolNewPassword}`, 10);
        var newPass = `UPDATE school_main_login SET password = '${newHash}' WHERE id='${session.staff_id}'`;
        dbcon.query(newPass, (err, response) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          // req.session.destroy();
          req.flash("success", "Your Password has been changed.");
          return res.redirect("/");
        });
      } else {
        req.flash(
          "err_msg",
          "Please make sure to enter the correct passsword."
        );
        return res.redirect("/staff/dashboard/change-password");
      }
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};
