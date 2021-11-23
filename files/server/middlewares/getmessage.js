exports.isMsg = async (req, res, next) => {
  let session = req.session;

  if (err_msg) {
    let err_msg = "";
    err_msg = req.flash("err_msg");
    res.locals.err_msg = err_msg;
    next();
  } else {
    let success_msg = "";
    success_msg = req.flash("success");
    res.locals.success_msg = success_msg;
    next();
  }
};
