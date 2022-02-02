const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const staffRouter = require("../routes/staffRoutes");

// Staff Logs IN - POST staff login
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

// getting Staff Dashboard
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
      let staff_role = session.roleId;
      res.locals.staff_role = staff_role;
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
          return res.render("staffLevel/staff-dashboard", {
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
    res.locals.staff_role = session.roleId;
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
          res.locals.staff_email = session.email;
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

// Staff fills their Profile for the first time
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
  res.locals.staff_role = session.roleId;
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

// staff editing his own profile
exports.getStaffProfileEdit = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
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

// Staff edits profile and updates to the DB
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

// change passsword route for all roles
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

// ******** STAFF_ROLE = TEACHING STAFF ********

// view students assigned to the staff - TEACHING STAFF + used in NTF
exports.getStudentsList = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let staff_role = session.roleId;
  res.locals.staff_role = staff_role;
  try {
    if (staff_role == "8") {
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
    } else if (staff_role == 4 || 2) {
      // head master view all students here..
      var stuProfile = `SELECT stu.student_id, sml.username, stu.name, sml.email, stu.mobile_number, sfs.class_std, sfs.medium, clr.class_section FROM school_main_login AS sml INNER JOIN school_student AS stu ON stu.student_id = sml.id
      INNER JOIN school_student_admission AS stad ON stad.student_id = stu.student_id INNER JOIN school_feestructure AS sfs ON sfs.id = stad.class_medium INNER JOIN school_classroom AS clr ON clr.id = stad.class_section WHERE sml.school_id='${session.school_id}' AND sml.role_id_fk='1'`;
      dbcon.query(stuProfile, (err, stuProfiles) => {
        if (err) throw err;
        res.locals.stuProfiles = stuProfiles;
        return res.render("staffLevel/view-student-profile-hm", {
          title: "HM View Student profile",
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

// view the list of classes assigned to the teaching staff
exports.getClassAssigned = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let staff_role = session.roleId;
  res.locals.staff_role = staff_role;
  try {
    if (staff_role == "8") {
      var classAssigned = `SELECT DISTINCT scs.subject_id, scs.classroom_id, clr.class_id, clr.class_section, clr.students_filled, sfs.class_std, sfs.medium, sub.subject_name FROM school_class_subjects AS scs
      INNER JOIN school_classroom AS clr ON scs.classroom_id = clr.id
      INNER JOIN school_feestructure AS sfs ON clr.class_id = sfs.id
      INNER JOIN school_subjects AS sub ON scs.subject_id=sub.id
      WHERE scs.school_id='${session.school_id}' ORDER BY ABS(sfs.class_std)`;
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

// get my schedule for teaching staff
exports.getMyScheduleStaff = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let staff_role = session.roleId;
  res.locals.staff_role = staff_role;
  try {
    //run a query to fetch schedule data
    var scheduleToday = `SELECT sws.id, sws.day, sws.period_no, subs.subject_name, clr.id AS class_sec_id, clr.class_section, sfs.class_std, sfs.medium FROM school_week_schedule AS sws INNER JOIN school_subjects AS subs ON subs.id = sws.period_subject_id INNER JOIN school_classroom AS clr ON clr.id=sws.class_sec_id INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id WHERE sws.period_staff_id='${session.staff_id}' AND sws.day=DAYOFWEEK(CURDATE()-1) ORDER BY ABS(sws.period_no)`;
    dbcon.query(scheduleToday, (err, schedule) => {
      if (err) throw err;
      else if (schedule.length > 0) {
        res.locals.schedule = schedule;
        res.locals.staff_id = session.staff_id;
        return res.render("staffLevel/teacher-view-class-schedule", {
          title: "Teacher View Class Schedule",
        });
      } else {
        res.locals.staff_id = session.staff_id;
        res.locals.schedule = schedule;
        return res.render("staffLevel/teacher-view-class-schedule", {
          title: "Teacher View Class Schedule",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// get attendance page
exports.getStuAttendance = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let staff_role = session.roleId;
  res.locals.staff_role = staff_role;
  try {
    let class_sec_id = req.params.class_sec_id;
    let staff_id = req.params.staff_id;
    var week_sched_id = req.params.week_sched_id;
    if (staff_id == session.staff_id) {
      // get data from school_student_attendance table
      var StuAttendance = `SELECT sws.day, sws.period_no, sws.class_sec_id, sfs.class_std, sfs.medium, clr.class_section FROM school_week_schedule AS sws INNER JOIN school_classroom AS clr ON clr.id = sws.class_sec_id INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id WHERE sws.id='${week_sched_id}'; SELECT DATE_FORMAT(ssa.date, '%d-%c-%Y') AS date, clr.class_section, sfs.class_std, sfs.medium, ssa.period_no, ssa.attend_status, CONCAT(ssa.attend_status, ': ',  GROUP_CONCAT(ssa.student_affected ORDER BY ssa.attend_status SEPARATOR ', ')) AS student_affect FROM school_student_attendance AS ssa INNER JOIN school_classroom AS clr ON clr.id = ssa.class_sec INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id WHERE ssa.school_id='${session.school_id}' AND ssa.entered_by = '${session.staff_id}' AND ssa.deleted_at IS NULL AND ssa.student_affected != '0' GROUP BY ssa.date, ssa.entered_by, ssa.period_no, ssa.attend_status; SELECT ssa.student_id, stu.name FROM school_student_admission AS ssa INNER JOIN school_student AS stu ON stu.student_id = ssa.student_id WHERE ssa.class_section='${class_sec_id}' AND ssa.academic_year = YEAR(CURDATE())`;
      dbcon.query(StuAttendance, (err, attendances) => {
        if (err) throw err;
        res.locals.attendances = attendances;
        return res.render("staffLevel/teacher-add-attendance", {
          title: "Student Attendance Records",
        });
      });
    } else {
      req.flash("err_msg", "You are not associated with this Period");
      return res.redirect("/staff/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
};

// post Class Attendance by Teaching staff
exports.postStuAttendance = (req, res) => {
  let session = req.session;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let staff_role = session.roleId;
  res.locals.staff_role = staff_role;
  var absent = req.body.absent_stu; // [1, 2, 5]
  var on_duty = req.body.on_duty_stu; // 2
  var leave_intimated = req.body.leave_informed_stu;
  var present_today = req.body.present_students;
  try { 
    // check for records dupe
    var dupeAttendance = `SELECT * FROM school_student_attendance WHERE school_id = '${session.school_id}' AND class_sec = '${req.body.class_sec_id_hide}' AND period_no = '${req.body.period_no}' AND date = CURDATE()`;
    dbcon.query(dupeAttendance, (err, duplicate) => {
      if(err) throw err
      else if (duplicate.length > 0) {
        req.flash('err_msg', 'Attendance for this Class Period added already');
        return res.redirect("/staff/dashboard/my-schedule");
      } else {
        // for loop to construct a query - absent
        var absentDataEntry = ""; 
        var onDutyDataEntry = ""; 
        var leaveDataEntry = "";
        var presentDataEntry = "";

        if (typeof absent !== 'undefined'){
          for (let i = 0; i < absent.length; i++){
            var absent_loop = `('${req.body.attendance_date_hide}', '${session.school_id}', '${req.body.class_sec_id_hide}','${req.body.period_no}','Absent','${absent[i]}', '${session.staff_id}'),`;
            absentDataEntry = absentDataEntry + absent_loop;
          }
        } else {
          // let absent_i = 'NULL';
          // absentDataEntry = `('${req.body.attendance_date_hide}', '${session.school_id}', '${req.body.class_sec_id_hide}','${req.body.period_no}','Absent','${absent_i}', '${session.staff_id}'),`;
          absentDataEntry = "";
        }
        
        if(typeof on_duty !== 'undefined') {
          // for loop to construct a query - on_duty
          for (let i = 0; i < on_duty.length; i++){
            var onDuty_loop = `('${req.body.attendance_date_hide}', '${session.school_id}', '${req.body.class_sec_id_hide}','${req.body.period_no}','On_Duty','${on_duty[i]}', '${session.staff_id}'),`;
            onDutyDataEntry = onDutyDataEntry + onDuty_loop;
          }
        } else {
          onDutyDataEntry = "";
        }

        if(typeof present_today !== 'undefined') {
          // for loop to construct a query - Present students
          for (let i = 0; i < present_today.length; i++){
            var present_loop = `('${req.body.attendance_date_hide}', '${session.school_id}', '${req.body.class_sec_id_hide}','${req.body.period_no}','Present','${present_today[i]}', '${session.staff_id}'),`;
            presentDataEntry = presentDataEntry + present_loop;
          }
        } else {
          presentDataEntry = "";
        }
        
        if (typeof leave_intimated !== 'undefined') {
          // for loop to construct a query - Leave_intimated
          for (let i = 0; i < leave_intimated.length; i++){ // length 1 - 1 run
            var leave_loop = `('${req.body.attendance_date_hide}', '${session.school_id}', '${req.body.class_sec_id_hide}','${req.body.period_no}','Leave_Intimated','${leave_intimated[i]}', '${session.staff_id}'),`;
            leaveDataEntry = leaveDataEntry + leave_loop;
          }
        } else {
          leaveDataEntry = "";
        }
        var finalQuery = (onDutyDataEntry + absentDataEntry + presentDataEntry + leaveDataEntry).slice(0, -1);
        
        // inserting attendance
        var attendanceData = `INSERT INTO school_student_attendance(date, school_id, class_sec, period_no, attend_status, student_affected, entered_by) VALUES ${finalQuery}`; 
        dbcon.query(attendanceData, (err, attendanceAdded) => {
          if (err) throw err;
          req.flash("success", "Attendance added successfully.");
          return res.redirect("/staff/dashboard/my-schedule");
        });
      }
    })
  } catch (err) {
    console.log(err);
  }
};

// staff viewing student doubts
exports.getStudentDoubts = (req, res) => {
  let session = req.session;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    // do here
    var askedToMe = `SELECT doubt.id, doubt.asked_by, stu.name, doubt.doubt_title, doubt.doubt_desc, doubt.status FROM school_student_doubts AS doubt INNER JOIN school_student AS stu ON stu.student_id = doubt.asked_by WHERE doubt.asked_to = '${session.staff_id}'`;
    dbcon.query(askedToMe, (err, studentAsked) => {
      if(err) throw err;
      res.locals.studentAsked = studentAsked;
      res.locals.who_logged_in = session.staff_id;
      return res.render('staffLevel/student-doubt-to-staff', {title: 'Students Doubts'});
    })
  } catch(err) {
    console.log(err);
  }
}

// Teaching staff viewing Exams created by HM (subjects that are handled by him)
exports.viewExamsByHM = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let doubt_status = req.body.doubt_status;
  res.locals.staff_role = session.roleId;
  try {
    var examList = `SELECT xam.id, xam.exam_name, xam.exam_type, sfs.class_std, sfs.medium, batch.batch_name, xam.exam_status, subj.subject_name, DATE_FORMAT(xam.exam_date, '%d-%c-%Y %H:%i') AS exam_date, xam.exam_duration, xam.sub_outoff_marks, xam.cutoff_mark FROM school_exams AS xam 
    INNER JOIN school_classroom AS clr ON clr.id = xam.exam_conducted_class_sec 
    INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id 
    INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id 
    INNER JOIN school_subjects AS subj ON subj.id = xam.subject_id
    INNER JOIN school_class_subjects AS scs ON scs.deleted_at IS NULL AND scs.subject_id = xam.subject_id AND xam.exam_conducted_class_sec = scs.classroom_id
    WHERE scs.staff_id_assigned = '${session.staff_id}' AND xam.school_id = '${session.school_id}' AND xam.deleted_at IS NULL; SELECT exam_id, COUNT(received_mark) AS entries FROM school_exams_marks WHERE deleted_at IS NULL`;
    dbcon.query(examList, (err, data) => {
      if(err) throw err;
      res.locals.data = data[0];
      res.locals.marks = data[1];
      return res.render('staffLevel/staff-view-exams', {title: 'Staff Viewing Exams'})
    })
  } catch(err) {
    console.log(err);
  }
}

// adding new thread message by staff
exports.addThreadMsg = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let doubt_status = req.body.doubt_status;
  try {
    // do
    var addThread = `INSERT INTO school_doubt_thread (school_id, doubt_ref_id, message, message_by, view_status) VALUES ('${session.school_id}', '${req.body.doubt_id}', '${req.body.reply_msg}', '${session.staff_id}', 'unread')`;
    dbcon.query(addThread, (err, addedNewMsg) => {
      if(err) throw err;
      else if (addedNewMsg.affectedRows == 1){
        var updateDoubtStatus = `UPDATE school_student_doubts SET status = '${doubt_status}' WHERE id='${req.body.doubt_id}'`;
        dbcon.query(updateDoubtStatus, (err, doubtUpdate) => {
          if(err) throw err;
          req.flash('success', 'Your message has been sent successfully');
          return res.redirect('/staff/dashboard/student-doubts');
        })
      } else {
        req.flash('err_msg', 'We couldnt catch your message. Please try again.');
        return res.redirect('/staff/dashboard/student-doubts');
      }
    })
  } catch (err) {
    console.log(err);
  }
}

// add Exam marks for the student - working in query here
exports.addStuExamMarks = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let exam_ref_id = req.params.exam_ref_id;
  try {
    var getStudents = `SELECT xam.id, xam.exam_name, xam.exam_type, xam.exam_conducted_class_sec, sfs.class_std, sfs.medium, clr.class_section, subj.subject_name, xam.exam_date, xam.exam_duration, xam.sub_outoff_marks, xam.cutoff_mark FROM school_exams AS xam INNER JOIN school_classroom AS clr ON clr.id = xam.exam_conducted_class_sec INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id INNER JOIN school_subjects AS subj ON subj.id = xam.subject_id WHERE xam.id = '${exam_ref_id}';

    SELECT ssad.class_section, stu.student_id, stu.name FROM school_student_admission AS ssad INNER JOIN school_student AS stu ON stu.student_id = ssad.student_id INNER JOIN school_exams AS exam ON exam.exam_conducted_class_sec = ssad.class_section WHERE exam.id = '${exam_ref_id}';
    `;
    dbcon.query(getStudents, (err, studentsList) => {
      if(err) throw err;
      res.locals.examData = studentsList[0];
      res.locals.studentsList = studentsList[1];
      return res.render('staffLevel/teacher-add-marks', {title: 'Exam Marks'})
    })
    // do
  } catch (err) {
    console.log(err);
  }
}

// teaching staff saves exam marks
exports.postStuExamMarks = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let exam_ref_id = req.params.exam_ref_id;
  let student_count = req.params.students_count;
  try {
    // check duplicate if any
    var checkMark = `SELECT EXISTS ( SELECT * FROM school_exams_marks WHERE exam_id = '${exam_ref_id}') AS count`;
    dbcon.query(checkMark, (err, duplicateEntry) => {
      if(err) throw err;
      else if (duplicateEntry[0].count > 0) {
        req.flash('err_msg', 'Marks for this Exam is already added.')
        return res.redirect('/staff/dashboard/view-exams');
      } else {
        let mark_values = "";
        for (let i = 0; i < student_count; i++) {
          let new_mark = `('${session.school_id}', '${exam_ref_id}', '${req.body[`student_${i+1}`]}', '${req.body[`exam_mark_${i+1}`]}', '${session.staff_id}'),`
          mark_values += new_mark;
        }
        mark_values = mark_values.slice(0, -1);
        var addmarks = `INSERT INTO school_exams_marks (school_id, exam_id, student_id, received_mark, entered_by) VALUES ${mark_values}`;
        dbcon.query(addmarks, (err, markAdded) => {
          if(err) throw err;
          req.flash('success', 'Exam Marks added successfully.');
          return res.redirect('/staff/dashboard/view-exams');
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
}

// TEaching Staff Edits Exam Marks - having issue - not saving the updted marks
exports.editExamMarks = (req, res) => {
  let session = req.session;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let exam_ref_id = req.params.exam_ref_id;
  let student_count = req.params.students_count;
  try {
    // do
    let updateMarks = "";
    for (let i=1; i <= student_count; i++) {
      var loop = `UPDATE school_exams_marks SET received_mark='${req.body[`edit_exam_mark_${i}`]}' WHERE student_id='${req.body[`student_id_${i}`]}' AND exam_id='${exam_ref_id}';`;
      updateMarks += loop
    }
    dbcon.query(updateMarks, (err, updatedMarks) => {
      if(err) throw err;
      req.flash('success', 'Marks updated successfully.');
      return res.redirect('/staff/dashboard/view-exams');
    })
  } catch (err) {
    console.log(err);
  }
}
// ******** STAFF_ROLE = TEACHING STAFF ********

// ******** STAFF_ROLE = ADMIN ********
// view fee structure - class-medium (ADMIN)
exports.viweFeeStructure = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;
    var feeStrucData = `SELECT * FROM school_feestructure WHERE school_id='${session.school_id}' AND deleted_at IS NULL ORDER BY ABS(class_std)`;

    dbcon.query(feeStrucData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
        res.locals.staff_role = session.roleId;
        res.locals.data = data;
        return res.render("staffLevel/sc-feeStructure-admin", {
          title: "Fee Structure",
          data,
        });
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Add fee Struture by ADMIN
exports.postAddFeeStructure = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;
    if (session.logged_in) {
      const school_id = session.school_id;
      const class_std = req.body.class_std;
      const medium = req.body.medium;
      const actual_fee = req.body.fee;

      var feeQuery = `SELECT EXISTS (SELECT * FROM school_feestructure WHERE school_id='${school_id}'AND class_std='${class_std}' AND medium='${medium}') AS count`;

      dbcon.query(feeQuery, (err, data) => {
        if (err) {
          throw err;
          // return res.render("server-error", { title: "Server Error" });
        } else if (data[0].count == 0) {
          var addFeeQuery = `INSERT INTO school_feestructure(school_id, class_std, medium, actual_fee) VALUES ('${school_id}', '${class_std}', '${medium}', '${actual_fee}')`;
          dbcon.query(addFeeQuery, (err, response) => {
            if (err) {
              throw err;
              // return res.render("server-error", { title: "Server Error" });
            } else {
              req.flash(
                "success",
                `Fee structure for ${class_std} STD - ${medium} Medium is added successfully.`
              );
              return res.redirect("/staff/dashboard/fee-structure");
            }
          });
        } else {
          req.flash(
            "err_msg",
            `Fee structure for ${class_std} STD - ${medium} Medium is already added.`
          );
          return res.redirect("/staff/dashboard/subjects");
        }
      });
    } else {
      req.flash("err_msg", "Please login to continue.");
      return res.redirect("/");
    }
  } catch (err) {
    throw err;
    // return res.render("server-error", { title: "Server Error" });
  }
};

// PUT / EDIT Fee stcuture by ADMIN
exports.putFeeStructure = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // getting data from url
    let id = req.params.id;
    var ifDuplicate = `SELECT EXISTS (SELECT * FROM school_feestructure WHERE school_id='${session.school_id}' AND class_std='${req.body.class_std_edit}' AND medium='${req.body.medium_edit}') AS count`;
    dbcon.query(ifDuplicate, (err, result) => {
      if (err) throw err;
      else if (result[0].count == 1) {
        req.flash("err_msg", "The Class Medium combination is already exist.");
        return res.redirect("/staff/dashboard/fee-structure");
      } else {
        var insertFee = `UPDATE school_feestructure SET class_std='${req.body.class_std_edit}', medium='${req.body.medium_edit}', actual_fee='${req.body.fee_edit}' where id='${req.body.fee_id}'`;
        dbcon.query(insertFee, (err, response) => {
          if (err) throw err;
          req.flash("success", "Updated successfully.");
          return res.redirect("/staff/dashboard/fee-structure");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// view User Accounts (ADMIN)
exports.viewUserAccounts = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    var userAccData = `SELECT * FROM school_main_login WHERE school_id='${session.school_id}' AND NOT(role_id_fk='1') AND NOT(role_id_fk='5') AND NOT(id='${session.staff_id}')`;

    dbcon.query(userAccData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
        res.locals.staff_role = session.roleId;
        for (let i = 0; i < data.length; i++) {
          switch (data[i].role_id_fk) {
            case 2:
              data[i].role_id_fk = "Non-teaching Faculty";
              break;
            case 4:
              data[i].role_id_fk = "Head Master";
              break;
            case 8:
              data[i].role_id_fk = "Teaching Faculty";
              break;
            case 9:
              data[i].role_id_fk = "Admin";
              break;
            default:
              data[i].role_id_fk = "Student";
          }
        }
        res.locals.data = data;
        return res.render("staffLevel/sc-create-users-admin", {
          title: "User Accounts",
          data,
        });
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Add User Accounts (ADMIN)
exports.postAddUser = async (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (session.logged_in && session.staffStatus == "Active") {
      const schoolId = session.school_id;

      var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' OR email='${req.body.email}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(userCheck, (err, data) => {
        if (err) {
          req.flash("err_msg", "We could not add new user at the moment.");
          return res.redirect("/staff/dashboard/users");
        } else {
          if (data[0].count == 0) {
            // password hashing
            const userPassword = req.body.password;
            const hashedPass = bcrypt.hashSync(`${userPassword}`, 10);

            const addClass = `INSERT INTO school_main_login(school_id, role_id_fk, username, password, email, status) VALUES ('${schoolId}', '${req.body.role}', '${req.body.username}', '${hashedPass}', '${req.body.email}', 'Inactive');`;

            dbcon.query(addClass, function (err) {
              if (err) {
                req.flash(
                  "err_msg",
                  "There is an error when adding an user. Please try again later."
                );
                return res.redirect("/staff/dashboard/users");
              } else {
                req.flash("success", "A New User account has been added.");
                return res.redirect("/staff/dashboard/users");
              }
            });
          } else {
            req.flash(
              "err_msg",
              "This Username / email is already registered with this School."
            );
            return res.redirect("/staff/dashboard/users");
          }
        }
      });
    } else if (session.logged_in && session.staffStatus == "Inactive") {
      req.flash(
        "err_msg",
        "The school is unauthorized to do this action. Please Activate the school by submitting purchase details to support@sms.com"
      );
      return res.status(401).redirect("/school/dashboard");
    } else {
      req.flash("err_msg", "Please Login to continue.");
      return res.status(401).redirect("/");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// editimng USER acounts - Edit only role and status of the user
exports.putUserAccount = async (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var userAccEdit = `UPDATE school_main_login SET role_id_fk='${req.body.role_update}', status='${req.body.status_edit}' WHERE id='${req.body.staff_edit_id}'`;
    dbcon.query(userAccEdit, (err, userEdited) => {
      if (err) throw err;
      req.flash("success", "User Account edited successfully.");
      return res.redirect("/staff/dashboard/users");
    });
  } catch (err) {
    console.log(err);
  }
};

// showing schedule plan form for ADMIN
exports.getSchedulePlanForm = async (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var getScheduleTemps = `SELECT * FROM school_schedule_template WHERE school_id='${session.school_id}'`;
    dbcon.query(getScheduleTemps, (err, templates) => {
      if (err) throw err;
      // return res.render("server-error", { title: "Server Error" });
      let staff_role = session.roleId;
      res.locals.staff_role = staff_role;
      res.locals.templates = templates;
      return res.render("staffLevel/sc-schedule-template-admin", {
        title: "School Schedule Template",
      });
    });
  } catch (err) {
    throw err;
    // return res.render("server-error", { title: "Server Error" });
  }
};

// delete fee structure class-medium by ADMIN
exports.deleteFeeStructure = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let id = req.params.id;
  try {
    var checkSection = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_id='${id}') AS count`;
    dbcon.query(checkSection, (err, sections) => {
      if (err) throw err;
      else if (sections[0].count != 0) {
        req.flash(
          "err_msg",
          "There are Sections assigned to this Class Standard. There might be students enrolled to these sections. Please make sure to move them to different Class standard, and try again."
        );
        return res.redirect("/staff/dashboard/fee-structure");
      } else {
        var deleteClassStd = `UPDATE school_feestructure SET deleted_at = CURRENT_TIMESTAMP WHERE id='${id}'`;
        dbcon.query(deleteClassStd, (err, response) => {
          if (err) throw err;
          req.flash("success", "Deleted successfully.");
          return res.redirect("/staff/dashboard/fee-structure");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Add Schedule Plan to the School (POST) - ADMIN
exports.postSchedulePlanForm = async (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    //
    var addScheduleTemps = `INSERT INTO school_schedule_template(school_id, schedule_name, school_timing_from, school_timing_to, period_time, lunch_time, no_of_intervals, interval_time, no_of_periods) VALUES ('${session.school_id}', '${req.body.school_schedule_name}', '${req.body.school_start}', '${req.body.school_end}', '${req.body.school_period_time}', '${req.body.school_lunch_time}', '${req.body.school_interval_count}', '${req.body.school_interval_time}', (('${req.body.school_end}' - '${req.body.school_start}') - ('${req.body.school_lunch_time}' / 60) - (('${req.body.school_interval_count}' * '${req.body.school_interval_time}') / 60))/ ('${req.body.school_period_time}' / 60))`;
    dbcon.query(addScheduleTemps, (err, data) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      return res.redirect("/staff/dashboard/schedule-plan");
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// staff_role HM
// view all student Profile is moved to getStudentsList (Teaching staff routes)

// get Staff Profile list - route used for HM - route used for NTF
exports.getAllStaffList = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  res.locals.staff_role = session.roleId;
  let staff_role = session.roleId;
  try {
    if (staff_role == 4 || 2) {
      var staffProfileList = `SELECT * FROM school_staff WHERE school_id='${session.school_id}' AND NOT staff_id='${session.staff_id}'`;
      dbcon.query(staffProfileList, (err, staffList) => {
        if (err) throw err;
        for (let i = 0; i < staffList.length; i++) {
          switch (staffList[i].role_id) {
            case 2:
              staffList[i].role_id = "Non-teaching Faculty";
              break;
            case 4:
              staffList[i].role_id = "Head Master";
              break;
            case 8:
              staffList[i].role_id = "Teaching Faculty";
              break;
            case 9:
              staffList[i].role_id = "Admin";
              break;
            default:
              staffList[i].role_id = "Student";
          }
        }
        res.locals.staffList = staffList;
        return res.render("staffLevel/hm-view-all-staff-profile", {
          title: "View Staff Profile",
        });
      });
    } else {
      req.flash("err_msg", "You are not authorized to access this page.");
      return res.redirect("/staff/login");
    }
  } catch (err) {
    console.log(err);
  }
};

// ******** STAFF_ROLE = ADMIN ********

// ******** STAFF_ROLE = HEAD MASTER ********

// Post Subjects for the school (HM)
exports.postAddSubject = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;
    res.locals.staff_role = session.roleId;

    // checing the school_subject table for duplicate entry
    var checkSubject = `SELECT EXISTS (SELECT * FROM school_subjects WHERE subject_name='${req.body.subject}' AND school_id='${session.school_id}') AS count`;

    dbcon.query(checkSubject, (err, result) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else if (result[0].count == 0) {
        // result = 0, adding new subject
        var addSubject = `INSERT INTO school_subjects(subject_name, school_id) VALUES ('${req.body.subject}', '${session.school_id}') `;

        dbcon.query(addSubject, (err, subject) => {
          if (err) {
            return res.render("server-error", { title: "Server Error" });
          } else {
            req.flash("success", "The Subject has been added successfully.");
            return res.redirect("/staff/dashboard/subjects");
          }
        });
      } else {
        req.flash("err_msg", "The Subject is already created.");
        return res.redirect("/staff/dashboard/subjects");
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view Subjects from School dashboard HM
exports.viewSubjects = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    var subjectsData = `SELECT * FROM school_subjects WHERE school_id='${session.school_id}'`;

    dbcon.query(subjectsData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
        res.locals.data = data;
        return res.render("staffLevel/sc-subjects-hm", {
          title: "School Subjects",
        });
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// subject Staff Section mapping by HM
exports.getMapSubStaff = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    // fetching class_id, section from classroom
    var class_med_sec = `SELECT clr.id AS clr_id, clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.school_id}' ORDER BY ABS(sfs.class_std); SELECT * FROM school_subjects WHERE school_id='${session.school_id}'; SELECT * FROM school_main_login WHERE school_id='${session.school_id}' AND role_id_fk='8' AND status='Active'`;
    dbcon.query(class_med_sec, (err, tableData) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      var bridgeTableQuery = `SELECT scs.id AS map_id, scs.school_id, scs.subject_id, scs.classroom_id, ssub.subject_name, scr.class_section, scr.class_id, sfs.class_std, sfs.medium, sml.name AS staff_primary, sml2.name AS staff_secondary FROM school_class_subjects AS scs INNER JOIN school_subjects AS ssub ON ssub.id = scs.subject_id 
      INNER JOIN school_classroom AS scr ON scr.id = scs.classroom_id
      INNER JOIN school_staff AS sml ON scs.staff_id_assigned = sml.staff_id 
      INNER JOIN school_staff AS sml2 ON scs.secondary_staff_assigned = sml2.staff_id
      INNER JOIN school_feestructure AS sfs ON sfs.id = scr.class_id WHERE sfs.school_id='${session.school_id}' AND scs.deleted_at IS NULL ORDER BY ABS(sfs.class_std)`;
      dbcon.query(bridgeTableQuery, (err, result) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.tableData = tableData;
        res.locals.result = result;
        return res.render("staffLevel/sc-map-subject-staff-hm", {
          title: "Assign Staff to Subjects",
        });
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// post Map Subject Staff
exports.postMapSubStaff = async (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    var checkmapping = `SELECT EXISTS(SELECT * FROM school_class_subjects WHERE school_id='${session.school_id}' AND subject_id='${req.body.subject}' AND classroom_id='${req.body.class}') AS count`;

    dbcon.query(checkmapping, (err, isMapped) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else if (isMapped[0].count == 0) {
        var MapSubStaffSec = `INSERT INTO school_class_subjects(school_id, subject_id, classroom_id, staff_id_assigned) VALUES ('${session.school_id}', '${req.body.subject}', '${req.body.class}', '${req.body.staff}')`;

        dbcon.query(MapSubStaffSec, (err, bridgeData) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          req.flash("success", "Subject and Staff Added to the classroom.");
          return res.redirect("/staff/dashboard/section-subject-staff");
        });
      } else {
        req.flash(
          "err_msg",
          "This Subject of the Class Section is already assigned to a staff."
        );
        return res.redirect("/staff/dashboard/section-subject-staff");
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view Class Sections from school dashboard by HM
exports.viewClassSections = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    var classSecData = `SELECT clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.school_id}'`;

    dbcon.query(classSecData, (err, data) => {
      if (err) return res.render("server-error", { title: "Server Error" });

      var classDrop = `SELECT * FROM school_feestructure WHERE school_id='${session.school_id}' ORDER BY ABS(class_std);`;
      dbcon.query(classDrop, (err, classOptions) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.classOptions = classOptions;
        res.locals.data = data;
        return res.render("staffLevel/sc-classSections-hm", {
          title: "Classes & Sections",
        });
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// add class sections to the school - HM
exports.postAddClassroom = async (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;
    res.locals.staff_role = session.roleId;

    if (session.logged_in) {
      const schoolId = session.school_id;

      var classCheck = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_id='${req.body.class}' AND class_section='${req.body.section}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(classCheck, (err, data) => {
        if (err) {
          req.flash(
            "err_msg",
            "We could not create a new classroom at the moment."
          );
          return res.status(500).redirect("/staff/dashboard/sections");
        } else {
          if (data[0].count == 0) {
            const addClass = `INSERT INTO school_classroom(school_id, class_id, class_section, students_strength) VALUES ('${schoolId}', '${req.body.class}', '${req.body.section}', '${req.body.strength}');`;

            dbcon.query(addClass, function (err) {
              if (err) {
                req.flash(
                  "err_msg",
                  "There is an error when adding a classroom. Please try again later."
                );
                return res.redirect("/staff/dashboard/sections");
              } else {
                req.flash(
                  "success",
                  "A New classroom has been added to the School."
                );
                return res.redirect("/staff/dashboard/sections");
              }
            });
          } else {
            req.flash(
              "err_msg",
              "This classroom is already added to this School."
            );
            return res.redirect("/staff/dashboard/sections");
          }
        }
      });
    } else if (session.logged_in && session.schoolStatus == "Inactive") {
      req.flash(
        "err_msg",
        "The School is not yet submitted the documents yet. Please contact our customer service or Email the required documents to activate@sms.com."
      );
      return res.status(401).redirect("/school/login");
    } else {
      req.flash("err_msg", "Please login to continue.");
      return res.redirect("/school/login");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
    return res.status(500).send(err);
  }
};

// Add Big Exams and View list
exports.getAddExamsForm = (req, res) => {
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;
    res.locals.staff_role = session.roleId;
    try {
      var examList = `SELECT xam.id, xam.exam_name, xam.exam_type, sfs.class_std, sfs.medium, batch.batch_name, xam.exam_status, subj.subject_name, DATE_FORMAT(xam.exam_date, '%d-%c-%Y %H:%i') AS exam_date, xam.exam_duration, xam.sub_outoff_marks, xam.cutoff_mark, xam.exam_status FROM school_exams AS xam 
      INNER JOIN school_classroom AS clr ON clr.id = xam.exam_conducted_class_sec 
      INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id 
      INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id 
      INNER JOIN school_subjects AS subj ON subj.id = xam.subject_id
      WHERE xam.school_id = '${session.school_id}' AND xam.deleted_at IS NULL; SELECT sfs.id, sfs.class_std, sfs.medium, batch.batch_name FROM school_feestructure AS sfs INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id WHERE sfs.school_id = '${session.school_id}' AND sfs.deleted_at IS NULL ORDER BY ABS(sfs.class_std); SELECT exam_id, COUNT(received_mark) AS entries FROM school_exams_marks WHERE deleted_at IS NULL`;
      dbcon.query(examList, (err, data) => {
        if(err) throw err;
        res.locals.data = data[0];
        res.locals.classStd = data[1];
        res.locals.marks = data[2];
        return res.render('staffLevel/hm-add-exams', {title: 'Exams List'})
      })
    } catch(err) {
      console.log(err);
    }
}

// Add Big Exam POST ROUTE -
exports.addNewExam = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    let subjectCount = req.body.subject_count;
    var query = "";
    if(subjectCount > 0){
      for (let i = 1; i <= subjectCount; i++){
        var value = `('${session.school_id}', '${req.body.exam_name}', '${req.body.exam_type}', '${req.body[`sec_${i}_id`]}', '${req.body[`subject_${i}_id`]}', '${req.body[`exam_${i}_date`]}', '${req.body[`exam_${i}_duration`]}', '${req.body[`sub_${i}_total`]}', '${req.body[`cutoff_${i}_mark`]}', 'scheduled', '${session.staff_id}'),`
        query += value;
      }
    } else {
      query = ","
    }
    var query = query.slice(0,-1);
    if(query.length > 0) {
      var addExam = `INSERT INTO school_exams (school_id, exam_name, exam_type, exam_conducted_class_sec, subject_id, exam_date, exam_duration, sub_outoff_marks, cutoff_mark, exam_status, created_by) VALUES ${query}`;
      dbcon.query(addExam, (err, newExam) => {
        if(err) throw err;
        req.flash('success', 'Exams created and scheduled.');
        return res.redirect('/staff/dashboard/exams');
      })
    } else {
      req.flash('err_msg', 'No data found to be added.');
      return res.redirect('/staff/dashboard/exams')
    }
  } catch (err) {
    console.log(err);
  }
}

// Edit Exam by HM
exports.editExamByHM = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  let exam_id = req.params.exam_id;
  try {
      var editedExam = `UPDATE school_exams SET exam_date = '${req.body.exam_date_edit}', exam_duration = '${req.body.exam_duration_edit}', sub_outoff_marks = '${req.body.subj_mark_edit}', cutoff_mark = '${req.body.cutoff_mark_edit}', exam_status = '${req.body.exam_status_edit}' WHERE id = '${exam_id}'`;
      dbcon.query(editedExam, (err, updated) => {
        if(err) throw err;
        req.flash('success', 'Exam has been edited successfully');
        return res.redirect('/staff/dashboard/exams')
      })
  } catch (err) {
    console.log(err);
  }
}

// DELETE BIG Exam - Execution route
exports.deleteExamByHM = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  let exam_id = req.params.exam_id;
  try {
    if(req.body.exam_status_hidden != 'completed') {
      var delExam = `UPDATE school_exams SET deleted_at = CURRENT_TIMESTAMP WHERE id = '${exam_id}'`;
      dbcon.query(delExam, (err, unwantedExam) => {
        if(err) throw err;
        req.flash('success', 'Exam has been deleted successfully');
        return res.redirect('/staff/dashboard/exams')
      })
    } else {
      req.flash('err_msg', 'This Exam cannot be deleted.');
      return res.redirect('/staff/dashboard/exams')
    }
  } catch (err) {
    console.log(err);
  }
}

// ******** STAFF_ROLE = HEAD MASTER ********

// ******** STAFF_ROLE = NON TEACHING FACULTY ********

// * Gte staff Profile & Get student profiles linked with routes from other roles.

// Collect Fee CRUD - by NTF
exports.getFeeCollection = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    if (session.staffStatus == "Active") {
      var fee_data = `SELECT DISTINCT clr.school_id, clr.class_id, sfs.id, sfs.class_std, sfs.medium, sfs.actual_fee FROM school_classroom AS clr
      INNER JOIN school_feestructure AS sfs ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.school_id}' ORDER BY ABS(sfs.class_std);`;
      dbcon.query(fee_data, (err, feeData) => {
        if (err) return res.render("server-error", { title: "Server Error" });

        // view fee records
        var feeRecords = `SELECT * FROM school_student_admission WHERE school_id='${session.school_id}'`;
        dbcon.query(feeRecords, (err, records) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          res.locals.data = records;
          res.locals.feeData = feeData;
          return res.render("staffLevel/ntf-collect-fee", {
            title: "Fee Collection",
          });
        });
      });
    } else {
      req.flash("err_msg", "Your School is Inactive.");
      return res.redirect("/staff/dashboard");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// postFeeCollection - by NTF
exports.postFeeCollection = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;
  try {
    var selectStud = `SELECT * FROM school_main_login WHERE id='${req.body.stuId}' AND role_id_fk='1'; SELECT * FROM school_student WHERE student_id='${req.body.stuId}'`;
    dbcon.query(selectStud, (err, student) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      // admission table is for new enrollment only. So, checking if the data is already available
      var checkAdmission = `SELECT EXISTS(SELECT * FROM school_student_admission WHERE student_id='${req.body.stuId}') AS count`;
      dbcon.query(checkAdmission, (err, data) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        else if (data[0].count == 0) {
          // inserting record to school_student_admission if not available
          const payment_pending =
            req.body.actual_fee_hide - req.body.fee_paying;
          let payment_status = payment_pending == 0 ? "No Due" : "Due";

          var admissionQuery = `INSERT INTO school_student_admission(school_id, student_id, mobile_number, email, academic_year, class_medium, class_section, actual_fee, paying_amount, payment_mode, payment_status, entry_by) VALUES('${student[0][0].school_id}', '${student[0][0].id}', '${student[1][0].mobile_number}', '${student[1][0].email}', '${req.body.academic_year}', '${req.body.class_medium}', '${req.body.class_section}', '${req.body.actual_fee_hide}', '${req.body.fee_paying}', '${req.body.payment_mode}', '${payment_status}', '${session.school_id}')`;
          dbcon.query(admissionQuery, (err, respo) => {
            if (err)
              return res.render("server-error", { title: "Server Error" });
            //updating student status in main_login
            var studUpdateLogin = `UPDATE school_main_login SET status='Active' WHERE id='${student[0].id}'; UPDATE school_classroom SET students_filled=students_filled+1 WHERE id='${req.body.class_section}'`;
            dbcon.query(studUpdateLogin, (err, result) => {
              if (err)
                return res.render("server-error", { title: "Server Error" });
              req.flash("success", "Payment record added.");
              return res.redirect("/staff/dashboard/fee-collection");
            });
          });
        } else {
          req.flash(
            "err_msg",
            "This student already enrolled. Please use Due collection form instead."
          );
          return res.redirect("/staff/dashboard/fee-due-collection");
        }
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// DUE COLLECTION - by NTF
exports.allDueCollection = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  res.locals.staff_role = session.roleId;

  try {
    if (req.method == "GET") {
      // view fee collection records
      var feeCollected = `SELECT * FROM school_student_admission WHERE school_id='${session.school_id}'`;
      dbcon.query(feeCollected, (err, feeData) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.data = feeData;
        return res.render("staffLevel/sc-collect-due-ntf", {
          title: "Due Collection",
        });
      });
    } else {
      let due_amount =
        req.body.course_fee - req.body.paid_fee_hide - req.body.paying_fee;
      let due_status = due_amount == 0 ? "No Due" : "Due";

      var dueColl = `INSERT INTO school_student_feedue(school_id, student_id, admission_id, actual_fee, currently_paying, payment_mode, due_status) VALUES ('${session.school_id}', '${req.body.stuId_due}', '${req.body.admission_id}', '${req.body.course_fee}', '${req.body.paying_fee}', '${req.body.payment_mode}', '${due_status}')`;
      dbcon.query(dueColl, (err, result) => {
        if (err) return res.render("server-error", { title: "Server Error" });

        var updateAdmisFee = `UPDATE school_student_admission SET paying_amount = paying_amount+'${req.body.paying_fee}', payment_status ='${due_status}' WHERE id='${req.body.admission_id}'`;
        dbcon.query(updateAdmisFee, (err, updated) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          else {
            req.flash("success", "Fee updated successfully.");
            return res.redirect(
              "/staff/dashboard/fee-due-collection?_method=GET&status=success"
            );
          }
        });
      });
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// ******** STAFF_ROLE = NON TEACHING FACULTY ********
