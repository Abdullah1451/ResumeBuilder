const mongoose = require("mongoose");
const userDetailSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    name: { type: String },
    mobileNumber: { type: String },
    registeredUser: { type: Boolean },
    portfolio: { type: String },
    userCurrentTitle: { type: String },
    carrierObjective: { type: String },
    github: { type: String },
    linkedin: { type: String },
    achievements: { type: Array },
    education: { type: Array },
    projects: { type: Array },
    skills: { type: Array },
    workExperience: { type: Array },
    summary: {type: String},
    other: {type: String},
  },
  {
    timestamps: true,
  }
);

const userDetailsModel = mongoose.model("userDetails", userDetailSchema);
module.exports = userDetailsModel;
