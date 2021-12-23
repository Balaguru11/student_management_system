// import required models here
const Str = require("@supercharge/strings");
const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const sendMail = require("../config/email.config");

exports.getCreateSchool = (req, res) => {
  // flash err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
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
        return res.render("server-error", { title: "Server Error" });
      } else {
        if (data[0].count == 0) {
          // passord hashing
          const passwordEntered = req.body.schoolPassword;
          const passwordHash = bcrypt.hashSync(`${passwordEntered}`, 10);

          const sql = `INSERT INTO school_add_school(school_name, board, email, city, school_login, school_secrete, status) VALUES ('${req.body.schoolName}', '${req.body.board}', '${req.body.email}', '${req.body.schoolLocation}', '${req.body.schoolUserName}', '${passwordHash}', 'Inactive');`;

          dbcon.query(sql, function (err, result) {
            if (err) {
              req.flash("err_msg", "There is an error when adding new school");
              return res.redirect("/school/create");
            } else {
              let session = req.session;
              session.schoolId = result.insertId;
              const act_string = Str.random(50);
              const activationQuery = `INSERT INTO school_activate(school_id, activate_match_g) VALUES('${session.schoolId}', '${act_string}')`;
              dbcon.query(activationQuery, function (err) {
                if (err) {
                  req.flash(
                    "err_msg",
                    "There is an error when creating Activation Code for your school"
                  );
                  return res.redirect("/school/create");
                } else {
                  // send a mail here.
                  const mail = sendMail({
                    from: process.env.MAIL_USERNAME,
                    to: req.body.email,
                    subject: "School Created.",
                    html: `<p>School Username: ${req.body.schoolName}</p>`,
                  })
                    .then((result) => {
                      console.log("Mail has been sent");
                    })
                    .catch((err) => {
                      return res.render("server-error", {
                        title: "Server Error",
                      });
                    });

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
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

exports.getSchoolLogin = (req, res) => {
  //flash err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  //flash success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  //flash success_msg
  let inactive_msg = "";
  inactive_msg = req.flash("inactive_msg");
  res.locals.inactive_msg = inactive_msg;
  //rendering login page with message
  let session = req.session;

  if (session.logged_in) {
    res.redirect("/school/dashboard");
  } else {
    res.render("schoolLevel/school-login", {
      title: "School Master Login",
      layout: "./layouts/home_layout",
    });
  }
};

exports.postSchoolLogin = async (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    var loginQuery = `SELECT * FROM school_add_school WHERE school_login='${req.body.schoolUserName}'`;
    dbcon.query(loginQuery, function (err, result) {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
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
          session.schoolPwd = result[0].school_secrete;
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
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view Dashboard after login
exports.getSchoolDashBoard = (req, res) => {
  try {
    let session = req.session;
    //flashing welcome message
    let welcome_msg = req.flash("welcome");
    res.locals.welcome_msg = welcome_msg;
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    //status flashing
    let status = "";
    status = req.session.schoolStatus;
    res.locals.status = status;

    if (session.logged_in && session.schoolStatus == "Active") {
      var countData = `SELECT * FROM school_classroom WHERE school_id='${session.schoolId}'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Active' AND role_id_fk='8'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Inactive' AND role_id_fk='8'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Active' AND role_id_fk='1'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Inactive' AND role_id_fk='1'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='2'; SELECT * FROM school_subjects WHERE school_id='${session.schoolId}'; SELECT school_name FROM school_add_school WHERE id='${session.schoolId}'`;

      dbcon.query(countData, (err, countNos) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.countNos = countNos;
        res.render("schoolLevel/school-dashboard", {
          title: "School Master Dashboard",
        });
      });
    } else if (session.logged_in && session.schoolStatus == "Inactive") {
      return res.redirect("/activate/school");
    } else {
      req.flash("err_msg", "You are unauthorized. Please login.");
      return res.status(401).redirect("/school/login");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// school adds class section
exports.postAddClassroom = async (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;

    let session = req.session;

    if (session.logged_in && session.schoolStatus == "Active") {
      const schoolId = session.schoolId;

      var classCheck = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_id='${req.body.class}' AND class_section='${req.body.section}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(classCheck, (err, data) => {
        if (err) {
          req.flash(
            "err_msg",
            "We could not create a new classroom at the moment."
          );
          return res.status(500).redirect("/school/dashboard/sections");
        } else {
          if (data[0].count == 0) {
            const addClass = `INSERT INTO school_classroom(school_id, class_id, class_section, students_strength) VALUES ('${schoolId}', '${req.body.class}', '${req.body.section}', '${req.body.strength}');`;

            dbcon.query(addClass, function (err) {
              if (err) {
                req.flash(
                  "err_msg",
                  "There is an error when adding a classroom. Please try again later."
                );
                return res.redirect("/school/dashboard/sections");
              } else {
                req.flash(
                  "success",
                  "A New classroom has been added. You can enroll and add students to this class."
                );
                return res.redirect("/school/dashboard/sections");
              }
            });
          } else {
            req.flash(
              "err_msg",
              "This classroom is already added to this School."
            );
            return res.redirect("/school/dashboard/sections");
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

// Schools can add users when, it is active.
exports.postAddUser = async (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;

    if (session.logged_in && session.schoolStatus == "Active") {
      const schoolId = session.schoolId;

      var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' OR email='${req.body.email}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(userCheck, (err, data) => {
        if (err) {
          req.flash("err_msg", "We could not add new user at the moment.");
          return res.redirect("/school/dashboard/users");
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
                return res.redirect("/school/dashboard/users");
              } else {
                req.flash("success", "A New User account has been added.");
                return res.redirect("/school/dashboard/users");
              }
            });
          } else {
            req.flash(
              "err_msg",
              "This Username / email is already registered with this School."
            );
            return res.redirect("/school/dashboard/users");
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
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
    return res.status(500).send(err);
  }
};

// Post Subjects for the school
exports.postAddSubject = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;

    // checing the school_subject table for duplicate entry
    var checkSubject = `SELECT EXISTS (SELECT * FROM school_subjects WHERE subject_name='${req.body.subject}' AND school_id='${session.schoolId}') AS count`;

    dbcon.query(checkSubject, (err, result) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else if (result[0].count == 0) {
        // result = 0, adding new subject
        var addSubject = `INSERT INTO school_subjects(subject_name, school_id) VALUES ('${req.body.subject}', '${session.schoolId}') `;

        dbcon.query(addSubject, (err, subject) => {
          if (err) {
            return res.render("server-error", { title: "Server Error" });
          } else {
            req.flash("success", "The Subject has been added successfully.");
            return res.redirect("/school/dashboard/subjects");
          }
        });
      } else {
        req.flash("err_msg", "The Subject is already created.");
        return res.redirect("/school/dashboard/subjects");
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Add fee Struture by School
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
      const school_id = session.schoolId;
      const class_std = req.body.class_std;
      const medium = req.body.medium;
      const actual_fee = req.body.fee;

      var feeQuery = `SELECT EXISTS (SELECT * FROM school_feestructure WHERE school_id='${school_id}'AND class_std='${class_std}' AND medium='${medium}') AS count`;

      dbcon.query(feeQuery, (err, data) => {
        if (err) {
          return res.render("server-error", { title: "Server Error" });
        } else if (data[0].count == 0) {
          var addFeeQuery = `INSERT INTO school_feestructure(school_id, class_std, medium, actual_fee) VALUES ('${school_id}', '${class_std}', '${medium}', '${actual_fee}')`;
          dbcon.query(addFeeQuery, (err, response) => {
            if (err) {
              return res.render("server-error", { title: "Server Error" });
            } else {
              req.flash(
                "success",
                `Fee structure for ${class_std} STD - ${medium} Medium is added successfully.`
              );
              return res.redirect("/school/dashboard/fee-structure");
            }
          });
        } else {
          req.flash(
            "err_msg",
            `Fee structure for ${class_std} STD - ${medium} Medium is already added.`
          );
          return res.redirect("/school/dashboard/subjects");
        }
      });
    } else {
      req.flash("err_msg", "Please login to continue.");
      return res.redirect("/school/login");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view Fee-structure data
exports.viweFeeStructure = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;
    var feeStrucData = `SELECT * FROM school_feestructure WHERE school_id='${session.schoolId}' AND deleted_at IS NULL ORDER BY ABS(class_std)`;

    dbcon.query(feeStrucData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
        res.locals.data = data;
        return res.render("schoolLevel/school-feeStructure", {
          title: "Fee Structure",
          data,
        });
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view User Accounts
exports.viewUserAccounts = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  res.locals.schoolId = session.schoolId;
  try {
    var userAccData = `SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND deleted_at IS NULL AND NOT(role_id_fk='1')  AND NOT(role_id_fk='5')`;

    dbcon.query(userAccData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
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
        return res.render("schoolLevel/school-users", {
          title: "User Accounts",
          data,
        });
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view Subjects from School dashboard
exports.viewSubjects = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var subjectsData = `SELECT * FROM school_subjects WHERE school_id='${session.schoolId}'`;

    dbcon.query(subjectsData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
        res.locals.data = data;
        return res.render("schoolLevel/school-subjects", {
          title: "School Subjects",
        });
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// view Class Sections from school dashboard
exports.viewClassSections = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // var classSecData = `SELECT * FROM school_classroom WHERE school_id='${session.schoolId}'`;
    var classSecData = `SELECT clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.schoolId}'`;

    dbcon.query(classSecData, (err, data) => {
      if (err) return res.render("server-error", { title: "Server Error" });

      var classDrop = `SELECT * FROM school_feestructure WHERE school_id='${session.schoolId}' ORDER BY ABS(class_std);`;
      dbcon.query(classDrop, (err, classOptions) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.classOptions = classOptions;
        res.locals.data = data;
        return res.render("schoolLevel/school-classSections", {
          title: "Classes & Sections",
        });
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// editing fee structure in school dashboard

// get edit fee structure
exports.getEditFeeStructure = (req, res, next) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    const feeS_id = req.params.id;
    const feeS_query = `SELECT * FROM school_feestructure WHERE id='${feeS_id}'`;
    dbcon.query(feeS_query, (err, fetchedData) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      res.locals.class_std = fetchedData[0].class_std;
      res.locals.medium = fetchedData[0].medium;
      res.locals.actual_fee = fetchedData[0].actual_fee;
      return res.render("schoolLevel/school-edit-feeStructure", {
        title: "Edit Fee Structure",
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// put Edit fee structure
exports.putFeeStructure = (req, res, next) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    const check = req.params.id;
    console.log(check);
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// subject Staff Section mapping
exports.getMapSubStaff = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;

  try {
    // fetching class_id, section from classroom
    var class_med_sec = `SELECT clr.id AS clr_id, clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.schoolId}' ORDER BY ABS(sfs.class_std); SELECT * FROM school_subjects WHERE school_id='${session.schoolId}'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='8' AND status='Active'`;
    dbcon.query(class_med_sec, (err, tableData) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      var bridgeTableQuery = `SELECT scs.school_id, scs.subject_id, scs.classroom_id, ssub.subject_name, scr.class_section, scr.class_id, sfs.class_std, sfs.medium, sml.username FROM school_class_subjects AS scs 
      INNER JOIN school_subjects AS ssub ON ssub.id = scs.subject_id 
      INNER JOIN school_classroom AS scr ON scr.id = scs.classroom_id
      INNER JOIN school_main_login AS sml ON sml.id = scs.staff_id_assigned AND sml.status='Active'
      INNER JOIN school_feestructure AS sfs ON sfs.id = scr.class_id AND sfs.school_id='${session.schoolId}'`;
      dbcon.query(bridgeTableQuery, (err, result) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        console.log(result);
        res.locals.tableData = tableData;
        res.locals.result = result;
        return res.render("schoolLevel/school-map-subject-staff", {
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
  try {
    var checkmapping = `SELECT EXISTS(SELECT * FROM school_class_subjects WHERE school_id='${session.schoolId}' AND subject_id='${req.body.subject}' AND classroom_id='${req.body.class}') AS count`;

    dbcon.query(checkmapping, (err, isMapped) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else if (isMapped[0].count == 0) {
        console.log(isMapped);
        var MapSubStaffSec = `INSERT INTO school_class_subjects(school_id, subject_id, classroom_id, staff_id_assigned) VALUES ('${session.schoolId}', '${req.body.subject}', '${req.body.class}', '${req.body.staff}')`;

        dbcon.query(MapSubStaffSec, (err, bridgeData) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          req.flash("success", "Subject and Staff Added to the classroom.");
          return res.redirect("/school/dashboard/section-subject-staff");
        });
      } else {
        req.flash(
          "err_msg",
          "This Subject of the Class Section is already assigned to a staff."
        );
        return res.redirect("/school/dashboard/section-subject-staff");
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Announcement CRUD
exports.getMessageR = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
    return res.status(200);
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

exports.postMessageC = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

exports.putMessageU = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

exports.deleteMessageD = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Collect Fee CRUD
exports.getFeeCollection = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (session.schoolStatus == "Active") {
      var fee_data = `SELECT DISTINCT clr.school_id, clr.class_id, sfs.id, sfs.class_std, sfs.medium, sfs.actual_fee FROM school_classroom AS clr
      INNER JOIN school_feestructure AS sfs ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.schoolId}' ORDER BY ABS(sfs.class_std);`;
      dbcon.query(fee_data, (err, feeData) => {
        if (err) return res.render("server-error", { title: "Server Error" });

        // view fee records
        var feeRecords = `SELECT * FROM school_student_admission WHERE school_id='${session.schoolId}'`;
        dbcon.query(feeRecords, (err, records) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          res.locals.data = records;
          res.locals.feeData = feeData;
          return res.render("schoolLevel/school-collect-fee", {
            title: "Fee Collection",
          });
        });
      });
    } else {
      req.flash("err_msg", "Please Activate the School to collect Fee.");
      return res.redirect("/school/dashboard");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// postFeeCollection
exports.postFeeCollection = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var selectStud = `SELECT * FROM school_main_login WHERE id='${req.body.stuId}' AND role_id_fk='1'; SELECT * FROM school_student WHERE student_id='${req.body.stuId}'`;
    dbcon.query(selectStud, (err, student) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      console.log(student);
      // admission table is for new enrollment only. So, checking if the data is already available
      var checkAdmission = `SELECT EXISTS(SELECT * FROM school_student_admission WHERE student_id='${req.body.stuId}') AS count`;
      dbcon.query(checkAdmission, (err, data) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        else if (data[0].count == 0) {
          // inserting record to school_student_admission if not available
          const payment_pending =
            req.body.actual_fee_hide - req.body.fee_paying;
          let payment_status = payment_pending == 0 ? "No Due" : "Due";

          var admissionQuery = `INSERT INTO school_student_admission(school_id, student_id, mobile_number, email, academic_year, class_medium, class_section, actual_fee, paying_amount, payment_mode, payment_status, entry_by) VALUES('${student[0][0].school_id}', '${student[0][0].id}', '${student[1][0].mobile_number}', '${student[1][0].email}', '${req.body.academic_year}', '${req.body.class_medium}', '${req.body.class_section}', '${req.body.actual_fee_hide}', '${req.body.fee_paying}', '${req.body.payment_mode}', '${payment_status}', '${session.schoolId}')`;
          dbcon.query(admissionQuery, (err, respo) => {
            if (err)
              return res.render("server-error", { title: "Server Error" });
            //updating student status in main_login
            var studUpdateLogin = `UPDATE school_main_login SET status='Active' WHERE id='${student[0].id}'; UPDATE school_classroom SET students_filled=students_filled+1 WHERE id='${req.body.class_section}'`;
            dbcon.query(studUpdateLogin, (err, result) => {
              if (err)
                return res.render("server-error", { title: "Server Error" });
              req.flash("success", "Payment record added.");
              return res.redirect("/school/dashboard/fee-collection");
            });
          });
        } else {
          req.flash(
            "err_msg",
            "This student already enrolled. Please use Due collection form instead."
          );
          return res.redirect("/school/dashboard/fee-due-collection");
        }
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// STUDENT CRUD
exports.getAddStudent = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var StudentData = `SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='1'`;

    dbcon.query(StudentData, (err, data) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      res.locals.data = data;
      return res.render("schoolLevel/school-students", {
        title: "Student Accounts",
        data,
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Add Student
exports.postAddStudent = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (session.schoolStatus == "Active") {
      var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' OR email='${req.body.email}' AND school_id='${session.schoolId}' ) AS count`;

      dbcon.query(userCheck, (err, data) => {
        if (err) {
          req.flash("err_msg", "We could not add new user at the moment.");
          return res.redirect("/school/dashboard/users");
        } else if (data[0].count == 0) {
          const userPassword = req.body.password;
          const hashedPass = bcrypt.hashSync(`${userPassword}`, 10);

          const addStudent = `INSERT INTO school_main_login(school_id, role_id_fk, username, password, email, status) VALUES ('${session.schoolId}', '1', '${req.body.username}', '${hashedPass}', '${req.body.email}', 'Active');`;

          dbcon.query(addStudent, function (err) {
            if (err) {
              req.flash(
                "err_msg",
                "There is an error when adding new student. Please try again later."
              );
              return res.redirect("/school/dashboard/students");
            } else {
              req.flash("success", "A New Student account has been added.");
              return res.redirect("/school/dashboard/students");
            }
          });
        } else {
          req.flash(
            "err_msg",
            "This Username / email is already registered with this School."
          );
          return res.redirect("/school/dashboard/students");
        }
      });
    } else {
      req.flash("err_msg", "The School is not active.");
      return res.status(401).redirect("/school/dashboard");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

//view A Student Profile

// Showing Schedule Template Form
exports.getSchedulePlanForm = async (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var getScheduleTemps = `SELECT * FROM school_schedule_template WHERE school_id='${session.schoolId}'`;
    dbcon.query(getScheduleTemps, (err, templates) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      res.locals.templates = templates;
      return res.render("schoolLevel/school-schedule-template", {
        title: "School Schedule Template",
      });
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// Add Schedule Plan to the School (POST)
exports.postSchedulePlanForm = async (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    //
    var addScheduleTemps = `INSERT INTO school_schedule_template(school_id, schedule_name, school_timing_from, school_timing_to, period_time, lunch_time, no_of_intervals, interval_time, no_of_periods) VALUES ('${session.schoolId}', '${req.body.school_schedule_name}', '${req.body.school_start}', '${req.body.school_end}', '${req.body.school_period_time}', '${req.body.school_lunch_time}', '${req.body.school_interval_count}', '${req.body.school_interval_time}', (('${req.body.school_end}' - '${req.body.school_start}') - ('${req.body.school_lunch_time}' / 60) - (('${req.body.school_interval_count}' * '${req.body.school_interval_time}') / 60))/ ('${req.body.school_period_time}' / 60))`;
    dbcon.query(addScheduleTemps, (err, data) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      return res.redirect("/school/dashboard/schedule-plan");
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// change password
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
      const saved_pass = session.schoolPwd;
      const verified = bcrypt.compareSync(`${currentPwd}`, `${saved_pass}`);

      if (
        verified &&
        req.body.schoolNewPassword === req.body.schoolRetypePassword
      ) {
        const newHash = bcrypt.hashSync(`${req.body.schoolNewPassword}`, 10);
        var newPass = `UPDATE school_add_School SET school_secrete = '${newHash}' WHERE id='${session.schoolId}'`;
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
        return res.redirect("/school/dashboard/change-password");
      }
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// DUE COLLECTION -
exports.allDueCollection = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    if (req.method == "GET") {
      // view fee collection records
      var feeCollected = `SELECT * FROM school_student_admission WHERE school_id='${session.schoolId}'`;
      dbcon.query(feeCollected, (err, feeData) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        res.locals.data = feeData;
        return res.render("schoolLevel/school-collect-due", {
          title: "Due Collection",
        });
      });
    } else {
      let due_amount =
        req.body.course_fee - req.body.paid_fee_hide - req.body.paying_fee;
      let due_status = due_amount == 0 ? "No Due" : "Due";

      var dueColl = `INSERT INTO school_student_feedue(school_id, student_id, admission_id, actual_fee, currently_paying, payment_mode, due_status) VALUES ('${session.schoolId}', '${req.body.stuId_due}', '${req.body.admission_id}', '${req.body.course_fee}', '${req.body.paying_fee}', '${req.body.payment_mode}', '${due_status}')`;
      dbcon.query(dueColl, (err, result) => {
        if (err) return res.render("server-error", { title: "Server Error" });

        var updateAdmisFee = `UPDATE school_student_admission SET paying_amount = paying_amount+'${req.body.paying_fee}', payment_status ='${due_status}' WHERE id='${req.body.admission_id}'`;
        dbcon.query(updateAdmisFee, (err, updated) => {
          if (err) return res.render("server-error", { title: "Server Error" });
          else {
            req.flash("success", "Fee updated successfully.");
            return res.redirect(
              "/school/dashboard/fee-due-collection?_method=GET&status=success"
            );
          }
        });
      });
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};
