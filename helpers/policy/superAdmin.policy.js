const endPoints = require("../endPoints");

module.exports = [
  endPoints.GET_ALL_BLOGS,
  endPoints.GET_ALL_USERS,
  endPoints.DELETE_BLOG,
  endPoints.UPDATE_USER,
  endPoints.DELETE_USER,
];

/*
const endPoints = require("../endPoints");
module.exports = [...Object.keys(endPoints)]
*/
