const options = require("./policy/options");
const rbac = require("easy-rbac").create(options);

module.exports = rbac;
