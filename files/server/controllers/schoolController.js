// import required models here

const session = require("express-session");
const dbcon = require("../DB/database");
const bcrypt = require("bcrypt");
const Str = require("@supercharge/strings");
const flash = require("connect-flash");

exports.getCreateSchool = (req, res) => {
  err_msg = req.params.err_msg;
  success_msg = req.params.success_msg;
  res.render("schoolLevel/school-create", {
    title: "Add a School",
    err_msg,
    success_msg,
  });
};

exports.postCreateSchool = async (req, res) => {
  let err_msg = "";
  // let success_msg = "";

  try {
    var check = `SELECT EXISTS (SELECT * FROM school_add_school WHERE email='${req.body.email}') AS count`;
    //res >> 0 / 1

    dbcon.query(check, (err, data) => {
      if (err) {
        err_msg = "There is an error with Database connection.";
        return res.redirect("school/create/?err_msg=" + err_msg);
      } else {
        if (data[0].count == 0) {
          const passwordEntered = req.body.schoolPassword;

          const passwordHash = bcrypt.hashSync(`${passwordEntered}`, 10);

          const sql = `INSERT INTO school_add_school(school_name, board, email, city, school_login, school_secrete, status) VALUES ('${req.body.schoolName}', '${req.body.board}', '${req.body.email}', '${req.body.schoolLocation}', '${req.body.schoolUserName}', '${passwordHash}', 'Inactive');`;

          dbcon.query(sql, function (err, result) {
            if (err) {
              err_msg = "There is an error when adding new school";
              return res.render("schoolLevel/school-create", {
                title: "Add a School",
                err_msg: err_msg,
              });
            } else {
              let session = req.session;
              session.schoolId = result.insertId;
              const act_string = Str.random(50);
              const activationQuery = `INSERT INTO school_activate(school_id, activate_match_g) VALUES('${session.schoolId}', '${act_string}')`;
              dbcon.query(activationQuery, function (err) {
                if (err) {
                  console.log(err);
                  err_msg = "There is an error when adding new school";
                  return res.render("schoolLevel/school-create", {
                    title: "Add a School",
                    err_msg: err_msg,
                  });
                } else {
                  req.flash(
                    "success",
                    "The school has been added successfully. Please Login & Submit your Product Activation code to start using it."
                  );
                  return res.status(200).redirect("/school/login");
                }
              });
            }
          });
        } else {
          err_msg = "This School is already registered.";
          return res.render("schoolLevel/school-create", {
            title: "Add a School",
            err_msg: err_msg,
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

exports.getSchoolLogin = (req, res) => {
  let success_msg = "";
  err_msg = req.params.err_msg;
  success_msg = req.flash("success");
  console.log(success_msg);
  req.locals.success_msg = success_msg;
  res.render("schoolLevel/school-login", {
    title: "School Master Login",
    err_msg,
  });
};

exports.postSchoolLogin = async (req, res) => {
  try {
    let err_msg = "";
    var loginQuery = `SELECT * FROM school_add_school WHERE school_login='${req.body.schoolUserName}'`;
    dbcon.query(loginQuery, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length == 1) {
        const passwordEntered = req.body.schoolPassword;
        const school_pass = result[0].school_secrete;
        const verified = bcrypt.compareSync(
          `${passwordEntered}`,
          `${school_pass}`
        );
        if (verified) {
          let session = req.session;
          session.schoolUserName = req.body.schoolUserName;
          session.schoolId = result[0].id;
          session.schoolStatus = result[0].status;
          session.logged_in = true;
          res.status(200).redirect("/school/dashboard");
        } else {
          err_msg = "Credentials entered doesnot match.";
          return res.status(401).render("schoolLevel/school-login", {
            title: "School Master Login",
            err_msg: err_msg,
          });
        }
      } else {
        res.send("No School found.");
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

exports.getSchoolDashBoard = (req, res) => {
  try {
    let session = req.session;
    let inactive_msg = "";
    if (session.logged_in && session.schoolStatus == "Active") {
      res.render("schoolLevel/school-dashboard", {
        title: "School Master Dashboard",
      });
    } else if (session.logged_in && session.schoolStatus == "Inactive") {
      inactive_msg = "Please Provide activation code.";
      res.render("schoolLevel/school-dashboard", {
        title: "School Master Dashboard",
        inactive_msg: inactive_msg,
      });
    } else {
      err_msg = "You are unauthorized. Please login.";
      return res.status(401).redirect("/school/login");
    }
  } catch (e) {
    console.log(e);
  }
};

exports.postAddClassroom = async (req, res) => {
  let err_msg = "";
  let success_msg = "";

  try {
    let session = req.session;

    if (session.logged_in && session.schoolStatus == "Active") {
      const schoolId = session.schoolId;

      var classCheck = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_section='${req.body.class_section}' AND medium='${req.body.medium}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(classCheck, (err, data) => {
        if (err) {
          err_msg = "We could not create a new classroom at the moment.";
          return res.status(500).render("schoolLevel/school-dashboard", {
            title: "School Master Dashboard",
            err_msg: err_msg,
          });
        } else {
          if (data[0].count == 0) {
            const addClass = `INSERT INTO school_classroom(school_id, class_section, medium, students_strength) VALUES ('${schoolId}', '${req.body.class_section}', '${req.body.medium}', '${req.body.strength}');`;

            dbcon.query(addClass, function (err) {
              if (err) {
                err_msg =
                  "There is an error when adding a classroom. Please try again later.";
                return res.status(500).render("schoolLevel/school-dashboard", {
                  title: "School Master Dashboard",
                  err_msg: err_msg,
                });
              } else {
                success_msg =
                  "A New classroom has been added. You can enroll and add students to this class.";
                return res.status(200).render("schoolLevel/school-dashboard", {
                  title: "School Master Dashboard",
                  success_msg,
                });
              }
            });
          } else {
            err_msg = "This classroom is already added to this School.";
            return res.render("schoolLevel/school-dashboard", {
              title: "School Master Dashboard",
              err_msg: err_msg,
            });
          }
        }
      });
    } else {
      err_msg =
        "The School is not yet submitted the documents yet. Please contact our customer service or Email the required documents to activate@sms.com.";
      return res.status(401).redirect("/school/login");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//WORKIMNG ON THIS ONE
// Schools can add users when, it is active.
exports.postAddUser = async (req, res) => {
  let err_msg = "";
  let success_msg = "";

  try {
    let session = req.session;

    if (session.logged_in && session.schoolStatus == "Active") {
      const schoolId = session.schoolId;

      var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' OR email='${req.body.email}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(userCheck, (err, data) => {
        if (err) {
          console.log(err);
          //   err_msg = "We could not add new user at the moment.";
          //   return res.status(500).render("schoolLevel/school-dashboard", {
          //     title: "School Master Dashboard",
          //     err_msg: err_msg,
          //   });
        } else {
          if (data[0].count == 0) {
            const addClass = `INSERT INTO school_main_login(school_id, role_id_fk, username, password, email, status) VALUES ('${schoolId}', '${req.body.role}', '${req.body.username}', '${req.body.password}', '${req.body.email}', 'Inactive');`;

            dbcon.query(addClass, function (err) {
              if (err) {
                console.log(err);
                // err_msg = "There is an error when adding an user. Please try again later.";
                // return res.status(500).render('schoolLevel/school-dashboard', { title: 'School Master Dashboard', err_msg: err_msg });
              } else {
                success_msg = "A New User account has been added.";
                return res.status(200).render("schoolLevel/school-dashboard", {
                  title: "School Master Dashboard",
                  success_msg,
                });
              }
            });
          } else {
            err_msg =
              "This Username / email is already registered with this School.";
            return res.render("schoolLevel/school-dashboard", {
              title: "School Master Dashboard",
              err_msg: err_msg,
            });
          }
        }
      });
    } else {
      err_msg =
        "The school is unauthorized to do this action. Please Activate the school by submitting purchase details to support@sms.com";
      return res.status(401).redirect("/school/login");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
