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
      var parentLogin = `SELECT * FROM school_main_login WHERE role_id_fk='5' AND username='${req.body.username}'`;
      dbcon.query(parentLogin, (err, parent) => {
        if (err) console.log(err);
        // return res.render("server-error", { title: "Server Error" });
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
      // return res.render("server-error", { title: "SERVER Error" });
      console.log(err);
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
      // Student name, Class & Section, School Name, Button
      var studentCard = `SELECT spam.ml_student_id, stu.name, spam.stu_school_id, sfs.class_std, sfs.medium, clr.class_section, sas.school_name FROM school_parent_student_map AS spam INNER JOIN school_student AS stu ON stu.student_id = spam.ml_student_id INNER JOIN school_student_admission AS stad ON stad.student_id = spam.ml_student_id INNER JOIN school_classroom AS clr ON clr.id = stad.class_section INNER JOIN school_feestructure AS sfs ON sfs.id = stad.class_medium INNER JOIN school_add_school AS sas ON sas.id = spam.stu_school_id WHERE spam.parent_id = '${session.parent_id}' ORDER BY ABS(sfs.class_std) DESC`;
      dbcon.query(studentCard, (err, mappedStudents) => {
        if(err) throw err;
        console.log(mappedStudents);
        res.locals.mappedStudents = mappedStudents;
        res.locals.parent_status = session.parentStatus;
        res.locals.parentUsername = session.username;
        return res.render("parentLevel/parent-dashboard", {
          title: "Parent Dashboard",
        });
      })
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


// track a student
exports.trackAStudent = (req, res) => {
  let session = req.session;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let student_id = req.params.student_id;
  let stu_school_id = req.params.stu_school_id;
  try {
  // get student name, class
  var studentData = `SELECT stu.name, sfs.class_std, sfs.medium, clr.class_section, ssa.academic_year, ssa.actual_fee, ssa.paying_amount AS paid_amt, sas.school_name, sas.city, sas.email AS school_email, ssa.payment_status FROM school_student AS stu INNER JOIN school_student_admission AS ssa ON ssa.student_id = stu.student_id INNER JOIN school_classroom AS clr ON clr.id = ssa.class_section INNER JOIN school_feestructure AS sfs ON sfs.id = ssa.class_medium INNER JOIN school_add_school AS sas ON sas.id = ssa.school_id WHERE ssa.student_id = '${student_id}' AND ssa.school_id = '${stu_school_id}'`;
  dbcon.query(studentData, (err, studentInfo) => {
    if(err) throw err;
    console.log(studentInfo);
    res.locals.studentInfo = studentInfo;
    return res.render('parentLevel/student-glance', {title: `Viewing ${studentInfo[0].name}'s Account`});
  })
  } catch (err) {
    console.log(err);
  }
}

// parent Pay fee due for children
exports.parentPayFeeDue = (req, res) => {
  let session = req.session;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let student_id = req.params.student_id;
  let stu_school_id = req.params.stu_school_id;
  try {
    
  } catch (err) {
    console.log(err);
  }
}