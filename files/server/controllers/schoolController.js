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
    var check = `SELECT EXISTS (SELECT * FROM school_add_school WHERE email='${req.body.email}' AND deleted_at IS NULL) AS count`;
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
                      req.flash("success", "Mail has been sent");
                      return res.redirect("/");
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
    var loginQuery = `SELECT * FROM school_add_school WHERE school_login='${req.body.schoolUserName}' AND deleted_at IS NULL`;
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
    let status = req.session.schoolStatus;
    res.locals.status = status;

    if (session.logged_in && session.schoolStatus == "Active") {
      var countData = `SELECT * FROM school_classroom WHERE school_id='${session.schoolId}' AND deleted_at IS NULL; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Active' AND role_id_fk='8' AND deleted_at IS NULL; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Inactive' AND role_id_fk='8' AND deleted_at IS NULL; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Active' AND role_id_fk='1' AND deleted_at IS NULL; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND status='Inactive' AND role_id_fk='1' AND deleted_at IS NULL; SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='2' AND deleted_at IS NULL; SELECT * FROM school_subjects WHERE school_id='${session.schoolId}'; SELECT school_name FROM school_add_school WHERE id='${session.schoolId}' AND deleted_at IS NULL`;

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

// BATCH CRUD - View Form and List
exports.getCreateNewBatch = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var getBatchList = `SELECT * FROM school_batch_mgmt WHERE school_id = '${session.schoolId}' AND deleted_at IS NULL`;
    dbcon.query(getBatchList, (err, batchList) => {
      if(err) throw err;
      console.log(batchList);
      res.locals.batchList = batchList;
      return res.render('schoolLevel/school-batch', {title: 'School Batch Management'});
    })
  } catch (err) {
    console.log(err);
  }
}

