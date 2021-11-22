// import required models here

const session = require("express-session");
const dbcon = require("../DB/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

exports.getCreateSchool = (req, res) => {
  // flash err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  //flash success_msg - not coming from anywhere
  // let success_msg = "";
  // success_msg = req.flash("success");
  // res.lcoals.success_msg = success_msg;
  // rendering with message
  res.render("schoolLevel/school-create", {
    title: "Add a School",
  });
};

exports.postCreateSchool = async (req, res) => {
  try {
    var check = `SELECT EXISTS (SELECT * FROM school_add_school WHERE email='${req.body.email}') AS count`;
    //res >> 0 / 1

    dbcon.query(check, (err, data) => {
      if (err) {
        console.log(err);
        req.flash("err_msg", "There is an error with Database connection.");
        return res.redirect("school/create");
      } else {
        if (data[0].count == 0) {
          // passord hashing
          const passwordEntered = req.body.schoolPassword;
          const passwordHash = bcrypt.hashSync(`${passwordEntered}`, 10);

          const sql = `INSERT INTO school_add_school(school_name, board, email, city, school_login, school_secrete, status) VALUES ('${req.body.schoolName}', '${req.body.board}', '${req.body.email}', '${req.body.schoolLocation}', '${req.body.schoolUserName}', '${passwordHash}', 'Inactive');`;

          dbcon.query(sql, function (err, result) {
            if (err) {
              console.log(err);
              req.flash("err_msg", "There is an error when adding new school");
              return res.redirect("/school/create");
            } else {
              let session = req.session;
              session.schoolId = result.insertId;
              const act_string = Str.random(50);
              const activationQuery = `INSERT INTO school_activate(school_id, activate_match_g) VALUES('${session.schoolId}', '${act_string}')`;
              dbcon.query(activationQuery, function (err) {
                if (err) {
                  console.log(err);
                  req.flash(
                    "err_msg",
                    "There is an error when creating Activation Code for your school"
                  );
                  return res.redirect("/school/create");
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
          req.flash("err_msg", "This School is already registered.");
          return res.redirect("/school/create");
        }
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

exports.getSchoolLogin = (req, res) => {
  //flash err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  //flash success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  //flash success_msg
  let inactive_msg = "";
  inactive_msg = req.flash("inactive_msg");
  res.locals.inactive_msg = inactive_msg;
  //rendering login page with message
  let session = req.session;
  console.log(session);

  if (session.logged_in) {
    res.redirect("/school/dashboard");
  } else {
    res.render("schoolLevel/school-login", {
      title: "School Master Login",
    });
  }
};

exports.postSchoolLogin = async (req, res) => {
  try {
    var loginQuery = `SELECT * FROM school_add_school WHERE school_login='${req.body.schoolUserName}'`;
    dbcon.query(loginQuery, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length == 1) {
        //password verification
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
          req.flash(
            "welcome",
            `Hi ${session.schoolUserName}, How are you doing today?`
          );
          res.status(200).redirect("/school/dashboard");
        } else {
          req.flash("err_msg", "Credentials entered doesnot match.");
          return res.status(401).redirect("/school/login");
        }
      } else {
        req.flash("err_msg", "No School found");
        return res.status(401).redirect("/school/login");
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
    //flashing welcome message
    let welcome_msg = "";
    welcome_msg = req.flash("welcome");
    res.locals.welcome_msg = welcome_msg;
    // // flashing inactive_msg
    // let inactive_msg = "";
    // inactive_msg = req.flash("inactive_msg");
    // res.locals.inactive_msg = inactive_msg;
    //flashing err_msg
    let err_msg = "";
    err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = "";
    success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    //status flashing
    let status = "";
    status = req.session.schoolStatus;
    res.locals.status = status;

    if (session.logged_in && session.schoolStatus == "Active") {
      res.render("schoolLevel/school-dashboard", {
        title: "School Master Dashboard",
      });
    } else if (session.logged_in && session.schoolStatus == "Inactive") {
      res.render("schoolLevel/school-dashboard", {
        title: "School Master Dashboard",
      });
    } else {
      req.flash("err_msg", "You are unauthorized. Please login.");
      return res.status(401).redirect("/school/login");
    }
  } catch (e) {
    console.log(e);
  }
};

exports.postAddClassroom = async (req, res) => {
  try {
    let session = req.session;

    if (session.logged_in && session.schoolStatus == "Active") {
      const schoolId = session.schoolId;

      var classCheck = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_section='${req.body.class_section}' AND medium='${req.body.medium}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(classCheck, (err, data) => {
        if (err) {
          req.flash(
            "err_msg",
            "We could not create a new classroom at the moment."
          );
          return res.status(500).redirect("/school/dashboard");
        } else {
          if (data[0].count == 0) {
            const addClass = `INSERT INTO school_classroom(school_id, class_section, medium, students_strength) VALUES ('${schoolId}', '${req.body.class_section}', '${req.body.medium}', '${req.body.strength}');`;

            dbcon.query(addClass, function (err) {
              if (err) {
                req.flash(
                  "err_msg",
                  "There is an error when adding a classroom. Please try again later."
                );
                return res.redirect("/school/school-dashboard");
              } else {
                req.flash(
                  "success",
                  "A New classroom has been added. You can enroll and add students to this class."
                );
                return res.redirect("/school/dashboard");
              }
            });
          } else {
            req.flash(
              "err_msg",
              "This classroom is already added to this School."
            );
            return res.redirect("/school/dashboard");
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
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

// Schools can add users when, it is active.
exports.postAddUser = async (req, res) => {
  try {
    let session = req.session;

    if (session.logged_in && session.schoolStatus == "Active") {
      const schoolId = session.schoolId;

      var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' OR email='${req.body.email}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(userCheck, (err, data) => {
        if (err) {
          console.log(err);
          req.flash("err_msg", "We could not add new user at the moment.");
          return res.redirect("/school/dashboard");
        } else {
          if (data[0].count == 0) {
            // password hashing
            const userPassword = req.body.password;
            const hashedPass = bcrypt.hashSync(`${userPassword}`, 10);

            const addClass = `INSERT INTO school_main_login(school_id, role_id_fk, username, password, email, status) VALUES ('${schoolId}', '${req.body.role}', '${req.body.username}', '${hashedPass}', '${req.body.email}', 'Inactive');`;

            dbcon.query(addClass, function (err) {
              if (err) {
                console.log(err);
                req.flash(
                  "err_msg",
                  "There is an error when adding an user. Please try again later."
                );
                return res.redirect("/school/dashboard");
              } else {
                req.flash("success", "A New User account has been added.");
                return res.redirect("/school/dashboard");
              }
            });
          } else {
            req.flash(
              "err_msg",
              "This Username / email is already registered with this School."
            );
            return res.redirect("/school/dashboard");
          }
        }
      });
    } else if (session.logged_in && session.schoolStatus == "Inactive") {
      req.flash(
        "err_msg",
        "The school is unauthorized to do this action. Please Activate the school by submitting purchase details to support@sms.com"
      );
      return res.status(401).redirect("/school/dashboard");
    } else {
      req.flash("err_msg", "Please Login to continue.");
      return res.status(401).redirect("/school/login");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

// Post Subjects for the school
exports.postAddSubject = (req, res) => {
  try {
    let session = req.session;
    console.log(session);

    // checing the school_subject table for duplicate entry
    var checkSubject = `SELECT EXISTS (SELECT * FROM school_subjects WHERE subject_name='${req.body.subject}' AND school_id='${session.schoolId}') AS count`;

    dbcon.query(checkSubject, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result[0].count == 0) {
        console.log();
        // result = 0, adding new subject
        var addSubject = `INSERT INTO school_subjects(subject_name, school_id) VALUES ('${req.body.subject}', '${session.schoolId}') `;

        dbcon.query(addSubject, (err, subject) => {
          if (err) {
            console.log(err);
          } else {
            console.log(subject);
            req.flash("success", "The Subject has been added successfully.");
            return res.redirect("/school/dashboard");
          }
        });
      } else {
        req.flash("err_msg", "The Subject is already created.");
        return res.redirect("/school/dashboard");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

//get classroom from database
