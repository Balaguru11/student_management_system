exports.isAuth = async (req, res, next) => {
  let session = req.session;
  if (session.logged_in) {
    console.log("Logged in response from Isauth middleware");
    next();
  } else {
    console.log("Else response from Isauth middleware");
    return res.redirect("/");
  }
};
