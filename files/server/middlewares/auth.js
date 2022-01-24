const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

exports.isSchool = async (req, res, next) => {
  let session = req.session;
  res.locals.logged_in = session.logged_in;
  res.locals.schoolUserName = session.schoolUserName;
  res.locals.schoolId = session.schoolId;
  res.locals.schoolStatus = session.schoolStatus;
  if (session.logged_in) {
    next();
  } else {
    req.flash("err_msg", "It seems you are not logged in.");
    return res.redirect("/");
  }
};

exports.isStaff = async (req, res, next) => {
  let session = req.session;
  res.locals.logged_in = session.logged_in;
  res.locals.staffUsername = session.username;
  res.locals.staffStatus = session.staffStatus;
  res.locals.staff_role = session.roleId;

  var doubtCount = `SELECT COUNT(doubt_title) AS newDoubts FROM school_student_doubts WHERE asked_to = '${session.staff_id}'; SELECT COUNT(message) AS newThread FROM school_doubt_thread AS sdt INNER JOIN school_student_doubts AS ssd ON ssd.id = sdt.doubt_ref_id WHERE message_by != '${session.staff_id}' AND ssd.asked_to = '${session.staff_id}' AND view_status = 'unread'`;
  dbcon.query(doubtCount, (err, count) => {
    if(err) throw err;
    res.locals.count = count;
  })
  // check school startus here and proceed further.
  if (session.logged_in) {
    var isSchoolActive = `SELECT EXISTS(SELECT * FROM school_add_school WHERE id='${session.school_id}' AND status='Active')`;
    dbcon.query(isSchoolActive, (err, schoolRes) => {
      if(err) throw err;
      else if(schoolRes.length == 1){
        next();
      } else {
        req.flash("err_msg", "Your School is not active yet. You cannot make any action.");
        return res.redirect("/");
      }
    })
  } else {
    req.flash("err_msg", "It seems you are not logged in.");
    return res.redirect("/");
  }
};

exports.isHM = async(req, res, next) => {
  let session = req.session;
  res.locals.staff_role = session.roleId;
  if(session.logged_in && session.roleId == 4) {
    next();
  } else {
    req.flash('err_msg', 'You are not authorized to do this action.');
    return res.redirect('/');
  }
};

exports.isTeacher = async(req, res, next) => {
  let session = req.session;
  res.locals.staff_role = session.roleId;
  // var doubtCount = `SELECT COUNT(doubt_title) AS newDoubts FROM school_student_doubts WHERE asked_to = '${session.staff_id}'; SELECT COUNT(message) AS newThread FROM school_doubt_thread AS sdt INNER JOIN school_student_doubts AS ssd ON ssd.id = sdt.doubt_ref_id WHERE message_by != '${session.staff_id}' AND ssd.asked_to = '${session.staff_id}'`;
  // dbcon.query(doubtCount, (err, count) => {
  //   if(err) throw err;
  //   console.log(count);
  //   res.locals.count = count;
  // })
  if(session.logged_in && session.roleId == 8) {
    next();
  } else {
    req.flash('err_msg', 'You are not authorized to do this action.');
    return res.redirect('/');
  }
};

exports.isAdmin = async(req, res, next) => {
  let session = req.session;
  res.locals.staff_role = session.roleId;
  if(session.logged_in && session.roleId == 9) {
    next();
  } else {
    req.flash('err_msg', 'You are not authorized to do this action.');
    return res.redirect('/');
  }
};

exports.isNTF = async(req, res, next) => {
  let session = req.session;
  res.locals.staff_role = session.roleId;
  if(session.logged_in && session.roleId == 2) {
    next();
  } else {
    req.flash('err_msg', 'You are not authorized to do this action.');
    return res.redirect('/');
  }
};

exports.isStudent = async (req, res, next) => {
  let session = req.session;
  res.locals.id = session.id;
  res.locals.school_id = session.school_id;
  res.locals.role_id_fk = session.role_id_fk;
  res.locals.studentUsername = session.username;
  res.locals.email = session.email;
  res.locals.studentStatus = session.studentStatus;
  res.locals.logged_in = session.logged_in;
  var doubtCount = `SELECT sdt.created_at, COUNT(sdt.message) AS new_messages FROM school_doubt_thread AS sdt INNER JOIN school_student_doubts AS ssd ON ssd.id = sdt.doubt_ref_id WHERE message_by != '${session.student_id}' AND ssd.asked_by = '${session.student_id}' AND sdt.view_status = 'unread'`;
    dbcon.query(doubtCount, (err, count) => {
      if(err) throw err;
      res.locals.newdoubts = count;
    })
  if (session.logged_in) {
      next();
  } else {
    req.flash("err_msg", "It seems you are not logged in.");
    return res.redirect("/");
  }
};


exports.isParent = async (req, res, next) => {
  let session = req.session;
  res.locals.school_id = session.school_id;
  res.role_id_fk = session.role_id_fk;
  res.locals.parentName = session.username;
  res.locals.email = session.email;
  res.locals.logged_in = session.logged_in;
  if (session.logged_in) {
    // var studentCard = `SELECT spam.ml_student_id, stu.name, spam.stu_school_id, sfs.class_std, sfs.medium, clr.class_section, sas.school_name FROM school_parent_student_map AS spam INNER JOIN school_student AS stu ON stu.student_id = spam.ml_student_id INNER JOIN school_student_admission AS stad ON stad.student_id = spam.ml_student_id INNER JOIN school_classroom AS clr ON clr.id = stad.class_section INNER JOIN school_feestructure AS sfs ON sfs.id = stad.class_medium INNER JOIN school_add_school AS sas ON sas.id = spam.stu_school_id WHERE spam.parent_id = '${session.parent_id}' ORDER BY ABS(sfs.class_std) DESC`;
    // dbcon.query(studentCard, (err, mappedStudents) => {
    //   if(err) throw err;
    //   res.locals.mappedStudents = mappedStudents;
    // })
    next();
  } else {
    req.flash("err_msg", "It seems you are not logged in.");
    return res.redirect("/");
  }
};
