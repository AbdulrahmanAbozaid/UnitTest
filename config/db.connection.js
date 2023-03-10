const mongoose = require("mongoose");

const connection = () =>
  mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected To MongoDB!!"))
    .catch((e) => console.log("Mongoose Error: " + e));

module.exports = {
  connection,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.CONNECTION_STRING);
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
