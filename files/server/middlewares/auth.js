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
  res.locals.loggedin = session.logged_in;
  res.locals.staffUsername = session.username;
  res.locals.staffStatus = session.staffStatus;
  if (session.logged_in) {
    next();
  } else {
    req.flash("err_msg", "It seems you are not logged in.");
    return res.redirect("/");
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
