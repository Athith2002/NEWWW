const mongoose = require("mongoose");

function connectToDb() {
  // Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
  mongoose.Promise = global.Promise;

  // Connect to the mongoDB instance and log a message
  // on success or failure
  mongoose.connect(process.env.DATABASE_URL, {});
  const db = mongoose.connection
    .once("open", () => console.log("Connected to MongoLab instance."))
    .on("error", (error) =>
      console.log("Error connecting to MongoLab:", error)
    );

  return db;
}

module.exports = connectToDb;
