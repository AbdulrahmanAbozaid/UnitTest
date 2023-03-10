const app = require("./app");
require("dotenv").config();

// Server
app.listen(process.env.PORT, () =>
  console.log(`Server Is Running On ${process.env.PORT}`)
);

module.exports = app;
