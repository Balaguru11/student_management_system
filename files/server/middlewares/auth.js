exports.isAuth = async (req, res, next) => {
  res.send("Called");
  next();
};
