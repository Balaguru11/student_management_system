// exports.isAuth = async (req, res, next) => {
//   let session = req.session;
//   if (session.logged_in) {
//     // console.log("Logged in response from Isauth middleware");
//     next();
//   } else {
//     req.flash("err_msg", "You are not logged in.");
//     return res.redirect("/");
//   }
// };

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
