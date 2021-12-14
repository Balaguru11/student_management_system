const session = require("express-session");
const dbcon = require("../DB/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

// student loggin into his account
exports.postStuLogin = async (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    var studentLoginQuery = `SELECT * FROM school_main_login WHERE role_id_fk='1' AND username='${req.body.username}'`;

    dbcon.query(studentLoginQuery, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length == 1) {
        // password verification
        const passwordEntered = req.body.password;
        const studentPass = result[0].password;
        const verified = bcrypt.compareSync(
          `${passwordEntered}`,
          `${studentPass}`
        );
        if (verified) {
          let session = req.session;
          session.student_id = result[0].id;
          //   session.school_id = result[0].school_id;
          session.roleId = result[0].role_id_fk; //camelcase
          session.username = req.body.username;
          session.email = result[0].email;
          session.studentStatus = result[0].status;
          session.school_id = result[0].school_id;
          session.logged_in = true;
          req.flash(
            "welcome",
            `Hi ${session.username}, It is good to see you again !`
          );
          return res.status(200).redirect("/student/dashboard");
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
    console.log(err);
  }
};

// view Student Dashboard After Login
exports.viewStuDashboard = (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  // welcome message
  let welcome = "";
  welcome = req.flash("welcome");
  res.locals.welcome = welcome;
  try {
    let session = req.session;
    if (session.logged_in && session.roleId == "1") {
      res.locals.student_status = session.studentStatus;
      res.locals.username = session.username;
      return res.render("studentLevel/student-dashboard", {
        title: "Student Dashboard",
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

// Get Create Profile FORM after login
exports.getStuProfileForm = (req, res) => {
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  try {
    let session = req.session;
    if (!session.logged_in) {
      req.flash("err_msg", "Please login to continue.");
      return res.redirect("/student/dashboard");
    } else {
      // checking the student_table - if there, load the profile or show the form to Create a new profile
      var checkStuTable = `SELECT EXISTS(SELECT * FROM school_student WHERE student_id='${session.student_id}') AS count;`;
      dbcon.query(checkStuTable, (err, activeStud) => {
        if (err) throw err;
        else if (activeStud[0].count == 1) {
          return res.redirect("/student/profile");
        } else {
          // show
          res.locals.email = session.email;
          return res.render("studentLevel/create-student-profile", {
            title: "Create Student Profile",
          });
          // var getStudentTabData = `SELECT *, DATE_FORMAT(date_of_birth, '%Y-%c-%d') AS dob FROM school_student_admission WHERE email='${session.email}' AND school_id='${session.school_id}'`;
          // dbcon.query(getStudentTabData, (err, student) => {
          //   if (err) throw err;
          //   else if (student.length != 0) {
          //     res.locals.email = session.email;
          //     res.locals.student_mobile = student[0].mobile_number;
          //     res.locals.dob = student[0].dob;
          //     return res.render("studentLevel/create-student-profile", {
          //       title: "Create Student Profile",
          //     });
          //   } else {
          //     req.flash(
          //       "err_msg",
          //       "Please Pay the tution fee (at least Rs. 100) to proceed further."
          //     );
          //     return res.redirect("/student/dashboard");
          //     // return res.redirect('/student/admission-fee-payment');
          //   }
          // });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Post Create Profile for the first time
exports.postStuProfile = (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  console.log(session);
  try {
    if (!session.logged_in) {
      req.flash("err_msg", "Please login to continue.");
      return res.redirect("/student/dashboard");
    } else {
      var newStudent = `INSERT INTO school_student(school_id, student_id, name, mobile_number, email, father_name, date_of_birth, city, state) VALUES ('${session.school_id}', '${session.student_id}', '${req.body.studentName}', '${req.body.student_mobile}', '${session.email}', '${req.body.father_name}', '${req.body.student_dob}', '${req.body.student_city}', '${req.body.student_state}')`;
      dbcon.query(newStudent, (err, profileSaved) => {
        if (err) throw err;
        req.flash("success", "Your Profile has been created successfully.");
        return res.redirect("/student/profile");
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Show Student Profile When he clicks
exports.showStuProfile = async (req, res) => {
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
    var getStuProfile = `SELECT * FROM school_student WHERE student_id='${session.student_id}'`;
    dbcon.query(getStuProfile, (err, data) => {
      if (err) throw err;
      res.locals.name = data[0].name;
      res.locals.mobile_number = data[0].mobile_number;
      res.locals.email = data[0].email;
      res.locals.father_name = data[0].father_name;
      res.locals.date_of_birth = data[0].date_of_birth;
      res.locals.city = data[0].city;
      res.locals.state = data[0].state;
      return res.render("studentLevel/student-profile-show", {
        title: "View Student Profile",
      });
    });
  } else {
    req.flash("err_msg", "Please login to view your Profile");
    return res.redirect("/");
  }
};

// Get Edit Profile Screen
exports.getStuProfileEdit = (req, res) => {
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
      var fetchStuProfile = `SELECT *, DATE_FORMAT(date_of_birth, '%Y-%c-%d') AS dob FROM school_student WHERE student_id='${session.student_id}' AND email='${session.email}' AND school_id='${session.school_id}'`;
      dbcon.query(fetchStuProfile, (err, data) => {
        if (err) throw err;
        res.locals.name = data[0].name;
        res.locals.mobile_number = data[0].mobile_number;
        res.locals.email = data[0].email;
        res.locals.father_name = data[0].father_name;
        res.locals.date_of_birth = data[0].dob;
        res.locals.city = data[0].city;
        res.locals.state = data[0].state;
        return res.render("studentLevel/student-profile-edit", {
          title: "Edit Student Profile",
        });
      });
    } else {
      req.flash("err_msg", "Please login to view your Profile");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};
// Post Edit Profile Screen
exports.postEditStuProfile = (req, res) => {
  let session = req.session;
  console.log(session);
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    if (session.logged_in && session.studentStatus == "Active") {
      var profileQuery = `UPDATE school_student SET name = '${req.body.studentName}', date_of_birth = '${req.body.student_dob}',  father_name = '${req.body.father_name}', city = '${req.body.student_city}', state = '${req.body.student_state}' WHERE student_id='${session.student_id}'`;

      dbcon.query(profileQuery, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          req.flash("success", "Profile updated successfully");
          return res.redirect("/student/profile");
        }
      });
    } else {
      req.flash("err_msg", "Your account is Inactive.");
      return res.redirect("/student/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getPaymentForm = (req, res) => {
  let session = req.session;
  console.log(session);
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    // create a form using school_student_admission table and make it work.
    // get student info, class and medium, academic year, fee amount, fee already paid, amount paying, payment mode, pay_status, entered by
  } catch (err) {
    console.log(err);
  }
};

exports.postPaymentForm = (req, res) => {
  // student making payment by his own
};
