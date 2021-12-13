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
  } catch (err) {
    return res.status(500).send(err);
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

  if (session.logged_in) {
    res.redirect("/school/dashboard");
  } else {
    res.render("schoolLevel/school-login", {
      title: "School Master Login",
    });
  }
};

exports.postSchoolLogin = async (req, res) => {
  // flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
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
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

// view Dashboard after login
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
      var countData = `SELECT * FROM school_classroom WHERE school_id='${session.schoolId}'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Active' AND role_id_fk='8'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Inactive' AND role_id_fk='8'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Active' AND role_id_fk='1'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Inactive' AND role_id_fk='1'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='2'; SELECT * FROM school_subjects WHERE school_id='${session.schoolId}'; SELECT school_name FROM school_add_school WHERE id='${session.schoolId}'`;

      dbcon.query(countData, (err, countNos) => {
        if (err) throw err;
        res.locals.countNos = countNos;
        res.render("schoolLevel/school-dashboard", {
          title: "School Master Dashboard",
        });
      });
    } else if (session.logged_in && session.schoolStatus == "Inactive") {
      return res.redirect("/activate/school");
      // res.render("schoolLevel/school-dashboard", {
      //   title: "School Master Dashboard",
      // });
    } else {
      req.flash("err_msg", "You are unauthorized. Please login.");
      return res.status(401).redirect("/school/login");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postAddClassroom = async (req, res) => {
  try {
    //flashing err_msg
    let err_msg = "";
    err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = "";
    success_msg = req.flash("success");
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
    console.log(err);
    return res.status(500).send(err);
  }
};

// Schools can add users when, it is active.
exports.postAddUser = async (req, res) => {
  try {
    //flashing err_msg
    let err_msg = "";
    err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = "";
    success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;

    if (session.logged_in && session.schoolStatus == "Active") {
      const schoolId = session.schoolId;

      var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' OR email='${req.body.email}' AND school_id='${schoolId}' ) AS count`;

      dbcon.query(userCheck, (err, data) => {
        if (err) {
          console.log(err);
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
    console.log(err);
    return res.status(500).send(err);
  }
};

// Post Subjects for the school
exports.postAddSubject = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = "";
    err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = "";
    success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;

    // checing the school_subject table for duplicate entry
    var checkSubject = `SELECT EXISTS (SELECT * FROM school_subjects WHERE subject_name='${req.body.subject}' AND school_id='${session.schoolId}') AS count`;

    dbcon.query(checkSubject, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result[0].count == 0) {
        // result = 0, adding new subject
        var addSubject = `INSERT INTO school_subjects(subject_name, school_id) VALUES ('${req.body.subject}', '${session.schoolId}') `;

        dbcon.query(addSubject, (err, subject) => {
          if (err) {
            console.log(err);
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
    console.log(err);
  }
};

// Add fee Struture by School
exports.postAddFeeStructure = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = "";
    err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = "";
    success_msg = req.flash("success");
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
          console.log(err);
        } else if (data[0].count == 0) {
          var addFeeQuery = `INSERT INTO school_feestructure(school_id, class_std, medium, actual_fee) VALUES ('${school_id}', '${class_std}', '${medium}', '${actual_fee}')`;
          dbcon.query(addFeeQuery, (err, response) => {
            if (err) {
              console.log(err);
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
    console.log(err);
  }
};

// view Fee-structure data
exports.viweFeeStructure = (req, res) => {
  try {
    //flashing err_msg
    let err_msg = "";
    err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = "";
    success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;
    var feeStrucData = `SELECT * FROM school_feestructure WHERE school_id='${session.schoolId}' ORDER BY ABS(class_std)`;

    dbcon.query(feeStrucData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.locals.data = data;
        return res.render("schoolLevel/school-feeStructure", {
          title: "Fee Structure",
          data,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// view User Accounts
exports.viewUserAccounts = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var userAccData = `SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND NOT(role_id_fk='1')`;

    dbcon.query(userAccData, (err, data) => {
      if (err) {
        console.log(err);
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
    console.log(err);
  }
};

// view Subjects from School dashboard
exports.viewSubjects = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var subjectsData = `SELECT * FROM school_subjects WHERE school_id='${session.schoolId}'`;

    dbcon.query(subjectsData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.locals.data = data;
        return res.render("schoolLevel/school-subjects", {
          title: "School Subjects",
          data,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// view Class Sections from school dashboard
exports.viewClassSections = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // var classSecData = `SELECT * FROM school_classroom WHERE school_id='${session.schoolId}'`;
    var classSecData = `SELECT clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.schoolId}'`;

    dbcon.query(classSecData, (err, data) => {
      if (err) throw err;

      var classDrop = `SELECT * FROM school_feestructure WHERE school_id='${session.schoolId}' ORDER BY ABS(class_std);`;
      dbcon.query(classDrop, (err, classOptions) => {
        if (err) throw err;
        res.locals.classOptions = classOptions;
        res.locals.data = data;
        return res.render("schoolLevel/school-classSections", {
          title: "Classes & Sections",
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// editing fee structure in school dashboard

// get edit fee structure
exports.getEditFeeStructure = (req, res, next) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    const feeS_id = req.params.id;
    const feeS_query = `SELECT * FROM school_feestructure WHERE id='${feeS_id}'`;
    dbcon.query(feeS_query, (err, fetchedData) => {
      if (err) throw err;
      res.locals.class_std = fetchedData[0].class_std;
      res.locals.medium = fetchedData[0].medium;
      res.locals.actual_fee = fetchedData[0].actual_fee;
      return res.render("schoolLevel/school-edit-feeStructure", {
        title: "Edit Fee Structure",
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// put Edit fee structure
exports.putFeeStructure = (req, res, next) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    const check = req.params.id;
    console.log(check);
  } catch (err) {
    console.log(err);
  }
};

// subject Staff Section mapping
exports.getMapSubStaff = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;

  try {
    // fetching class_id, section from classroom
    var class_med_sec = `SELECT clr.id AS clr_id, clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.schoolId}' ORDER BY ABS(sfs.class_std); SELECT * FROM school_subjects WHERE school_id='${session.schoolId}'; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='8' AND status='Active'`;
    dbcon.query(class_med_sec, (err, tableData) => {
      if (err) throw err;

      var bridgeTableQuery = `SELECT scs.school_id, scs.subject_id, scs.classroom_id, ssub.subject_name, scr.class_section, scr.class_id, sfs.class_std, sfs.medium, sml.username FROM school_class_subjects AS scs 
      INNER JOIN school_subjects AS ssub ON ssub.id = scs.subject_id 
      INNER JOIN school_classroom AS scr ON scr.id = scs.classroom_id
      INNER JOIN school_main_login AS sml ON sml.id = scs.staff_id_assigned AND sml.status='Active'
      INNER JOIN school_feestructure AS sfs ON sfs.id = scr.class_id AND sfs.school_id='${session.schoolId}'`;
      dbcon.query(bridgeTableQuery, (err, result) => {
        if (err) throw err;
        res.locals.tableData = tableData;
        res.locals.result = result;
        return res.render("schoolLevel/school-map-subject-staff", {
          title: "Assign Staff to Subjects",
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// post Map Subject Staff
exports.postMapSubStaff = async (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var checkmapping = `SELECT EXISTS(SELECT * FROM school_class_subjects WHERE school_id='${session.schoolId}' AND subject_id='${req.body.subject}' AND classroom_id='${req.body.class}') AS count`;

    dbcon.query(checkmapping, (err, isMapped) => {
      if (err) {
        throw err;
      } else if (isMapped[0].count == 0) {
        console.log(isMapped);
        var MapSubStaffSec = `INSERT INTO school_class_subjects(school_id, subject_id, classroom_id, staff_id_assigned) VALUES ('${session.schoolId}', '${req.body.subject}', '${req.body.class}', '${req.body.staff}')`;

        dbcon.query(MapSubStaffSec, (err, bridgeData) => {
          if (err) throw err;
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
    console.log(err);
  }
};

// Announcement CRUD
exports.getMessageR = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
    return res.status(200);
  } catch (err) {
    console.log(err);
  }
};

exports.postMessageC = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
  } catch (err) {
    console.log(err);
  }
};

exports.putMessageU = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
  } catch (err) {
    console.log(err);
  }
};

exports.deleteMessageD = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // Dos something here
  } catch (err) {
    console.log(err);
  }
};

// Collect Fee CRUD
exports.getFeeCollection = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    if (session.schoolStatus == "Active") {
      var fee_data = `SELECT DISTINCT clr.school_id, clr.class_id, sfs.id, sfs.class_std, sfs.medium, sfs.actual_fee FROM school_classroom AS clr
      INNER JOIN school_feestructure AS sfs ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.schoolId}' ORDER BY ABS(sfs.class_std);`;
      dbcon.query(fee_data, (err, feeData) => {
        if (err) throw err;

        // view fee records
        var feeRecords = `SELECT * FROM school_student_admission WHERE school_id='${session.schoolId}'`;
        dbcon.query(feeRecords, (err, records) => {
          if (err) throw err;
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
    console.log(err);
  }
};

// postFeeCollection
exports.postFeeCollection = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var selectStud = `SELECT * FROM school_main_login WHERE email='${req.body.email}' AND role_id_fk='1'`;
    dbcon.query(selectStud, (err, student) => {
      if (err) throw err;
      // inserting record to school_student_admission
      var admissionQuery = `INSERT INTO school_student_admission(school_id, student_id, mobile_number, email, date_of_birth, academic_year, class_medium, class_section, actual_fee, paying_amount, payment_mode, payment_status, entry_by) VALUES('${student[0].school_id}', '${student[0].id}', '${req.body.mobile}', '${student[0].email}', '${req.body.dob}', '${req.body.academic_year}', '${req.body.class_medium}', '${req.body.class_section}', '${req.body.actual_fee}', '${req.body.fee_paying}', '${req.body.payment_mode}', '${req.body.due_status}', '${session.schoolId}')`;
      dbcon.query(admissionQuery, (err, respo) => {
        if (err) throw err;
        //updating student status in main_login
        var studUpdateLogin = `UPDATE school_main_login SET status='Active' WHERE id='${student[0].id}'; UPDATE school_classroom SET students_filled=students_filled+1 WHERE id='${req.body.class_section}'`;
        dbcon.query(studUpdateLogin, (err, result) => {
          if (err) throw err;
          req.flash("success", "Payment record added.");
          return res.redirect("/school/dashboard/fee-collection");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// STUDENT CRUD
exports.getAddStudent = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var StudentData = `SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='1'`;

    dbcon.query(StudentData, (err, data) => {
      if (err) throw err;
      res.locals.data = data;
      return res.render("schoolLevel/school-students", {
        title: "Student Accounts",
        data,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// Add Student
exports.postAddStudent = (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
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

          const addStudent = `INSERT INTO school_main_login(school_id, role_id_fk, username, password, email, status) VALUES ('${session.schoolId}', '1', '${req.body.username}', '${hashedPass}', '${req.body.email}', 'Inactive');`;

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
    console.log(err);
    return res.status(500).send(err);
  }
};

//view A Student Profile

// Showing Schedule Template Form
exports.getSchedulePlanForm = async (req, res) => {
  //flashing err_msg
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var getScheduleTemps = `SELECT * FROM school_schedule_template WHERE school_id='${session.schoolId}'`;
    dbcon.query(getScheduleTemps, (err, templates) => {
      if(err) throw err;
      res.locals.templates = templates;
      return res.render("schoolLevel/school-schedule-template", {
        title: "School Schedule Template",
      });
    })
  } catch (err) {
    console.log(err);
  }
};

// Add Schedule Plan to the School (POST)
exports.postSchedulePlanForm = async(req, res) => {
  let success_msg = "";
  success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = "";
  err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    //
    var addScheduleTemps = `INSERT INTO school_schedule_template(school_id, schedule_name, school_timing_from, school_timing_to, period_time, lunch_time, no_of_intervals, interval_time, no_of_periods) VALUES ('${session.schoolId}', '${req.body.school_schedule_name}', '${req.body.school_start}', '${req.body.school_end}', '${req.body.school_period_time}', '${req.body.school_lunch_time}', '${req.body.school_interval_count}', '${req.body.school_interval_time}', (('${req.body.school_end}' - '${req.body.school_start}') - ('${req.body.school_lunch_time}' / 60) - (('${req.body.school_interval_count}' * '${req.body.school_interval_time}') / 60))/ ('${req.body.school_period_time}' / 60))`;
    dbcon.query(addScheduleTemps, (err, data) => {
      if(err) throw err;
      return res.redirect('/school/dashboard/schedule-plan');
    })
  } catch(err) {
    console.log(err);
  }
};