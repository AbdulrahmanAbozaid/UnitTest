const app = require("express").Router();

let blogs = require("./blog/blog.routes");
let users = require("./user/user.routes");

app.use("/blogs", blogs);
app.use("/users", users);

module.exports = app;
