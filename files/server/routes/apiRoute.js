const express = require("express");
const apiRouter = express.Router();
const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const con = require("../config/database");

apiRouter.post("/get-class-sections", (req, res) => {
  var getclassection =
    'SELECT *, (students_strength - students_filled) AS seats_free FROM school_classroom WHERE class_id= "' +
    req.body.class_id +
    '" AND students_strength - students_filled != "0"';
  dbcon.query(getclassection, (err, rows) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({
        msg: "success",
        class_secs: rows,
      });
    }
  });
});

apiRouter.post("/get-class-fee", (req, res) => {
  var getclassfee =
    'SELECT * FROM school_feestructure WHERE id= "' + req.body.class_id + '"';
  dbcon.query(getclassfee, (err, row) => {
    if (err) {
      res.json({ msg: "error", err });
    } else {
      res.json({
        msg: "success",
        class_fee: row[0].actual_fee,
      });
    }
  });
});

apiRouter.post("/get-paid-amount", (req, res) => {
  var getPaidAmount = `SELECT paying_amount FROM school_student_admission WHERE student_id="${req.body.student_id}" AND academic_year="${req.body.academic_year}" AND class_medium="${req.body.class_id}"`;
  dbcon.query(getPaidAmount, (err, result) => {
    if (err) {
      res.json({ msg: "error", err });
    } else {
      let amountPaid = 0;
      for (let i = 0; i < result.length; i++) {
        amountPaid = amountPaid + result[i].paying_amount;
      }
      res.json({
        msg: "success",
        amount_earlier_paid: amountPaid,
      });
    }
  });
});

apiRouter.post("/get-student-data", (req, res) => {
  var getStudent = `SELECT name, mobile_number, email FROM school_student WHERE student_id='${req.body.stuId}'`;
  dbcon.query(getStudent, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        student_name: data[0].name,
        student_mobile: data[0].mobile_number,
        student_email: data[0].email,
      });
    } else {
      res.json({ msg: "error" });
    }
  });
});

// student enrolled data
apiRouter.post("/get-student-enrollment-data", (req, res) => {
  var getStudent = `SELECT ssa.student_id, stu.name, stu.email, stu.mobile_number, ssa.id, ssa.academic_year, ssa.paying_amount, sfs.actual_fee, sfs.class_std, sfs.medium, clr.class_section FROM school_student_admission AS ssa INNER JOIN school_feestructure AS sfs ON sfs.id = ssa.class_medium INNER JOIN school_classroom AS clr ON clr.id = ssa.class_section INNER JOIN school_student AS stu ON stu.student_id = ssa.student_id WHERE ssa.student_id='${req.body.stuId}'`;
  dbcon.query(getStudent, (err, data) => {
    if (err) {
      res.json({ msg: "error", err });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        admission_id: data[0].id,
        student_name: data[0].name,
        student_mobile: data[0].mobile_number,
        student_email: data[0].email,
        academic_year: data[0].academic_year,
        class_std: data[0].class_std,
        class_med: data[0].medium,
        class_sec: data[0].class_section,
        actual_fee: data[0].actual_fee,
        earlier_paid: data[0].paying_amount,
      });
    } else {
      res.json({ msg: "error", err });
    }
  });
});

// get One student Profile data
apiRouter.post("/get-one-student-profile", (req, res) => {
  var getStudent = `SELECT * FROM school_student WHERE student_id='${req.body.student_id}'`;
  dbcon.query(getStudent, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        student: data,
      });
    } else {
      res.json({ msg: "error" });
    }
  });
});

// get One Staff Profile data
apiRouter.post("/get-one-staff-profile", (req, res) => {
  var getStaff = `SELECT * FROM school_staff WHERE staff_id='${req.body.staff_id}'`;
  dbcon.query(getStaff, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        staff: data,
      });
    } else {
      res.json({ msg: "error" });
    }
  });
});

// edit fee structure class-medium (GET)
apiRouter.post("/edit-class-medium-fee", (req, res) => {
  var getFeeData = `SELECT * FROM school_feestructure WHERE id='${req.body.class_medium_id}'`;

  dbcon.query(getFeeData, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        feeRow: data,
      });
    } else {
      res.json({ msg: "No Data found." });
    }
  });
});

