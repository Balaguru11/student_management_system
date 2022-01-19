const express = require("express");
const schoolActivate = express.Router();
const dbcon = require("../config/database");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const { isSchool } = require("../middlewares/auth");
const payUMoney = require("payumoney_nodejs");

schoolActivate.get("/school", (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  //for header menu
  res.locals.schoolUserName = session.schoolUserName;
  res.locals.schoolStatus = session.schoolStatus;
  res.locals.logged_in = session.logged_in;
  return res.render("partials/components/school-inactive", {
    title: "Product Activation",
    layout: "./layouts/home_layout",
  });
});

schoolActivate.post("/school", (req, res) => {
  try {
    let session = req.session;
    const code = req.body.activation;
    if (session.schoolStatus == "Inactive") {
      var checkActive = `SELECT * FROM school_activate WHERE school_id='${session.schoolId}'`;

      dbcon.query(checkActive, (err, data) => {
        if (err) {
          throw err;
        } else if (code == "") {
          req.flash("err_msg", "Please enter the Correct Activation Code.");
          return res.status(200).redirect("/activate/school");
        } else if (data[0].activate_match_g === code) {
          var changeStatus = `UPDATE school_add_school SET status='Active' WHERE id='${schoolId}'`;
          dbcon.query(changeStatus, function (err, result) {
            if (err) {
              return res.render("server-error", { title: "Server Error" });
            } else {
              req.flash("success", "Activation Success. Please Login again.");
              return res.status(200).redirect("/school/login");
            }
          });
        } else {
          req.flash("err_msg", "Activation failed.");
          return res.status(500).redirect("/activate/school");
        }
      });
    } else {
      req.flash(
        "welcome",
        `Hi ${session.schoolUserName}, How are you doing today?`
      );
      return res.status(200).redirect("/school/dashboard");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
});

schoolActivate.get("/school-activation-request", (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  if (session.logged_in) {
    return res.render("schoolLevel/activation-form", {
      title: "School Activation Form",
      layout: "./layouts/home_layout",
    });
  } else {
    req.flash("err_msg", "Please login to continue.");
    return res.redirect("/school/login");
  }
});

schoolActivate.post("/school-activation-request", (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    if (session.logged_in) {
      var registeredEmail = `SELECT EXISTS (SELECT * FROM school_add_school WHERE email='${req.body.email}' AND id='${session.schoolId}') AS count; SELECT EXISTS (SELECT * FROM school_activate_payment WHERE school_email='${req.body.email}' AND pay_status='Paid') AS count2`;
      dbcon.query(registeredEmail, (err, email) => {
        if (err) {
          throw err;
        } else if (email[0][0].count == 1 && email[1][0].count2 == 0) {
          // cehck Registered Email Id
          var paymentPending = `INSERT INTO school_activate_payment(school_email, plan, pay_status) VALUES ('${req.body.email}', '${req.body.plan}', 'Declined')`;
          dbcon.query(paymentPending, (err, paymentInitiated) => {
            if (err) throw err;
            // Payment Progress is to be added here.

            const body = {
              amount: 100,
              email: `${req.body.email}`,
              txnid: "sc2021001",
              productinfo: "Activation",
              surl: "http://localhost:8005/activate/school-payment-success",
              furl: "http://localhost:8005/activate/school-payment-failure",
            };
            payUMoney.pay(body, (error, response) => {
              if (error) throw error;
              console.log(response);
              // return response;
              return null, { payulink: response };
            });

            req.flash("success", "Payment is Initiated.");
            return res.redirect("/activate/school-activation-request");
          });
        } else {
          req.flash("err_msg", "Email is not a Registered one.");
          return res.redirect("/activate/school-activation-request");
        }
      });
    } else {
      req.flash("err_msg", "Please login to continue.");
      return res.redirect("/school/login");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
});

// payment - success
schoolActivate.post("/activate/school-payment-success", (req, res) => {
  console.log("Payment is Success");
});

schoolActivate.post("/activate/school-payment-failure", (req, res) => {
  console.log("Payment is failed");
});

module.exports = schoolActivate;
