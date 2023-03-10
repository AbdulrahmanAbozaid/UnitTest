// Base
const Blog = require("../model/blog/blog.model");
const User = require("../model/user/user.model");

// Functions

// GET Req Methods
const getAllBlogs = async (req, res) => {
  let { page } = req.query;
  let skipped = (+page - 1) * 5;
  let allBlogs = page
    ? await Blog.find({}).select("-__v").limit(5).skip(skipped)
    : await Blog.find({}).select("-__v");

  res.status(200).json({ msg: "success", allBlogs });
};

const getBlogById = async (req, res) => {
  let { id: _id } = req.params;
  let blog = await Blog.findById(_id);
  res.status(200).json({ msg: "success", blog });
};

const getBlogByTitle = async (req, res) => {
  let { title } = req.params;
  let blog = await Blog.findOne({ title });
  res.status(200).json({ msg: "success", blog });
};

const getAllBlogsPaginated = async (req, res) => {
  let { page, size } = req.query;
  numOfItems = parseInt(size);
  skippedItems = (+page - 1) * numOfItems;
  let blogs = await Blog.find({}).limit(numOfItems).skip(skippedItems);
  res.status(200).json({ msg: "success", blogs });
};

const getUserBlogs = async (req, res) => {
  let { id: _id } = req.params;
  let { userBlogs } = await User.findById(_id).populate("userBlogs");
  res.status(200).json({ msg: "success", userBlogs });
};

// POST|PUT|Delete Req Methods
const addBlog = async (req, res) => {
  let { userId: _id } = req.params;
  let blog = new Blog(req.body);
  await blog.save();
  let user = await User.findByIdAndUpdate(_id, {
    $push: { userBlogs: blog._id },
  });
  req.session.user = user;
  req.session.save();
  res.status(201).json({ msg: "success" });
};

const updateBlog = async (req, res) => {
  let { id: _id } = req.params;
  let { title, content } = req.body;
  await Blog.findByIdAndUpdate(_id, { title, content });
  res.status(200).json({ msg: "updated" });
};

const deleteBlog = async (req, res) => {
  let { blogId, userId } = req.params;
  await Blog.findByIdAndDelete({ _id: blogId });
  await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { userBlogs: blogId } }
  );
  res.status(200).json({ msg: "deleted" });
};

// Exports
module.exports = {
  getAllBlogs,
  getBlogById,
  getBlogByTitle,
  addBlog,
  updateBlog,
  deleteBlog,
  getAllBlogsPaginated,
  getUserBlogs,
};
