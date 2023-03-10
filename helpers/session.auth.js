const session = require("express-session");
const mongoSessionStore = require("connect-mongodb-session")(session);

let sessionStore = new mongoSessionStore({
  uri: process.env.CONNECTION_STRING,
  collection: "mySession",
});

sessionStore.on("error", (err) => {
  console.log(`mongodb sesstion store error: ${err}`);
});

module.exports = session({
  store: sessionStore,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
});
