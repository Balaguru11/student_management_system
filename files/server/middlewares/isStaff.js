exports.isAuth = async (req, res, next) => {
  let session = req.session;
  if (session.logged_in) {
    next();
  } else {
    return res.redirect("/");
  }
};
