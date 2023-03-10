exports.handleCorsPolicy = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  allowedMethods = ["POST", "GET", "DELETE", "PUT"];
  res.header("Access-Control-Allow-Methods", allowedMethods);
  if (allowedMethods.includes(req.method)) next();
  else return res.status(403).json({ msg: "Blocked By CORS Policy!" });
};