// BATCH CRUD - POST Add Batch to the list
exports.postCreateNewBatch = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // check the year combination first and add
    var checkBatch = `SELECT EXISTS(SELECT * FROM school_batch_mgmt WHERE school_id = '${session.schoolId}' AND year_from = '${req.body.batch_from}' AND year_to = '${req.body.batch_to}' AND deleted_at IS NULL) AS count`;
    dbcon.query(checkBatch, (err, dupeBatch) => {
      if(err) throw err
      else if (dupeBatch[0].count != 0){
        req.flash('err_msg', 'Batch is already added.');
        return res.redirect('/school/dashboard/batch');
      } else {
        // insert here
        var newBatch = `INSERT INTO school_batch_mgmt (school_id, batch_name, year_from, year_to) VALUES ('${session.schoolId}', '${req.body.batch_name}', '${req.body.batch_from}', '${req.body.batch_to}')`;
        dbcon.query(newBatch, (err, batchAdded) => {
          if(err) throw err
          req.flash('success', 'New Batch added successfully');
          return res.redirect('/school/dashboard/batch');
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
}

// BATCH CRUD - DELETE
exports.deleteBatch = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let batch_id = req.params.batch_id;
  try {
    var deleteBatch = `UPDATE school_batch_mgmt SET deleted_at = CURRENT_TIMESTAMP WHERE id = '${batch_id}'`;
    dbcon.query(deleteBatch, (err, deleted) => {
      if(err) throw err
      req.flash('success', 'Batch has been deleted successfully.');
      return res.redirect('/school/dashboard/batch');
    })
  } catch (err) {
    console.log(err);
  }
} 

// CLASS MEDIUM CRUD - Add fee Struture by School
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
      const batch_id = req.body.batch_id;
      var feeQuery = `SELECT EXISTS (SELECT * FROM school_feestructure WHERE school_id='${school_id}' AND class_std='${class_std}' AND medium='${medium}' AND batch_id='${batch_id}' AND deleted_at IS NULL) AS count`;
      dbcon.query(feeQuery, (err, data) => {
        if (err) return res.render("server-error", { title: "Server Error" });
        else if (data[0].count == 0) {
          var addFeeQuery = `INSERT INTO school_feestructure(school_id, class_std, medium, actual_fee, batch_id) VALUES ('${school_id}', '${class_std}', '${medium}', '${actual_fee}', '${batch_id}')`;
          dbcon.query(addFeeQuery, (err, response) => {
            if (err) return res.render("server-error", { title: "Server Error" });
            else {
              req.flash(
                "success",
                `Fee structure for ${class_std} STD - ${medium} Medium, ${batch_id} is added successfully.`
              );
              return res.redirect("/school/dashboard/fee-structure");
            }
          });
        } else {
          req.flash(
            "err_msg",
            `Fee structure of ${class_std} STD - ${medium} Medium for ${batch_id} Batch is already added.`
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

// CLASS MEDIUM CRUD - view Fee-structure data
exports.viweFeeStructure = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var feeStrucData = `SELECT sfs.id, sfs.class_std, sfs.medium, sfs.actual_fee, batch.batch_name FROM school_feestructure AS sfs INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id WHERE sfs.school_id='${session.schoolId}' AND sfs.deleted_at IS NULL ORDER BY ABS(sfs.class_std); SELECT * FROM school_batch_mgmt WHERE school_id = '${session.schoolId}' AND deleted_at IS NULL`;

    dbcon.query(feeStrucData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
        console.log(data);
        res.locals.data = data[0];
        res.locals.batch = data[1];
        return res.render("schoolLevel/school-feeStructure", {
          title: "Fee Structure"
        });
      }
    });
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// CLASS MEDIUM CRUD - put Edit fee structure
exports.putFeeStructure = (req, res, next) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  console.log(req.body.medium_edit);
  try {
    const id = req.params.id;
    // check the edited data for duplicate entry
    var dupeFeeStruc = `SELECT * FROM school_feestructure WHERE class_std = ${req.body.class_std_edit} AND medium = '${req.body.medium_edit}' AND school_id = ${session.schoolId} AND batch_id = '${req.body.batch_id_edit}' AND deleted_at IS NULL`;
    dbcon.query(dupeFeeStruc, (err, duplicate) => {
      if(err) console.log(err);
      // return res.render("server-error", { title: "Server Error" });
      if (duplicate.length > 0) {
        console.log(duplicate);
        if (duplicate[0].id == id){
          // there is only one data which we chose to edit
          var updateFeeStruc = `UPDATE school_feestructure SET medium='${req.body.medium_edit}', actual_fee='${req.body.fee_edit}' WHERE id='${id}' AND school_id = '${session.schoolId}' AND batch_id = '${req.body.batch_id_edit}' AND deleted_at IS NULL`;
          dbcon.query(updateFeeStruc, (err, updated) => {
            if(err) console.log(err);
            // return res.render("server-error", { title: "Server Error" });
            req.flash('success', 'Fee structure updated successfully.');
            return res.redirect('/school/dashboard/fee-structure');
          })
        } else {
        console.log(duplicate);
          // there is duplicate which is not matching the current id.
          req.flash('err_msg', 'Data already exists.');
          return res.redirect('/school/dashboard/fee-structure');
        }
      } else {
        var updateFeeStruc = `UPDATE school_feestructure SET medium='${req.body.medium_edit}', actual_fee='${req.body.fee_edit}' WHERE id='${id}' AND school_id = '${session.schoolId}' AND batch_id = '${req.body.batch_id_edit}' AND deleted_at IS NULL`;
        dbcon.query(updateFeeStruc, (err, updated) => {
          if(err) console.log(err); 
          // return res.render("server-error", { title: "Server Error" });
          req.flash('success', 'Fee structure updated successfully.');
          return res.redirect('/school/dashboard/fee-structure');
        })
      }
    })
  } catch (err) {
    console.log(err)
    // return res.render("server-error", { title: "Server Error" });
  }
};

// CLASS MEDIUM CRUD - deleting fee structure
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
    // deleting a fee structure cehck is section added to this
    var checkSection = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_id='${id}' AND school_id='${session.schoolId}' AND deleted_at IS NULL) AS count`;
    dbcon.query(checkSection, (err, foundSections) => {
      if(err) throw err;
      else if(foundSections[0].count != 0) {
        console.log(foundSections);
        req.flash('err_msg', `We cant delete this class std. As there are ${foundSections[0].count} section(s) active with this Class std.`);
        return res.redirect('/school/dashboard/fee-structure');
      } else {
        console.log(foundSections);
        // deleting if no sec linked to this class std
        var deleteFee = `UPDATE school_feestructure SET deleted_at = CURRENT_TIMESTAMP WHERE id='${id}'`;
        dbcon.query(deleteFee, (err, deletedFee) => {
          if (err) throw err;
          console.log(deletedFee);
          req.flash("success", "Class standard deleted successfully.");
          return res.redirect("/school/dashboard/fee-structure");
        });
      }
    })
  } catch (err) {
    console.log(err);
  }
};

// CLASSROOM CRUD - school adds class section
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

      var classCheck = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_id='${req.body.class}' AND class_section='${req.body.section}' AND deleted_at IS NULL AND school_id='${schoolId}') AS count`;

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
  }
};

// CLASSROOM CRUD - view Class Sections from school dashboard
exports.viewClassSections = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var classSecData = `SELECT clr.id AS sec_id, clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium, sfs.batch_id, batch.batch_name FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id WHERE sfs.school_id = '${session.schoolId}' AND clr.deleted_at IS NULL ORDER BY ABS(sfs.class_std)`;
    dbcon.query(classSecData, (err, data) => {
      if (err) console.log(err);
      // return res.render("server-error", { title: "Server Error" });

      var classDrop = `SELECT sfs.id, sfs.class_std, sfs.medium, batch.batch_name FROM school_feestructure AS sfs INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id WHERE sfs.school_id='${session.schoolId}' AND sfs.deleted_at IS NULL ORDER BY ABS(sfs.class_std)`;
      dbcon.query(classDrop, (err, classOptions) => {
        if (err) console.log(err);
        // return res.render("server-error", { title: "Server Error" });
        res.locals.classOptions = classOptions;
        res.locals.data = data;
        return res.render("schoolLevel/school-classSections", {
          title: "Classes & Sections",
        });
      });
    });
  } catch (err) {
    if (err) console.log(err);
    // return res.render("server-error", { title: "Server Error" });  
  }
};

