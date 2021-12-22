const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

exports.isSchool = async (req, res, next) => {
  let session = req.session;
  res.locals.loggedin = session.logged_in;
  res.locals.schoolUserName = session.schoolUserName;
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
  console.log(session);
  res.locals.loggedin = session.logged_in;
  res.locals.staffUsername = session.username;
  res.locals.staffStatus = session.staffStatus;
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
  res.locals.loggedin = session.logged_in;
  if (session.logged_in) {
    next();
  } else {
    req.flash("err_msg", "It seems you are not logged in.");
    return res.redirect("/");
  }
};





exports.isParent = async (req, res, next) => {
  let session = re.session;
  res.locals.school_id = session.school_id;
  res.role_id_fk = session.role_id_fk;
  res.locals.parentName = session.username;
  res.locals.email = session.email;
  res.locals.logged_in = session.logged_in;
  if (session.logged_in) {
    next();
  } else {
    req.flash("err_msg", "It seems you are not logged in.");
    return res.redirect("/");
  }
};
