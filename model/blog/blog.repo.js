const Blog = require("./blog.model");

exports.isExist = async (filter) => {
  let blog = await Blog.findOne(filter);
  if (blog) {
    return {
      code: 200,
      record: blog,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Blog is not found",
    };
  }
};
exports.list = async (filter) => {
  let blogs = await Blog.find(filter);
  return {
    code: 200,
    records: blogs,
    success: true,
  };
};
exports.create = async (form) => {};
exports.update = async (id, form) => {};
exports.get = async (id) => {};
exports.remove = async (id) => {};
