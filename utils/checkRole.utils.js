const rbac = require("../helpers/rbac");

exports.checkRole = (endPoint) => async (req, res, next) => {
  const isAllowed = await rbac.can(req.session.user.role, endPoint);
  isAllowed ? next() : res.status(401).json({ msg: "Unauthorized" });
};

exports.checkBlogsLimit = async (req, res, next) => {
  if (
    req.session.user.role === "user" &&
    req.session.user.userBlogs.length >= 5
  )
    return res.status(401).json({
      msg: "You're limited to write 5 Blogs Only, Go Premium to add More!",
    });

  next();
};