// CLASSROOM CRUD - school edits class sections
exports.editClassSection = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    //cehck for duplicate section in class section
    var checkSection = `SELECT EXISTS (SELECT * FROM school_classroom WHERE class_id='${req.body.std_id}' AND class_section = '${req.body.section_edit}' AND students_strength = '${req.body.strength_edit}' AND deleted_at iS NULL AND school_id='${session.schoolId}') AS count`;
    console.log(checkSection);
    dbcon.query(checkSection, (err, noDuplicate) => {
      if (err) throw err;
      else if (noDuplicate[0].count != 0) {
        req.flash(
          "err_msg",
          "The Std and class section combination already exist."
        );
        return res.redirect("/school/dashboard/sections");
      } else {
        var updateSec = `UPDATE school_classroom SET class_section = '${req.body.section_edit}', students_strength = '${req.body.strength_edit}' WHERE id='${req.body.classsec_id}'`;
        dbcon.query(updateSec, (err, updatedSec) => {
          if (err) throw err;
          req.flash("success", "Class Section edited successfully.");
          return res.redirect("/school/dashboard/sections");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// CLASSROOM CRUD - school deletes class section
exports.deleteClassSection = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let section_id = req.params.id;
  try {
    // conditions to be met - check admission table, students should not be in that section
    var isNoStudent = `SELECT EXISTS (SELECT * FROM school_student_admission WHERE class_section = '${req.body.sec_id_hidden}' AND academic_year = YEAR(CURDATE())) AS count`;
    dbcon.query(isNoStudent, (err, sectionEmpty) => {
      if (err) throw err;
      else if (sectionEmpty[0].count == 0) {
        var deleteSec = `UPDATE school_classroom SET deleted_at = CURRENT_TIMESTAMP WHERE id='${section_id}'`;
        dbcon.query(deleteSec, (err, result) => {
          if (err) throw err;
          req.flash("success", "Class Section deleted successfully.");
          return res.redirect("/school/dashboard/sections");
        });
      } else {
        req.flash(
          "err_msg",
          "There are student admitted to this section already. Make sure there is no students enrolled to this section."
        );
        return res.redirect("/school/dashboard/sections");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// SUBJECT CRUD - Post Subjects for the school
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
    var checkSubject = `SELECT EXISTS (SELECT * FROM school_subjects WHERE subject_name='${req.body.subject}' AND school_id='${session.schoolId}' AND deleted_at IS NULL) AS count`;

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

// SUBJECT CRUD - Delete Subject
exports.deleteSubject = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let subject_id = req.params.subject_id;
  try {
    var mappedSubject = `SELECT * FROM school_class_subjects WHERE subject_id='${subject_id}' AND school_id='${session.schoolId}' AND deleted_at IS NULL`;
    dbcon.query(mappedSubject, (err, mapped) => {
      if (err) throw err;
      else if (mapped.length == 0) {
        var deleteSubject = `UPDATE school_subjects SET deleted_at = CURRENT_TIMESTAMP WHERE id='${subject_id}'`;
        dbcon.query(deleteSubject, (err) => {
          if (err) throw err;
          req.flash("success", "Subject deleted successfully.");
          return res.redirect("/school/dashboard/subjects");
        });
      } else {
        req.flash(
          "err_msg",
          `Subject is already mapped with ${mapped.length} Class Section(s).`
        );
        return res.redirect("/school/dashboard/subjects");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// STAFF CRUD - Schools can add users when, it is active.
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

      var userCheck = `SELECT EXISTS (SELECT * FROM school_main_login WHERE username='${req.body.username}' OR email='${req.body.email}' AND school_id='${schoolId}' AND deleted_at IS NULL ) AS count`;

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

// STAFF CRUD - view User Accounts
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
    var userAccData = `SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND deleted_at IS NULL AND NOT(role_id_fk='1') AND NOT(role_id_fk='5')`;

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

// STAFF CRUD - editing USER acounts - Edit only role and status of the user
exports.putUserAccount = (req, res) => {
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
      return res.redirect("/school/dashboard/users");
    });
  } catch (err) {
    console.log(err);
  }
};

// STAFF CRUD - delete user accounts
exports.deleteUserAccount = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let id = req.params.id;
  try {
    // get user role and do the prior check
    var userRole = `SELECT role_id_fk FROM school_main_login WHERE id='${id}'`;
    dbcon.query(userRole, (err, role) => {
      if (err) throw err;
      switch (role[0].role_id_fk) {
        case 8:
          // make sure the staff is not assigned to any subject
          var checkAssign = `SELECT EXISTS(SELECT * FROM school_class_subjects WHERE staff_id_assigned = '${id}') AS count`;
          dbcon.query(checkAssign, (err, mappedStaff) => {
            if (err) throw err;
            else if (mappedStaff[0].count == 0) {
              var deleteUser = `UPDATE school_main_login SET status='Inactive', deleted_at = CURRENT_TIMESTAMP WHERE id='${id}'`;
              dbcon.query(deleteUser, (err, deletedUser) => {
                if (err) throw err;
                req.flash(
                  "success",
                  "User Account has been deleted successfully."
                );
                return res.redirect("/school/dashboard/users");
              });
            } else {
              req.flash(
                "err_msg",
                "The Teaching faculty is still assigned to handle some subjects. Make sure to update the subjects before deleting the Teacher."
              );
              return res.redirect("/school/dashboard/users");
            }
          });
          break;
        default:
          var deleteUser = `UPDATE school_main_login SET status='Inactive', deleted_at = CURRENT_TIMESTAMP WHERE id='${id}'`;
          dbcon.query(deleteUser, (err, deletedUser) => {
            if (err) throw err;
            req.flash("success", "User Account has been deleted successfully.");
            return res.redirect("/school/dashboard/users");
            // req.flash("err_msg", "Only Teaching Faculty can be deleted for now.");
            // return res.redirect("/school/dashboard/users");
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
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var subjectsData = `SELECT * FROM school_subjects WHERE school_id='${session.schoolId}' AND deleted_at IS NULL`;

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

// SUBJECT MAP CRUD - subject Staff Section mapping
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
    var class_med_sec = `SELECT clr.id AS clr_id, clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id AND clr.deleted_at IS NULL WHERE sfs.school_id = '${session.schoolId}' ORDER BY ABS(sfs.class_std); SELECT * FROM school_subjects WHERE school_id='${session.schoolId}' AND deleted_at IS NULL; SELECT * FROM school_staff WHERE school_id='${session.schoolId}'`;
    dbcon.query(class_med_sec, (err, tableData) => {
      if (err) console.log(err);
      // return res.render("server-error", { title: "Server Error" });
      var bridgeTableQuery = `SELECT scs.id AS map_id, scs.school_id, scs.subject_id, scs.classroom_id, ssub.subject_name, scr.class_section, scr.class_id, sfs.class_std, sfs.medium, sml.name AS staff_primary, sml2.name AS staff_secondary FROM school_class_subjects AS scs INNER JOIN school_subjects AS ssub ON ssub.id = scs.subject_id 
      INNER JOIN school_classroom AS scr ON scr.id = scs.classroom_id
      INNER JOIN school_staff AS sml ON scs.staff_id_assigned = sml.staff_id 
      INNER JOIN school_staff AS sml2 ON scs.secondary_staff_assigned = sml2.staff_id
      INNER JOIN school_feestructure AS sfs ON sfs.id = scr.class_id WHERE sfs.school_id='${session.schoolId}' AND scs.deleted_at IS NULL ORDER BY ABS(sfs.class_std)`;
      dbcon.query(bridgeTableQuery, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        // return res.render("server-error", { title: "Server Error" });
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

// SUBJECT MAP CRUD - post Map Subject Staff - HAVING ISSUE HERE
exports.postMapSubStaff = async (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var checkmapping = `SELECT EXISTS (SELECT * FROM school_class_subjects WHERE school_id='${session.schoolId}' AND subject_id='${req.body.subject}' AND classroom_id='${req.body.class}' AND deleted_at IS NULL) AS count`;

    dbcon.query(checkmapping, (err, isMapped) => {
      if (err) { 
        console.log(err);
        return res.render("server-error", { title: "Server Error" });
      } else if (isMapped[0].count == 0) {
        if (req.body.staff != req.body.sec_staff){
          var MapSubStaffSec = `INSERT INTO school_class_subjects (school_id, subject_id, classroom_id, staff_id_assigned, secondary_staff_assigned) VALUES ('${session.schoolId}', '${req.body.subject}', '${req.body.class}', '${req.body.staff}', '${req.body.sec_staff}')`;

          dbcon.query(MapSubStaffSec, (err, bridgeData) => {
            if (err) console.log(err);
            // return res.render("server-error", { title: "Server Error" });
            req.flash('success', 'Mapping created successfully');
            return res.redirect('/school/dashboard/section-subject-staff');
          });
        } else {
          req.flash("err_msg", "Staff and Alternate staff cannot be the same");
          return res.redirect("/school/dashboard/section-subject-staff");
        }
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
    return res.render("server-error", { title: "Server Error" });
  }
};

// SUBJECT MAP CRUD - edit Map Subject STaff
exports.editMapSubStaff = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let map_id = req.params.id;
  try {
    if (req.body.staff_edit == req.body.sec_staff_edit) {
      req.flash('err_msg', 'Primary & Secondary faculties should not be the same');
      return res.redirect('/school/dashboard/section-subject-staff');
    } else {
      var editMapped = `UPDATE school_class_subjects SET staff_id_assigned = '${req.body.staff_edit}', secondary_staff_assigned='${req.body.sec_staff_edit}' WHERE id='${map_id}' AND school_id='${session.schoolId}'`;
      dbcon.query(editMapped, (err, edited) => {
        if(err) throw err;
        console.log(edited);
        req.flash('success', 'Mapped Faculties modified.');
        return res.redirect('/school/dashboard/section-subject-staff');
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// SUBJECT MAP CRUD - delete Map Subject Staff
exports.deleteMapSubStaff = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let id = req.params.id;
  try {
    // delete here
    var deleteMapp = `UPDATE school_class_subjects SET deleted_at = CURRENT_TIMESTAMP WHERE id='${id}' AND school_id = '${session.schoolId}'`;
    dbcon.query(deleteMapp, (err) => {
      if (err) throw err;
      req.flash("success", "Bonding deleted successfully.");
      return res.redirect("/school/dashboard/section-subject-staff");
    });
  } catch (err) {
    console.log(err);
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
      var fee_data = `SELECT DISTINCT clr.school_id, clr.class_id, sfs.id, sfs.class_std, sfs.medium, sfs.actual_fee FROM school_classroom AS clr INNER JOIN school_feestructure AS sfs ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.schoolId}' ORDER BY ABS(sfs.class_std);`;
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
      // admission table is for new enrollment only. So, checking if the data is already available
      var checkAdmission = `SELECT EXISTS(SELECT * FROM school_student_admission WHERE student_id='${req.body.stuId}' AND academic_year='${req.body.academic_year}') AS count`;
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

// view Due collection records
exports.viewDueCollectionData = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
  } catch(err){
    console.log(err);
  }
}

// STUDENT CRUD - get student list and add form
exports.getAddStudent = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var StudentData = `SELECT * FROM school_main_login WHERE school_id='${session.schoolId}' AND role_id_fk='1' AND deleted_at IS NULL`;

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

// STUDENT CRUD - Add Student
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

// STUDENT CRUD - Password Reseting for a student account POST
exports.pwdResetStudentAcc = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let student_id = req.params.student_id;
  try {
    if (req.method == "PUT") {
      let default_pwd = process.env.STU_PWD_DEFAULT;
      const hashedPwd = bcrypt.hashSync(default_pwd, 10);
      var studPwdChange = `UPDATE school_main_login SET password = '${hashedPwd}' WHERE id='${student_id}' AND role_id_fk='1'`;
      dbcon.query(studPwdChange, (err, response) => {
        if (err) throw err;
        // selecting the student data:
        var studData = `SELECT username, email FROM school_main_login WHERE id='${student_id}' AND role_id_fk='1'`;
        dbcon.query(studData, (err, student) => {
          if (err) throw err;
          else if (student.length != 0) {
            // send email to student
            const mail = sendMail({
              from: process.env.MAIL_USERNAME,
              to: student[0].email,
              subject: "Your Password has been changed.",
              html: `<p>Hi ${student[0].username}, As per your request, we resetted your password to the default password, which is '${process.env.STU_PWD_DEFAULT}' (without quotes). <br> If you aren't aware of this, feel free to click this link to change it right now.</p>`,
            })
              .then((result) => {
                req.flash("success", "Mail has been sent");
                return res.redirect("/");
              })
              .catch((err) => {
                return res.render("server-error", {
                  title: "Server Error",
                });
              });
            req.flash("success", "Password changed successfully");
            return res.redirect("/school/dashboard/students");
          } else {
            req.flash("err_msg", "No Student account found.");
            return res.redirect("/school/dashboard/students");
          }
        });
      });
    } else {
      req.flash("err_msg", "Not found");
      return res.redirect("/school/dashboard/students");
    }
  } catch (err) {
    console.log(err);
  }
};

// STUDENT CRUD - edit student account by school
exports.editStudentAcc = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let student_id = req.params.student_id;
  try {
    // do something
    var updateStud = `UPDATE school_main_login SET status = '${req.body.status_edit}' WHERE id='${student_id}'`;
    dbcon.query(updateStud, (err, student) => {
      if(err) throw err;
      req.flash('success', 'Student account updated.');
      return res.redirect('/school/dashboard/students');
    })
  } catch (err) {
    console.log(err);
  }
}

// STUDENT CRUD - delete a student account
exports.deleteStudentAcc = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  let student_id = req.params.id;
  try {
    // do delete here
    var deleteStud = `UPDATE school_main_login SET status = '${req.body.status_edit}', deleted_at = CURRENT_TIMESTAMP WHERE id='${student_id}' AND role_id_fk='1'`;
    dbcon.query(deleteStud, (err, deletedData) => {
      if(err) throw err;
      req.flash('success', 'Student account deleted successfully.');
      return res.redirect('/school/dashboard/students');
    })
  } catch (err) {
    console.log(err);
  }
};

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
    var getScheduleTemps = `SELECT * FROM school_schedule_template WHERE school_id='${session.schoolId}' AND deleted_at IS NULL`;
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

// Add Schedule Plan (template) to the School (POST)
exports.postSchedulePlanForm = async (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    var addScheduleTemps = `INSERT INTO school_schedule_template(school_id, schedule_name,  no_of_periods) VALUES ('${session.schoolId}', '${req.body.school_schedule_name}', '${req.body.school_period_count}')`;
    // var addScheduleTemps = `INSERT INTO school_schedule_template(school_id, schedule_name, school_timing_from, school_timing_to, period_time, lunch_time, no_of_intervals, interval_time, no_of_periods) VALUES ('${session.schoolId}', '${req.body.school_schedule_name}', '${req.body.school_start}', '${req.body.school_end}', '${req.body.school_period_time}', '${req.body.school_lunch_time}', '${req.body.school_interval_count}', '${req.body.school_interval_time}', (('${req.body.school_end}' - '${req.body.school_start}') - ('${req.body.school_lunch_time}' / 60) - (('${req.body.school_interval_count}' * '${req.body.school_interval_time}') / 60))/ ('${req.body.school_period_time}' / 60))`;
    dbcon.query(addScheduleTemps, (err, data) => {
      if (err) throw err;
      // return res.render("server-error", { title: "Server Error" });
      return res.redirect("/school/dashboard/schedule-plan");
    });
  } catch (err) {
    // return res.render("server-error", { title: "Server Error" });
    console.log(err);
  }
};

// delete schedule plan (template)
exports.deleteSchedulePlan = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let sched_tempid = req.params.sched_tempid;
  try {
    var deleteSchedPlan = `UPDATE school_schedule_template SET deleted_at = CURRENT_TIMESTAMP WHERE id='${sched_tempid}'`;
    dbcon.query(deleteSchedPlan, (err, schePlan) => {
      if(err) throw err;
      req.flash('success', 'schedule Template deleted successfully.');
      return res.redirect('/school/dashboard/schedule-plan');
    })
  } catch (err) {
    console.log(err);
  }
}

// View weekly schedule
exports.viewWeekSchedule = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    // viewing schedule created - view need to be distinct
    var schedules = `SELECT DISTINCT sfs.class_std, sfs.medium, clr.class_section, clr.id AS clr_id FROM school_classroom AS clr INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id INNER JOIN school_class_subjects AS scs ON scs.classroom_id=clr.id WHERE clr.school_id='${session.schoolId}' ORDER BY ABS(sfs.class_std); SELECT * FROM school_schedule_template WHERE school_id='${session.schoolId}' AND deleted_at IS NULL; SELECT week.id, sfs.class_std, sfs.medium, week.class_sec_id, clr.class_section, week.day, week.schedule_tempid, temp.schedule_name FROM school_week_schedule AS week INNER JOIN school_classroom AS clr ON clr.id = week.class_sec_id INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id INNER JOIN school_schedule_template AS temp ON temp.id = week.schedule_tempid WHERE week.period_subject_id IS NOT NULL AND week.period_staff_id IS NOT NULL AND week.school_id='${session.schoolId}' AND week.deleted_at IS NULL GROUP BY week.day, clr.class_section ORDER BY sfs.class_std, clr.class_section`;

    dbcon.query(schedules, (err, data) => {
      if (err) throw err;
      res.locals.data = data;
      return res.render("schoolLevel/school-week-schedule", {
        title: "Week Schedules",
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// POST Week Schedule form
exports.addWeekScheduleForm = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  try {
    // check if the schedule is already available or not
    var dupeWeekSched = `SELECT EXISTS (SELECT * FROM school_week_schedule WHERE day='${req.body.day}' AND class_sec_id = '${req.body.class}') AS count`;
    dbcon.query(dupeWeekSched, (err, dupeSchedule) => {
      if (err) throw err;
      else if (dupeSchedule[0].count == 1) {
        req.flash(
          "err_msg",
          "Schedule of this Class Section for the day is exist."
        );
        return res.redirect("/school/dashboard/week-schedule");
      } else {
        let p1_no = req.body.period_no_1 || "NULL";
        let p2_no = req.body.period_no_2 || "NULL";
        let p3_no = req.body.period_no_3 || "NULL";
        let p4_no = req.body.period_no_4 || "NULL";
        let p5_no = req.body.period_no_5 || "NULL";
        let p6_no = req.body.period_no_6 || "NULL";
        let p7_no = req.body.period_no_7 || "NULL";
        let p8_no = req.body.period_no_8 || "NULL";
        let p9_no = req.body.period_no_9 || "NULL";
        let p10_no = req.body.period_no_10 || "NULL";
        let p1_sub = req.body.period_1_sub || "NULL";
        let p1_staff = req.body.period_1_staff_hidden || "NULL";
        let p2_sub = req.body.period_2_sub || "NULL";
        let p2_staff = req.body.period_2_staff_hidden || "NULL";
        let p3_sub = req.body.period_3_sub || "NULL";
        let p3_staff = req.body.period_3_staff_hidden || "NULL";
        let p4_sub = req.body.period_4_sub || "NULL";
        let p4_staff = req.body.period_4_staff_hidden || "NULL";
        let p5_sub = req.body.period_5_sub || "NULL";
        let p5_staff = req.body.period_5_staff_hidden || "NULL";
        let p6_sub = req.body.period_6_sub || "NULL";
        let p6_staff = req.body.period_6_staff_hidden || "NULL";
        let p7_sub = req.body.period_7_sub || "NULL";
        let p7_staff = req.body.period_7_staff_hidden || "NULL";
        let p8_sub = req.body.period_8_sub || "NULL";
        let p8_staff = req.body.period_8_staff_hidden || "NULL";
        let p9_sub = req.body.period_9_sub || "NULL";
        let p9_staff = req.body.period_9_staff_hidden || "NULL";
        let p10_sub = req.body.period_10_sub || "NULL";
        let p10_staff = req.body.period_10_staff_hidden || "NULL";

        var classScheduleAdd = `INSERT INTO school_week_schedule (day, school_id, class_sec_id, schedule_tempid, period_no, period_subject_id, period_staff_id, created_by) VALUES 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p1_no}', '${p1_sub}', '${p1_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p2_no}', '${p2_sub}', '${p2_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p3_no}', '${p3_sub}', '${p3_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p4_no}', '${p4_sub}', '${p4_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p5_no}', '${p5_sub}', '${p5_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p6_no}', '${p6_sub}', '${p6_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p7_no}', '${p7_sub}', '${p7_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p8_no}', '${p8_sub}', '${p8_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p9_no}', '${p9_sub}', '${p9_staff}', '${session.schoolId}'), 
      ('${req.body.day}', '${session.schoolId}', '${req.body.class}', '${req.body.schedule_name}', '${p10_no}', '${p10_sub}', '${p10_staff}', '${session.schoolId}')`;
        dbcon.query(classScheduleAdd, (err, result) => {
          if (err) throw err;
          req.flash("success", "Day Schedule added successfully.");

          // delete null values from table - soft delete
          var nullData = `UPDATE school_week_schedule SET deleted_at = CURRENT_TIMESTAMP WHERE period_no='0'`;
          dbcon.query(nullData, (err) => {
            if (err) throw err;
            return res.redirect("/school/dashboard/week-schedule");
          });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// edit week schedule form
exports.editWeekSchedule = (req, res) => {
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let session = req.session;
  let day_id = req.params.day_id;
  let class_sec_id = req.params.section_id;
  try {
    // do here
  } catch (err) {
    console.log(err);
  }
}

// delet Week schedule
exports.deleteWeekSchedule = (req, res) => {
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let session = req.session;
  let day = req.params.day_id;
  let class_sec_id = req.params.section_id;
  try {
    //  when seleting a week schedule, 
    var deleteAWeekSched = `UPDATE school_week_schedule SET deleted_at = CURRENT_TIMESTAMP WHERE day = '${day}' AND class_sec_id = '${class_sec_id}' AND school_id = '${session.schoolId}'`;
    dbcon.query(deleteAWeekSched, (err, response) => {
      if(err) throw err;
      req.flash('success', 'Week schedule deleted.')
      return res.redirect('/school/dashboard/week-schedule');
    })
  } catch (err) {
    console.log(err);
  }
}

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

//GET Parent list and add a secondary Parent
exports.getParentsList = (req, res) => {
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var getParents = `SELECT * FROM school_main_login WHERE role_id_fk = '5' AND deleted_at IS NULL`;
    dbcon.query(getParents, (err, parentsList) => {
      if(err) throw err;
      res.locals.parentsList = parentsList;
      return res.render('schoolLevel/school-add-parents', {title: 'Parent Accounts'});
    })
  } catch (err) {
    console.log(err);
  }
}

// add New Parent (secondary account)
exports.addNewParent = (req, res) => {
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // cehck for duplicates
    var checkParent = `SELECT EXISTS (SELECT * FROM school_main_login WHERE email = '${req.body.email}') AS count`;
    dbcon.query(checkParent, (err, foundParent) => {
      if(err) throw err;
      else if(foundParent[0].count != 0){
        req.flash('err_msg', 'This Parent is already exists.');
        return res.redirect('/school/dashboard/parents');
      } else {
        const hashedParentPwd = bcrypt.hashSync(req.body.password, 10);
        var secParent = `INSERT INTO school_main_login (school_id, role_id_fk, username, password, email, status) VALUES ('${session.schoolId}', '${req.body.role}', '${req.body.username}', '${hashedParentPwd}', '${req.body.email}', 'Active')`;
        dbcon.query(secParent, (err) => {
          if(err) throw err;
          req.flash('success', "New Parent account created.");
          return res.redirect('/school/dashboard/parents');
        })   
      }
    })
  } catch (err) {
    console.log(err);
  }
}

// edit Parent status by school
exports.editParentAcc = (req, res) => {
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    // get parent data from params.parent_id
    var parentEmail = `SELECT * FROM school_main_login WHERE id='${req.params.parent_id}' AND role_id_fk='5'`;
    dbcon.query(parentEmail, (err, emailId) => {
      if(err) throw err;
      else if (emailId.length == 1) {
        // run update here n send mail
        var editParentAcc = `UPDATE school_main_login SET status= '${req.body.status_edit}' WHERE id='${req.params.parent_id}'`;
        dbcon.query(editParentAcc, (err) => {
          if(err) throw err;
          const mail_to_parent = sendMail({
            from: process.env.MAIL_USERNAME,
            to: emailId[0].email,
            subject: "Your account status has been modified.",
            html: `<h2>${session.schoolName} has modified your Account Status to ${emailId[0].status}.</h2><p>Hi Parent, [Referencing email address: ${emailId[0].email} and username: ${emailId[0].username}] Your account status has been recently modified to ${emailId[0].status}, by the School ${session.schoolName}. If you think it is accidental or If you havent requested this change, please contact the school for further clarifications.</p><br><p>- Thank you. Have a good day.</p>`,
          })
            .then((result) => {
              console.log("Mail has been sent");
            })
            .catch((err) => {
              return res.render("server-error", {
                title: "Server Error",
              });
            });
            req.flash('success', 'Parent Account updated.');
            return res.redirect('/school/dashboard/parents');
        })
      } else {
        req.flash('err_msg', 'NO Parent account found.')
        return res.redirect('/school/dashboard/parents');
      }
    })
  } catch(err) {
    console.log(err);
  }
}

// mapping Parent and student by School
exports.mapParStudent = (req, res) => {
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let success_msg = req.flash('success');
  let session = req.session;
  res.locals.success_msg = success_msg;
  let parent_id = req.params.parent_id;
  let untouchedOldMap = req.body.mapped_students_old_hide;
  let oldMappedEdit = req.body.mapped_students_edit; // new array
  let new_mapping = req.body.map_students_edit;
  try {
    // finding missing variable from 2 arrays
    console.log(oldMappedEdit);
    var missing = [];
    if (typeof oldMappedEdit !== 'undefined'){
      for (let x of untouchedOldMap) {
        if(oldMappedEdit.indexOf(x) !== -1) {
          continue;
        } else {
          missing.push(x);
        }
      }
    } else {
      missing = untouchedOldMap;
      console.log(missing);
    }
   
    var deleteFinalQuery = "";
    // deleting already mapped student
    if(typeof missing !== 'undefined'){
      for (let i = 0; i < missing.length; i++){
        var deleteMap = `UPDATE school_parent_student_map SET deleted_at = CURRENT_TIMESTAMP WHERE parent_id = '${parent_id}' AND ml_student_id = '${missing[i]}';`
        deleteFinalQuery += deleteMap
      }
    } else {
      // no change found in old_mapping
      deleteFinalQuery;
    }
    // new student adding
      let mapParentStudent = "";
      if(typeof new_mapping !== 'undefined'){
        for (let i=0; i < new_mapping.length; i++) {
          var newMap = `('${session.schoolId}', '${parent_id}', '${new_mapping[i]}'),`;
          mapParentStudent = mapParentStudent + newMap;
        }
      } else {
        mapParentStudent = ",";
      }

      var final_value = mapParentStudent.slice(0, -1)

      if(final_value.length > 0 ){
      var mapStuParent = `${deleteFinalQuery} INSERT INTO school_parent_student_map (stu_school_id, parent_id, ml_student_id) VALUES ${final_value} ON DUPLICATE KEY UPDATE deleted_at = NULL`;
      dbcon.query(mapStuParent, (err, result) => {
        if(err) throw err;
        req.flash('success', 'Parent and Student Map updated  successfully.');
        return res.redirect('/school/dashboard/parents');
      })
    } else if(final_value.length == 0 && deleteFinalQuery.length > 0){
      dbcon.query(deleteFinalQuery, (err, deleted) => {
        if(err) throw err;
        req.flash('success', 'Parent and Student Map updated  successfully.');
        return res.redirect('/school/dashboard/parents');
      })
      
    } else {
      req.flash('success', 'No changes made.');
        return res.redirect('/school/dashboard/parents');
    }
     
  } catch(err){
    console.log(err);
  }
}

// delete Parent account by School
exports.deleteParentAcc = (req, res) => {
  let err_msg = req.flash('err_msg');
  res.locals.err_msg = err_msg;
  let success_msg = req.flash('success');
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var deleteParent = `UPDATE school_main_login SET status='${req.body.status_edit}', deleted_at = CURRENT_TIMESTAMP WHERE id='${req.params.parent_id}'`;
    dbcon.query(deleteParent, (err, deletedParent) => {
      if(err) throw err;
      req.flash('success', 'Parent account has been deleted successfully.');
      return res.redirect('/school/dashboard/parents');
    })
  } catch(err) {
    console.log(err);
  }
}