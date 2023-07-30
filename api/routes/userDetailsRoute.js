const express = require("express");
const UserDetails = require("../models/userDetailsModel");
const app = express.Router();

app.post("/saveResumeData", async (req, res) => {
  try {
    const result = await UserDetails.findOne({
      email: req.body.email,
    });
    if (result) {
      result = req.body;
      result.save();
      res.send('UPDATED SUCCESSFULLY')
    }
    else {
      const newUserData = new UserDetails(req.body);
      await newUserData.save();
      res.send('REGISTERED SUCCESFULLY')
    }
  }
  catch (error) {
    res.status(400).json(error);
  }
});

app.get("/getResumeData", async (req, res) => {
  try {
    const result = await UserDetails.findOne({
      email: req.body.email,
    });
    if (result) {
      res.send(result)
    }
    else {
      res.status(500).json("No Information Available!");
    }
  }
  catch (error) {
    res.satus(400).json(error);
  }
});

module.exports = app;
