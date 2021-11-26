exports.isAuth = async (req, res, next) => {
  let session = req.session;
  console.log(session);
  if (session.logged_in) {
    res.locals.loggedin = true;
    next();
  } else {
    res.locals.loggedin = false;
    return res.redirect("/");
  }
};
