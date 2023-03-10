// Base
const userRepo = require("../model/user/user.repo");
const bcrypt = require("bcrypt");
const { generateToken, verifyAccount } = require("../utils/token.utils");
const { sendMail } = require("../utils/email.utils");
let sessionExpiry = 3600000 * 24;

// Methods

// GET Req Methods
let getAllUsers = async (req, res) => {
  let users = await userRepo.list();
  res.status(users.code).json(users);
};

let getUserById = async (req, res) => {
  let { id: _id } = req.params;
  let user = await userRepo.get(id);
  res.status(user.code).json(user);
};

// POST|PUT|Delete Req Methods
let register = async (req, res) => {
  let { record: user } = await userRepo.create(req.body);
  // Generate Token
  const token = await generateToken({ user });
  req.session.activationToken = token;
  req.session.user = user;
  await req.session.save();

  let activationLink = `http://localhost:8081/users/activateUser/${token}`;
  let receiver = req.body.email;
  let subject = "Account Activation";
  let text = "Confirm Your Account By Clicking This Link Below";
  let html = `<a>'${activationLink}'</a>`;
  await sendMail(receiver, subject, text, html);

  await res
    .status(201)
    .json({ msg: "registered", code: 201, success: true, user });
};

let deleteUser = async (req, res) => {
  let { id: _id } = req.params;
  let deleted = await userRepo.remove(_id);
  res.status(deleted.code).json(deleted);
};

let updateUser = async (req, res) => {
  let { id: _id } = req.params;
  let updated = await userRepo.update(_id, { ...req.body });
  res.status(updated.code).json(updated);
};

let login = async (req, res) => {
  let { email, password } = req.body;
  let { record: user } = await userRepo.get({ email });
  if (!user.error) {
    let match = await bcrypt.compare(password, user.password);
    if (!user.isActive)
      return res.status(403).json({ msg: "Email hasn't been Verified yet" });
    if (match) {
      const token = await generateToken({ user });

      req.session.cookie.maxAge = sessionExpiry;
      req.session.user = user;
      req.session.save();
      res.status(200).json({
        msg: "account is confirmed successfully",
        token,
      });
    } else res.status(401).json({ msg: "incorrect password" });
  } else res.status(404).json(user);
};

const activateUser = async (req, res) => {
  let { token } = req.params;
  if (verifyAccount(token, req.session.user.email)) {
    await userRepo.update(req.session.user._id, { isActive: true });
    res.status(200).json({ msg: "success" });
  } else res.status(401).json({ msg: "Unauthorized! token not found" });
};

const generateRecoveryCode = async (req, res) => {
  const token = Math.trunc(Math.random() * 1000000);
  req.session.activationCode = token;
  await req.session.save();

  // msg
  let receiver = req.body.email;
  let subject = "Email Recovery";
  let text = "Confirm Your Email By this Code Below";
  let html = `<h1>'${token}'</h1>`;

  // response
  await sendMail(receiver, subject, text, html);
  await res.status(201).json({
    msg: "Code sent",
    sendAgain: "http://localhost:8081/users/generateRecoveryCode",
  });
};

const checkRecoveryCode = async (req, res) => {
  let { code } = req.params;
  if (code == req.session.activationCode) {
    res.status(200).json({
      msg: "success!",
      updateURL: "http://localhost:8081/users/updateUser",
    });
  } else res.status(403).json({ msg: "wrong code!" });
};

// Exports
module.exports = {
  register,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  login,
  activateUser,
  generateRecoveryCode,
  checkRecoveryCode,
};
