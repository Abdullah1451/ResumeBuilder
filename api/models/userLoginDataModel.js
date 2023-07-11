const mongoose = require("mongoose");
const userLoginDataSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        username: { type: String, default: "" },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        mobileNumber: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

const userLoginDataModel = mongoose.model("user_login", userLoginDataSchema);
module.exports = userLoginDataModel;
