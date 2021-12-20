const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

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
          res.render("staffLevel/staff-dashboard", {
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

// Staff fills their Profile n sent to DB
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

exports.getStaffProfileEdit = (req, res) => {
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
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

// Staff edits profile and updates - need to update this.
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

// view students assigned to the staff
//there is an issue with this controller. Want to display only the students assigned to this staff but getting all.
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
    } else {
      req.flash("err_msg", "You are not authorized.");
      return res.redirect("/staff/dashboard");
    }
  } catch (err) {
    return res.render("server-error", { title: "Server Error" });
  }
};

// get One Student profile from the Student list
exports.getOneStudentProfile = (req, res) => {
  let session = req.session;
  // flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing sucecss_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  try {
    // See Profile of a student
    var student_id = req.params.student_id;
    var stuProfile = `SELECT * FROM school_student WHERE student_id='${student_id}'`;
    dbcon.query(stuProfile, (err, stuProfile) => {
      if (err) return res.render("server-error", { title: "Server Error" });
      res.locals.stuProfile = stuProfile;
      return res.redirect("/dashboard/students-list");
    });
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
      WHERE scs.school_id='${session.school_id}'`;
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
    var feeStrucData = `SELECT * FROM school_feestructure WHERE school_id='${session.school_id}' ORDER BY ABS(class_std)`;

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

// view User Accounts (ADMIN)
exports.viewUserAccounts = (req, res) => {
  //flashing err_msg
  let err_msg = req.flash("err_msg");
  res.locals.err_msg = err_msg;
  // flashing success_msg
  let success_msg = req.flash("success");
  res.locals.success_msg = success_msg;
  let session = req.session;
  try {
    var userAccData = `SELECT * FROM school_main_login WHERE school_id='${session.school_id}' AND NOT(role_id_fk='1') AND NOT(role_id_fk='5')`;

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

// Add User Accounts (ADMIN)
exports.postAddUser = async (req, res) => {
  try {
    //flashing err_msg
    let err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    // flashing success_msg
    let success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    let session = req.session;

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
      const school_id = session.school_id;
      const class_std = req.body.class_std;
      const medium = req.body.medium;
      const actual_fee = req.body.fee;

      var feeQuery = `SELECT EXISTS (SELECT * FROM school_feestructure WHERE school_id='${school_id}'AND class_std='${class_std}' AND medium='${medium}') AS count`;

      dbcon.query(feeQuery, (err, data) => {
        if (err) { throw err;
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







// staff_role HM

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
    var subjectsData = `SELECT * FROM school_subjects WHERE school_id='${session.school_id}'`;

    dbcon.query(subjectsData, (err, data) => {
      if (err) {
        return res.render("server-error", { title: "Server Error" });
      } else {
        res.locals.data = data;
        return res.render("schoolLevel/school-subjects", {
          title: "School Subjects",
          data,
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
    var classSecData = `SELECT clr.class_id, clr.class_section, clr.students_strength, sfs.class_std, sfs.id, sfs.medium FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id WHERE sfs.school_id = '${session.school_id}'`;

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

