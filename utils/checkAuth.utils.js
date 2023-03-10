exports.checkSession = (req, res, next) => {
  // if (req.session.user) next();
  // else return res.status(401).json({ msg: "Unauthorized!" });
  next();
};
