const roles = require("../roles");
const userPolicy = require("./user.policy");
const adminPolicy = require("./admin.policy");
const superAdminPolicy = require("./superAdmin.policy");
const premiumUserPolicy = require("./premiumUser.policy");

const options = {
  [roles.ADMIN]: { can: adminPolicy },
  [roles.SUPER_ADMIN]: { can: superAdminPolicy },
  [roles.PREMIUM_USER]: { can: premiumUserPolicy },
  [roles.USER]: { can: userPolicy },
};

module.exports = options;