// delete fee structure class-medium (GET)
apiRouter.post("/delete-class-medium-fee", (req, res) => {
  var classMedium = `SELECT * FROM school_feestructure WHERE id='${req.body.class_medium_id}'`;
  dbcon.query(classMedium, (err, sections) => {
    if (err) res.json({ msg: "error", err });
    else if (sections[0].count != 0) {
      res.json({
        msg: "success",
        sections: sections,
      });
    } else {
      res.json({ msg: "NO Data found", err });
    }
  });
});

// get EDIT USER ACCOUNT Modal for Admin and School
apiRouter.post("/get-edit-user-account", (req, res) => {
  var UserAccData = `SELECT sml.username, sml.email, sml.status, srol.role_name, sml.role_id_fk FROM school_main_login AS sml INNER JOIN school_role AS srol ON sml.role_id_fk = srol.id WHERE sml.id='${req.body.staff_id}'`;
  dbcon.query(UserAccData, (err, userData) => {
    if (err) res.json({ msg: "error", err });
    else if (userData.length >= 0) {
      res.json({ msg: "success", userData: userData });
    } else {
      res.json({ msg: "Profile not created yet." });
    }
  });
});

// GET Delete user account modal for school alone
apiRouter.post("/delete-user-account", (req, res) => {
  var userLoginData = `SELECT * FROM school_main_login WHERE id='${req.body.user_id}'`;
  dbcon.query(userLoginData, (err, userLogin) => {
    if (err) res.json({ msg: "error", err });
    else {
      res.json({ msg: "success", userLogin: userLogin });
    }
  });
});

// get Schedule Periods from schedule_template
apiRouter.post("/get-periods-from-schedule-template", (req, res) => {
  var periods = `SELECT * FROM schedule_temp_2 WHERE id='${req.body.schedule_temp_id}'; SELECT scs.subject_id, sub.subject_name, scs.classroom_id, scs.staff_id_assigned, ssf.name FROM school_class_subjects AS scs INNER JOIN school_subjects AS sub ON sub.id=scs.subject_id INNER JOIN school_staff AS ssf ON ssf.staff_id=scs.staff_id_assigned WHERE scs.classroom_id = '${req.body.class_sec_id}'`;
  dbcon.query(periods, (err, periodNos) => {
    if (err) res.json({ msg: "error", err });
    else {
      res.json({
        msg: "success",
        periods: periodNos[0],
        subjects: periodNos[1],
      });
    }
  });
});

//get subjects associated with the class section to add schedule
apiRouter.post("/get-staff-assigned-to-subject", (req, res) => {
  var subjects = `SELECT scs.subject_id, subj.subject_name, scs.staff_id_assigned, scs.classroom_id, sst.name FROM school_class_subjects AS scs INNER JOIN school_subjects AS subj ON subj.id=scs.subject_id INNER JOIN school_staff AS sst ON sst.staff_id = scs.staff_id_assigned WHERE scs.classroom_id='${req.body.class_sec_id}' AND subj.id='${req.body.subject_id}'`;
  // var subjects = `SELECT scs.subject_id, sub.subject_name, scs.classroom_id, scs.staff_id_assigned, ssf.name FROM school_class_subjects AS scs INNER JOIN school_subjects AS sub ON sub.id=scs.subject_id INNER JOIN school_staff AS ssf ON ssf.staff_id=scs.staff_id_assigned WHERE scs.classroom_id = '${req.body.class_sec_id}' AND scs.subject_id = '${req.body.subject_id}'`;
  dbcon.query(subjects, (err, staffNames) => {
    if (err) res.json({ msg: "error", err });
    else if (subjects.length > 0) {
      console.log(staffNames);
      res.json({ msg: "success", staff: staffNames });
    } else {
      res.json({ msg: "No subjects found" });
    }
  });
});

// // student getting his admission details from admission & feedue tables
// apiRouter.post("/get-stu-own-admission-records", (req, res) => {
//   // checking student_admission table
//   var stuAdmiData = `SELECT * FROM school_student_admission WHERE student_id='${req.body.stuId}'`;
//   dbcon.query(stuAdmiData, (err, admisRow) => {
//     if (err) {
//       res.json({ msg: "error", err });
//     } else if (admisRow.length != 0) {
//       console.log(admisRow);
//     } else {
//       console.log(admisRow);
//     }
//   });
// });

module.exports = apiRouter;
