const express = require("express");
const app = express();
const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors())
app.use(express.json());
const port = process.env.PORT || 5002;

const URL = "mongodb+srv://abdullah121:Email%40147@cluster0.8bgcjn2.mongodb.net/resume?retryWrites=true&w=majority";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


const userDetailsRoute = require("./routes/userDetailsRoute");
const userLoginDataRoute = require("./routes/userLoginDataRoute");
const path = require("path");

app.use("/api/userDetails/", userDetailsRoute);
app.use("/api/userlogin/", userLoginDataRoute);


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
