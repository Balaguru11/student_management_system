const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const sendMail = require("../config/email.config");
const fs = require('fs');
const pdf = require('html-pdf');
const options = { format: 'A4' };
const ejs = require('ejs');

// student loggin into his account
exports.postStuLogin = async (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    var studentLoginQuery = `SELECT * FROM school_main_login WHERE role_id_fk='1' AND username='${req.body.username}'`;

    dbcon.query(studentLoginQuery, function (err, result) {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
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
          session.roleId = result[0].role_id_fk;
          session.username = req.body.username;
          session.email = result[0].email;
          session.studentStatus = result[0].status;
          session.school_id = result[0].school_id;
          session.stuPass = result[0].password;
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
    return res.render("server-error", { title: "Server Error" });
  }
};

// view Student Dashboard After Login
exports.viewStuDashboard = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  // welcome message
  let welcome = "";
  welcome = req.flash("welcome");
  res.locals.welcome = welcome;
  try {
    let session = req.session;
    if (session.logged_in && session.roleId == "1") {
      var getAttendance = `SELECT attend_status, COUNT(*) AS total FROM school_student_attendance WHERE student_affected = '${session.student_id}' GROUP BY attend_status`;
      dbcon.query(getAttendance, (err, attRec) => {
        if(err) throw err;
        res.locals.attRec = attRec;
        res.locals.student_status = session.studentStatus;
        res.locals.username = session.username;
        return res.render("studentLevel/student-dashboard", {
          title: "Student Dashboard",
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
    return res.render("server-error", { title: "Server Error" });
  }
};

// Get Create Profile FORM after login
exports.getStuProfileForm = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
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
        if (err) return res.render("server-error", { title: "Server Error" });
        else if (activeStud[0].count == 1) {
          return res.redirect("/student/profile"); // display
        } else {
          // create profile
          res.locals.email = session.email;
          return res.render("studentLevel/create-student-profile", {
            title: "Create Student Profile",
          });
        }
      });
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Post Create Profile for the first time
exports.postStuProfile = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (!session.logged_in) {
      req.flash("err_msg", "Please login to continue.");
      return res.redirect("/student/dashboard");
    } else {
      // inserting student Profile
      var newStudent = `INSERT INTO school_student(school_id, student_id, name, mobile_number, email, father_name, parent_email, parent_mobile, date_of_birth, city, state) VALUES ('${session.school_id}', '${session.student_id}', '${req.body.studentName}', '${req.body.student_mobile}', '${session.email}', '${req.body.parent_name}', '${req.body.parent_email}', '${req.body.parent_mobile}', '${req.body.student_dob}', '${req.body.student_city}', '${req.body.student_state}')`;

      dbcon.query(newStudent, (err, profileSaved) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        // if parent already having account
        const parent_email = req.body.parent_email;
        const parent_user = `${req.body.parent_name}`.toString();
        const parent_username = parent_user.replaceAll(" ", "");
        var checkParent = `SELECT * FROM school_main_login WHERE role_id_fk = '5' AND email='${parent_email}'`;
        dbcon.query(checkParent, (err, ifParentAcc) => {
          if (err) throw err;
          else if (ifParentAcc.length == 1) {
            // mapping student with parent here
            var stuParMap = `INSERT INTO school_parent_student_map(stu_school_id, parent_id, ml_student_id) VALUES ('${session.school_id}', '${ifParentAcc[0].id}', '${session.student_id}')`;
            dbcon.query(stuParMap, (err, map) => {
              if (err)
                return res.render("server-error", { title: "Server Error" });
              // sending emails - parent email - parent student linked.
              const parent = sendMail({
                from: process.env.MAIL_USERNAME,
                to: ifParentAcc[0].email,
                subject: "New Child added to your account.",
                html: `<h2>Holla..! Your child ${req.body.studentName} has created his / her Profile.</h2><p>Hi, ${ifParentAcc[0].username}, We have added your child, to your circle. You can now TRACK your child's activities by loging into YOUR PARENT ACCOUNT.</p><br><p>- Thank you.</p>`,
              })
                .then((result) => {
                  console.log("Mail has been sent");
                })
                .catch((err) => {
                  return res.render("server-error", {
                    title: "Server Error",
                  });
                });
            });
            //flashing message - no mail to student.
            req.flash("success", "Your Profile has been created successfully.");
            return res.redirect("/student/profile");
          } else {
            // create a parent account and map with student
            // creating Parent Login credentials
            const parent_mob = req.body.parent_mobile;
            const parent_pass =
              parent_username.substring(0, 4) +
              "@" +
              parent_mob.substring(0, 4); //Ravi@8124
            const hashedParentPass = bcrypt.hashSync(`${parent_pass}`, 10);

            var parentLogin = `INSERT INTO school_main_login(school_id, role_id_fk, username, password, email, status) VALUES ('${session.school_id}', '5', '${parent_username}', '${hashedParentPass}', '${req.body.parent_email}', 'Active');`;
            // student mapping with parent login
            dbcon.query(parentLogin, (err, parentLog) => {
              if (err) console.log(err);
              console.log(parentLog);
              var stuParMap = `INSERT INTO school_parent_student_map(stu_school_id, parent_id, ml_student_id) VALUES ('${session.school_id}', '${parentLog.insertId}', '${session.student_id}')`;
              dbcon.query(stuParMap, (err) => {
                if (err) throw err;

                // sending emails - parent email - parent login created.
                const parent = sendMail({
                  from: process.env.MAIL_USERNAME,
                  to: req.body.parent_email,
                  subject:
                    "PARENT LOGIN for You. You can Track your child's Activities.",
                  html: `<h2>Holla..! Your child ${req.body.studentName} has created his / her Profile.</h2><p>Hi, ${req.body.father_name}, You can now login to YOUR PARENT ACCOUNT to TRACK your child's activities.</p><br><p>Please use followingh credentials to login.</p><br><h4>Username: ${parent_username}<br>Password: ${parent_pass}<br>Url: http://localhost:8005/ </h4><p>- Thank you.</p>`,
                })
                  .then((result) => {
                    console.log("Mail has been sent");
                  })
                  .catch((err) => {
                    return res.render("server-error", {
                      title: "Server Error",
                    });
                  });
                //flashing message - no mail to student.
                req.flash(
                  "success",
                  "Your Profile has been created successfully."
                );
                return res.redirect("/student/profile");
              });
            });
          }
        });
      });
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Show Student Profile When he clicks
exports.showStuProfile = async (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  if (session.logged_in) {
    // include all the profile data here
    var getStuProfile = `SELECT * FROM school_student WHERE student_id='${session.student_id}'`;
    dbcon.query(getStuProfile, (err, data) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      // student age
      // var today = new Date();
      // var dob = new Date(req.body.student_dob);
      // var age = today.getFullYear() - dob.getFullYear();
      // var m = today.getMonth() - dob.getMonth();
      // if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      //   age--;
      // }
      // session.age = age;
      res.locals.name = data[0].name;
      res.locals.mobile_number = data[0].mobile_number;
      res.locals.email = data[0].email;
      res.locals.date_of_birth = data[0].date_of_birth;
      res.locals.father_name = data[0].father_name;
      res.locals.parent_email = data[0].parent_email;
      res.locals.parent_mobile = data[0].parent_mobile;
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
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (session.logged_in) {
      var fetchStuProfile = `SELECT *, DATE_FORMAT(date_of_birth, '%Y-%c-%d') AS dob FROM school_student WHERE student_id='${session.student_id}' AND email='${session.email}' AND school_id='${session.school_id}'`;
      dbcon.query(fetchStuProfile, (err, data) => {
        if (err) return res.render("server-error", { title: "Server Error" });

        res.locals.name = data[0].name;
        res.locals.mobile_number = data[0].mobile_number;
        res.locals.email = data[0].email;
        res.locals.date_of_birth = data[0].date_of_birth;
        res.locals.father_name = data[0].father_name;
        res.locals.parent_email = data[0].parent_email;
        res.locals.parent_mobile = data[0].parent_mobile;
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
    return res.render("server-error", { title: "Server Error" });
  }
};

// Post Edit Profile Screen
exports.postEditStuProfile = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    if (session.logged_in && session.studentStatus == "Active") {
      var profileQuery = `UPDATE school_student SET city = '${req.body.student_city}', state = '${req.body.student_state}' WHERE student_id='${session.student_id}'`;

      dbcon.query(profileQuery, function (err, result) {
        if (err) {
          return res.render("server-error", { title: "Server Error" });
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
    return res.render("server-error", { title: "Server Error" });
  }
};

// admission due collection - payment by stduent
exports.allAdmissionDue = (req, res) => {
  let session = req.session;
  res.locals.err_msg = req.flash("err_msg");
  res.locals.success_msg = req.flash("success");
  try {
    if (req.method == "GET") {
      const student_id = session.student_id;
      var stuAdmisData = `SELECT stu.student_id, stu.name, stu.email, stu.mobile_number, sfs.class_std, sfs.medium, clr.class_section, ssa.school_id, ssa.id AS admission_id, ssa.actual_fee, ssa.batch_id, batch.batch_name, batch.year_from, batch.year_to, ssa.paying_amount, ssa.payment_status FROM school_student_admission AS ssa 
      INNER JOIN school_feestructure as sfs ON sfs.id=ssa.class_medium 
      INNER JOIN school_classroom as clr ON clr.id=ssa.class_section 
      INNER JOIN school_batch_mgmt AS batch ON batch.id = ssa.batch_id
      INNER JOIN school_student as stu ON stu.student_id=ssa.student_id WHERE ssa.student_id='${student_id}' AND ssa.deleted_at IS NULL`;

      dbcon.query(stuAdmisData, (err, row) => {
        if (err) {
          console.log(err);
          return res.render("server-error", { title: "Server Error" });
        }
        else if (row.length == 1) {
          res.locals.row = row;
          res.locals.data = row;
          return res.render("studentLevel/student-pay-fee", {
            title: "Admission Form",
          });
        } else {
          req.flash("err_msg", "You are not enrolled in any class yet.");
          return res.redirect("/student/dashboard");
        }
      });
    } else {
      let due_amount =
        req.body.course_fee_hide - req.body.paid_fee_hide - req.body.paying_fee;
      let due_status = due_amount == 0 ? "No Due" : "Due";

      var dueColl = `INSERT INTO school_student_feedue(school_id, student_id, admission_id, actual_fee, currently_paying, payment_mode, due_status) VALUES ('${req.body.school_id_hide}', '${req.body.stuId_due_own}', '${req.body.admission_id_hide}', '${req.body.course_fee_hide}', '${req.body.paying_fee}', '${req.body.payment_mode}', '${due_status}')`;
      dbcon.query(dueColl, (err, recorded) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        var adjustDueInAdmission = `UPDATE school_student_admission SET paying_amount = paying_amount+'${req.body.paying_fee}', payment_status = '${due_status}' WHERE id='${req.body.admission_id_hide}'`;

        dbcon.query(adjustDueInAdmission, (err, adjusted) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          req.flash("success", "Fee updated successfully.");
          return res.redirect("/student/admission-fee-payment?_method=GET");
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
      const saved_pass = session.stuPass;
      const verified = bcrypt.compareSync(`${currentPwd}`, `${saved_pass}`);

      if (
        verified &&
        req.body.schoolNewPassword === req.body.schoolRetypePassword
      ) {
        const newHash = bcrypt.hashSync(`${req.body.schoolNewPassword}`, 10);
        var newPass = `UPDATE school_main_login SET password = '${newHash}' WHERE id='${session.staff_id}'`;
        dbcon.query(newPass, (err, response) => {
          if (err) return res.render("server-error", { title: "Server Error" });
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

// get my attendance - working here
exports.getMyAttendance = async (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  try {
    var getMyAtt = `SELECT DATE_FORMAT(date, '%d-%c-%Y') AS date, GROUP_CONCAT(period_no) AS period_no, GROUP_CONCAT(attend_status ORDER BY period_no ASC) AS attendance FROM school_student_attendance WHERE student_affected = '${session.student_id}' AND deleted_at IS NULL GROUP BY date`;

    dbcon.query(getMyAtt, (err, attendance) => {
      if (err) throw err;
      var finalResult = [];
      for (let i=0; i < attendance.length; i++) {
        var index = [];
        var date = {date: attendance[i].date};
        index.push(date);
        var period_arr = attendance[i].period_no.split(",");
        for (let x=0; x < period_arr.length; x++){
          var period = {period_x: period_arr[x]} // issue here - 
          index.push(period);
        }
        var att_arr = attendance[i].attendance.split(",");
        for (let a of att_arr) {
          var status = {att_status_a: att_arr[a]}
          index.push(status);
        }
        finalResult.push(index);
      }
      console.log(finalResult);
      res.locals.attendance = finalResult;
      res.locals.student_id = session.student_id;
      // res.locals.attendance = attendance;
      return res.render('studentLevel/student-attendance', { title: 'Student Attendance'});
    })
  } catch (err) {
    console.log(err);
  }
}
// student seeing their staff profile for contact purpose
exports. getStaffProfile = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  try {
    // do - Sl.No | Subject | Staff Name | Staff Type | View profile & Chat Button 
    var staffDetails = `SELECT stad.class_section, subj.subject_name, clsu.staff_id_assigned, clsu.secondary_staff_assigned, staf1.name AS p_name, staf1.mobile_number AS p_mob, staf1.email As p_email, staf2.name AS s_name, staf2.mobile_number AS s_mob, staf2.email AS s_email  FROM school_student_admission AS stad INNER JOIN school_class_subjects AS clsu ON clsu.classroom_id = stad.class_section INNER JOIN school_subjects AS subj ON subj.id = clsu.subject_id INNER JOIN school_staff AS staf1 ON staf1.staff_id = clsu.staff_id_assigned INNER JOIN school_staff AS staf2 ON staf2.staff_id = clsu.secondary_staff_assigned WHERE stad.student_id = '${session.student_id}' AND stad.deleted_at IS NULL`;
    dbcon.query(staffDetails, (err, staffRecords) => {
      if(err) throw err;
      res.locals.staffRecords = staffRecords;
      return res.render('studentLevel/student-view-staff-profile', {title: 'Contact My Staff'});
    })
  } catch (err) {
    console.log(err);
  }
}

// student asking doubts to his staff (POST Modal)
exports.askMyStaff = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let staff_id = req.params.staff_id;
  try {
  var newDoubt = `INSERT INTO school_student_doubts(school_id, asked_by, asked_to, doubt_title, doubt_desc, status) VALUES ('${session.school_id}', '${session.student_id}', '${staff_id}', '${req.body.doubt_title}', '${req.body.doubt_desc}', 'open')`;
  dbcon.query(newDoubt, (err, addDoubt) => {
    if(err) throw err;
    else if (addDoubt.affectedRows == 1) {
      req.flash('success', 'Your doubt has been successfully sent to the staff. Expect a quick reply anytime soon.');
      return res.redirect('/student/dashboard/my-staff');
    } else {
      req.flash('err_msg', 'There is an error while processing your request. PTA.');
      return res.redirect('/student/dashboard/my-staff');
    }
  })
  } catch (err) {
    console.log(err);
  }
}

// my doubts of a student
exports.myDoubtsList = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  try {
    // do here
    var myDoubts = `SELECT doubt.id, doubt.asked_by, doubt.asked_to, staf.name, doubt.doubt_title, doubt.doubt_desc, doubt.status FROM school_student_doubts AS doubt INNER JOIN school_staff AS staf ON staf.staff_id = doubt.asked_to WHERE doubt.asked_by='${session.student_id}}' ORDER BY doubt.id DESC; SELECT sdt.doubt_ref_id, COUNT(sdt.message) AS newThread FROM school_doubt_thread AS sdt INNER JOIN school_student_doubts AS ssd ON sdt.doubt_ref_id = ssd.id WHERE ssd.asked_by = '${session.student_id}' AND sdt.message_by != '${session.student_id}' AND sdt.view_status = 'unread' GROUP BY ssd.id ORDER BY sdt.doubt_ref_id DESC;`;

    dbcon.query(myDoubts, (err, myDoubtsList) => {
      if(err) throw err;
      var doubtsList = myDoubtsList[0];
      var unreadList = myDoubtsList[1];

      // var unreadCount = [];
      // if(typeof unreadList !== 'undefined'){
      //   for (let x of doubtsList) {
      //     var id = x.id;
      //     console.log(id); //  1
      //     // console.log(unreadList.indexOf(id));
      //     if(unreadList.indexOf(id) !== -1){
      //       unreadCount.push(unreadList[unreadList.indexOf(id)].newThread);
            
      //     } else {
      //       unreadCount.push(0); // work
      //     }
      //   }
      // } else {
      //   for (let x of doubtsList) {
      //     unreadCount.push(0);
      //   }
      // }
      // console.log(unreadCount);

      res.locals.myDoubtsList = myDoubtsList[0];
      res.locals.unreadCount = myDoubtsList[1]; // can be undefined
      res.locals.who_logged_in = session.student_id;
      return res.render('studentLevel/doubts-by-student', {title: 'Doubts asked by me'});
    })
  } catch (err) {
    console.log(err);
  }
}

// adding new thread message by student
exports.addThreadMsg = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let doubt_status = req.body.doubt_status;
  try {
    // do
    var addThread = `INSERT INTO school_doubt_thread (school_id, doubt_ref_id, message, message_by, view_status) VALUES ('${session.school_id}', '${req.body.doubt_id}', '${req.body.reply_msg}', '${session.student_id}', 'unread')`;
    dbcon.query(addThread, (err, addedNewMsg) => {
      if(err) throw err;
      else if (addedNewMsg.affectedRows == 1){
        var updateDoubtStatus = `UPDATE school_student_doubts SET status = '${doubt_status}' WHERE id='${req.body.doubt_id}'`;
        dbcon.query(updateDoubtStatus, (err, doubtUpdate) => {
          if(err) throw err;
          req.flash('success', 'Your message has been sent successfully');
          return res.redirect('/student/dashboard/my-doubts');
        })
      } else {
        req.flash('err_msg', 'We couldnt catch your message. Please try again.');
        return res.redirect('/student/dashboard/my-doubts');
      }
    })
  } catch (err) {
    console.log(err);
  }
}

exports.getExamsAndMarks = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  res.locals.student_id = session.student_id;
  try {
    // see all the Exams added to his class section. // See his own Marks as well.
    var examsAndMarks = `SELECT xam.id, xam.ex_master_id, xam.exam_conducted_class_sec, xmas.exam_name, xmas.exam_type, xam.subject_id, subj.subject_name, DATE_FORMAT(xam.exam_date, '%d-%c-%Y %H:%i') AS exam_date, xam.exam_duration, xam.sub_outoff_marks, xam.cutoff_mark, xam.exam_status FROM school_exams AS xam 
    INNER JOIN school_exams_master AS xmas ON xmas.id = xam.ex_master_id 
    INNER JOIN school_student_admission AS ssad ON ssad.class_section = xam.exam_conducted_class_sec 
    INNER JOIN school_subjects AS subj ON subj.id = xam.subject_id 
    WHERE ssad.student_id = '${session.student_id}' AND ssad.school_id = '${session.school_id}' AND ssad.deleted_at IS NULL GROUP BY xam.ex_master_id; SELECT sem.exam_id, subj.subject_name, xam.sub_outoff_marks, xam.cutoff_mark, sem.received_mark, sem.subject_result FROM school_exams_marks AS sem INNER JOIN school_exams AS xam ON xam.id = sem.exam_id INNER JOIN school_subjects AS subj ON subj.id = xam.subject_id WHERE sem.student_id = '${session.student_id}' AND sem.deleted_at IS NULL`;

    dbcon.query(examsAndMarks, (err, myExamsList) => {
      if(err) throw err
      console.log(myExamsList);
      res.locals.myExamsList = myExamsList[0];
      res.locals.marks = myExamsList[1];
      return res.render('studentLevel/student-viewing-exams', {title: 'Exams & Marks'})
    })
  } catch (err) {
    console.log(err);
  }
}


// student viewing his marksheet
exports.viewMarkSheet = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  res.locals.student_id = session.student_id;
  let student_id = req.params.student_id;
  let exam_master_id = req.params.exam_master_id;
  let class_sec = req.params.class_sec;
  let action = req.params.action;
  try {
    var getMyMark = `SELECT subj.id AS subj_id, subj.subject_name, sem.received_mark, xam.exam_date, xam.exam_conducted_class_sec, xam.ex_master_id, xam.exam_duration, xam.exam_status, xam.sub_outoff_marks, xam.cutoff_mark, sem.is_released FROM school_exams_marks AS sem 
    INNER JOIN school_exams AS xam ON xam.id = sem.exam_id INNER JOIN school_subjects AS subj ON subj.id = xam.subject_id INNER JOIN school_exams_master AS xmas ON xmas.id = xam.ex_master_id WHERE sem.student_id = '${student_id}' AND xam.ex_master_id = '${exam_master_id}' AND sem.is_released = 'yes' AND xam.exam_conducted_class_sec = '${class_sec}' AND sem.deleted_at IS NULL; SELECT subj.id, subj.subject_name FROM school_class_subjects AS scs INNER JOIN school_subjects AS subj ON subj.id = scs.subject_id WHERE scs.classroom_id = '${class_sec}' AND scs.deleted_at IS NULL; SELECT stu.name, stu.father_name, DATE_FORMAT(stu.date_of_birth, '%d-%c-%Y') AS date_of_birth, ssad.batch_id, batch.batch_name FROM School_student AS stu INNER JOIN school_student_admission AS ssad ON ssad.student_id = stu.student_id INNER JOIN school_batch_mgmt AS batch ON batch.id = ssad.batch_id WHERE stu.student_id = '${student_id}' AND ssad.batch_id ;`;
    dbcon.query(getMyMark, (err, markList) => {
      if(err) throw err;
      else if (markList[0].length != 0) {
        console.log(markList);
        var mark_data = "";
        let fail_count = 0;
        let max_total = 0;
        let secured_total = 0;
        let final_result = "";
        for (let s=0; s < markList[1].length; s++) {
          let mark_index = markList[0].findIndex(obj => obj.subj_id == `${markList[1][s].id}`);
          let received_mark = 'To be updated'
          let subject_result = 'To be updated'
          if(mark_index != '-1') {
            received_mark = `${markList[0][mark_index].received_mark}`;
            subject_result = `${markList[0][mark_index].received_mark}` > `${markList[0][mark_index].cutoff_mark}` ? 'Pass' : 'Fail'
            subject_result == 'Fail' ? fail_count++ : fail_count;
            max_total += markList[0][mark_index].sub_outoff_marks
            secured_total += markList[0][mark_index].received_mark
          } else {
            received_mark;
            subject_result;
          }
          let mark_row = `<tr>
          <th scope="row">${s+1}</th>
          <td>${markList[1][s].subject_name}</td>
          <td>${markList[0][mark_index].sub_outoff_marks}</td>
          <td>${markList[0][mark_index].cutoff_mark}</td>
          <td>${received_mark}</td>
          <td>${subject_result}</td>
          </tr>`
          mark_data += mark_row;
        }

        final_result = fail_count == 0 ? 'Pass' : 'Fail';
        res.locals.max_total = max_total;
        res.locals.secured_total = secured_total;
        res.locals.mark_data = mark_data;
        res.locals.final_result = final_result;
        res.locals.markList = markList;
      } else {
        var mark_data = `<tr><td colspan="6" class="text-center">
          <mark>Marks Not released yet.</mark></td></tr>`;
        res.locals.markList = markList;
        res.locals.mark_data = mark_data;
      }
      return res.render('studentLevel/student-view-marksheet', {title: 'My Marksheet'})
    })
  } catch (err) {
    console.log(err);
  }
}

exports.pdfMarkSheet = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  res.locals.student_id = session.student_id;
  let student_id = req.params.student_id;
  let exam_master_id = req.params.exam_master_id;
  let class_sec = req.params.class_sec;
  let action = req.params.action;
  try {
    var getMyMark = `SELECT subj.id AS subj_id, subj.subject_name, sem.received_mark, xam.exam_date, xam.exam_conducted_class_sec, xam.ex_master_id, xam.exam_duration, xam.exam_status, xam.sub_outoff_marks, xam.cutoff_mark, sem.is_released FROM school_exams_marks AS sem 
    INNER JOIN school_exams AS xam ON xam.id = sem.exam_id INNER JOIN school_subjects AS subj ON subj.id = xam.subject_id INNER JOIN school_exams_master AS xmas ON xmas.id = xam.ex_master_id WHERE sem.student_id = '${student_id}' AND xam.ex_master_id = '${exam_master_id}' AND sem.is_released = 'yes' AND xam.exam_conducted_class_sec = '${class_sec}' AND sem.deleted_at IS NULL; SELECT subj.id, subj.subject_name FROM school_class_subjects AS scs INNER JOIN school_subjects AS subj ON subj.id = scs.subject_id WHERE scs.classroom_id = '${class_sec}' AND scs.deleted_at IS NULL; SELECT stu.name, stu.father_name, DATE_FORMAT(stu.date_of_birth, '%d-%c-%Y') AS date_of_birth, ssad.academic_year FROM School_student AS stu INNER JOIN school_student_admission AS ssad ON ssad.student_id = stu.student_id WHERE stu.student_id = '${student_id}' AND ssad.academic_year = YEAR(CURDATE());`;
    dbcon.query(getMyMark, (err, markList) => {
      if(err) throw err;
      else if (markList[0].length != 0) {
        console.log(markList);
        var mark_data = "";
        let fail_count = 0;
        let max_total = 0;
        let secured_total = 0;
        for (let s=0; s < markList[1].length; s++) {
          let mark_index = markList[0].findIndex(obj => obj.subj_id == `${markList[1][s].id}`);
          let received_mark = 'To be updated'
          let subject_result = 'To be updated'
          let final_result = "";
          if(mark_index != '-1') {
            received_mark = `${markList[0][mark_index].received_mark}`;
            subject_result = `${markList[0][mark_index].received_mark}` > `${markList[0][mark_index].cutoff_mark}` ? 'Pass' : 'Fail'
            subject_result == 'Fail' ? fail_count++ : fail_count;
            max_total += markList[0][mark_index].sub_outoff_marks
            secured_total += markList[0][mark_index].received_mark
          } else {
            received_mark;
            subject_result;
          }
          let mark_row = `<tr>
          <th scope="row">${s+1}</th>
          <td>${markList[1][s].subject_name}</td>
          <td>${markList[0][mark_index].sub_outoff_marks}</td>
          <td>${markList[0][mark_index].cutoff_mark}</td>
          <td>${received_mark}</td>
          <td>${subject_result}</td>
          </tr>`
          mark_data += mark_row;
        }

        final_result = fail_count == 0 ? 'Pass' : 'Fail';
        res.locals.max_total = max_total;
        res.locals.secured_total = secured_total;
        res.locals.mark_data = mark_data;
        res.locals.final_result = final_result;
        res.locals.markList = markList;
        // return res.render('studentLevel/student-view-marksheet', {title: 'My Marksheet'})

        var original = res.render('studentLevel/student-view-marksheet', {title: 'My PDF'})

        var ejs_file = fs.readFileSync('./views/partials/components/read/view-student-marksheet.ejs', 'utf8');
        var html_render = ejs.render(ejs_file);
        var html = fs.writeFileSync("./html.html", html_render, 'utf8');

        pdf.create(html, options).toFile(`./public/uploads/marksheet_pdf_${session.student_id}.pdf`, (err, result) => {
          if (err) throw err;
          console.log(res);
          var datafile = fs.readFileSync(`./public/uploads/marksheet_pdf_${session.student_id}.pdf`);
          res.header('content-type', 'application/pdf');
          res.send(datafile);
        })
      } else {
        var mark_data = `<tr><td colspan="6" class="text-center">
          <mark>Marks Not released yet.</mark></td></tr>`;
        res.locals.markList = markList;
        res.locals.mark_data = mark_data;
        return res.render('studentLevel/student-view-marksheet', {title: 'My Marksheet'})
      }
        // var rende = res.render('studentLevel/student-view-marksheet', {title: 'My Marksheet'})
        // var rendered_file = ejs.render(rende, 'utf8');
        // var html = fs.writeFileSync("./html.html", rendered_file, 'utf8');
        // pdf.create(html, options).toFile(`./public/uploads/marksheet_pdf_${session.student_id}.pdf`, (err, result) => {
        //   if (err) throw err;
        //   console.log(res);
        //   var datafile = fs.readFileSync(`./public/uploads/marksheet_pdf_${session.student_id}.pdf`);
        //   res.header('content-type', 'application/pdf');
        //   res.send(datafile);
        // })
    })
  } catch (err) {
    console.log(err);
  }
}

// student downloading marksheet
exports.dlMarkSheet = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  res.locals.student_id = session.student_id;
  try {
    // creating ejs to Html
    var ejs_file = fs.readFileSync('./views/partials/components/read/view-student-marksheet.ejs', 'utf8');
    var html_render = ejs.render(ejs_file);
    var html = fs.writeFileSync("./html.html", html_render, 'utf8');

    // res.render('studentLevel/student-view-marksheet', function (err, html) {
      // console.log(html);
      pdf.create(html, options).toFile(`./public/uploads/marksheet_pdf_${session.student_id}.pdf`, (err, result) => {
        if (err) throw err;
        console.log(res);
        var datafile = fs.readFileSync(`./public/uploads/marksheet_pdf_${session.student_id}.pdf`);
        res.header('content-type', 'application/pdf');
        res.send(datafile);
      })
    // })
  } catch (err) {
    console.log(err);
  }
}