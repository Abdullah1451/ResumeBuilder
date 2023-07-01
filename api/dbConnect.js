const mongoose = require("mongoose");

const URL =
  "mongodb+srv://abdullah121:Email%40147@cluster0.8bgcjn2.mongodb.net/resume?retryWrites=true&w=majority";

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB connection Successful !!!");
});

connection.on("error", (err) => {
  console.error("Mongo DB connection Error --> ", err);
});
