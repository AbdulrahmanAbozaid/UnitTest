// Base
const app = require("express").Router();
let userController = require("../../controller/user.controller");
let validator = require("../../helpers/common.validate");
let {
  confirmPasswordValition,
  addUserValidation,
  updateUserValidation,
} = require("../../validation/user.validation");

// Authentication Base
let { checkSession } = require("../../utils/checkAuth.utils");
const { verifyToken } = require("../../utils/token.utils");
const { checkRole } = require("../../utils/checkRole.utils");
const endPoints = require("../../helpers/endPoints");

// GET Req Routes

app.get(
  "/getAllUsers",
  verifyToken(endPoints.GET_ALL_USERS),
  userController.getAllUsers
);
app.get("/", verifyToken(endPoints.GET_ALL_USERS), userController.getAllUsers);
app.get("/getUserById/:id", verifyToken, userController.getUserById);
app.get("/activateUser/:token", userController.activateUser);
// POST|PUT|Delete Req Routes

app.post("/register", validator(addUserValidation), userController.register);
app.post("/login", validator(confirmPasswordValition), userController.login);

app.put(
  "/updateUser/:id",
  [verifyToken(endPoints.UPDATE_USER), validator(updateUserValidation)],
  userController.updateUser
);
app.delete(
  "/deleteUser/:id",
  verifyToken(endPoints.DELETE_USER),
  userController.deleteUser
);
app.post("/generateRecoveryCode", userController.generateRecoveryCode);
app.get("/checkRecoveryCode/:code", userController.checkRecoveryCode);

module.exports = app;
