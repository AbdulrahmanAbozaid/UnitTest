// Base
const app = require("express").Router();
const controller = require("../../controller/blog.controller");

// Authentication Base
let { checkSession } = require("../../utils/checkAuth.utils");
const { verifyToken } = require("../../utils/token.utils");
const { checkRole, checkBlogsLimit } = require("../../utils/checkRole.utils");
const endPoints = require("../../helpers/endPoints");

// Methods

// get
app.get(
  "/",
  [verifyToken, checkSession, checkRole(endPoints.GET_ALL_BLOGS)],
  controller.getAllBlogs
);
app.get(
  "/getAllBlogs",
  [verifyToken, checkSession, checkRole(endPoints.GET_ALL_BLOGS)],
  controller.getAllBlogs
);
app.get("/getBlogById/:id", controller.getBlogById);
app.get("/getBlogByTitle/:title", controller.getBlogByTitle);
app.get("/getAllBlogsPaginated", controller.getAllBlogsPaginated);
app.get("/getUserBlogs/:id", controller.getUserBlogs);

// post
app.post(
  "/addBlog/:userId",
  [verifyToken, checkSession, checkRole(endPoints.ADD_BLOG), checkBlogsLimit],
  controller.addBlog
);
app.put("/updateBlog/:id", controller.updateBlog);
app.delete(
  "/deleteBlog/:userId/:blogId",
  [verifyToken, checkSession, checkRole(endPoints.DELETE_BLOG)],
  controller.deleteBlog
);

// Exports
module.exports = app;
