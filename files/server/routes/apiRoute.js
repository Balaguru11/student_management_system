const express = require("express");
const apiRouter = express.Router();
const session = require("express-session");
const dbcon = require("../DB/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

apiRouter.post("/get-class-sections", (req, res) => {
  var getclassection =
    'SELECT *, (students_strength - students_filled) AS seats_free FROM school_classroom WHERE class_id= "' +
    req.body.class_id + '" AND students_strength - students_filled != "0"';
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
    'SELECT actual_fee FROM school_feestructure WHERE id= "' +
    req.body.class_id +
    '"';
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
    } else {
      console.log(data)
      res.json({ msg: "success", student_name: data[0].name, student_mobile: data[0].mobile_number, student_email: data[0].email });
    }
  });
});

module.exports = apiRouter;