const express = require("express");
const app = express();
const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");

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


const userRoute = require("./routes/userRoute");
const userLoginDataRoute = require("./routes/userLoginDataRoute");
const path = require("path");

app.use("/api/user/", userRoute);
app.use("/api/userlogin/", userLoginDataRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client/build/index.html"));
//   });
// }

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
