const express = require("express");
const UserDetails = require("../models/userDetailsModel");
const app = express.Router();

app.post("/saveResumeData", async (req, res) => {
  try {
    const result = await UserDetails.findOne({
      email: req.body.email,
    });
    if (result) {
      result.name = req.body.name || result.name;
      result.mobileNumber = req.body.mobileNumber || result.mobileNumber;
      result.userCurrentTitle = req.body.userCurrentTitle || result.userCurrentTitle;
      result.registeredUser = req.body.registeredUser || result.registeredUser;
      result.github = req.body.github || result.github;
      result.linkedin = req.body.linkedin || result.linkedin;
      result.summary = req.body.summary || result.summary;
      result.other = req.body.other || result.other;
      result.basicInfoTitle = req.body.basicInfoTitle || result.basicInfoTitle;
      result.achievementsTitle = req.body.achievementsTitle || result.achievementsTitle;
      result.educationTitle = req.body.educationTitle || result.educationTitle;
      result.projectsTitle = req.body.projectsTitle || result.projectsTitle;
      result.skillsTitle = req.body.skillsTitle || result.skillsTitle;
      result.workExperienceTitle = req.body.workExperienceTitle || result.workExperienceTitle;
      result.summaryTitle = req.body.summaryTitle || result.summaryTitle;
      result.otherTitle = req.body.otherTitle || result.otherTitle;
      if (req.body.workExperience.length > 0) {
        result.workExperience = req.body.workExperience
      }
      if (req.body.achievements.length > 0) {
        result.achievements = req.body.achievements
      }
      if (req.body.education.length > 0) {
        result.education = req.body.education;
      }
      if (req.body.projects.length > 0) {
        result.projects = req.body.projects
      }
      if (req.body.skills.length > 0) {
        result.skills = req.body.skills
      }
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
      email: req.query.email,
    });
    if (result) {
      res.send(result)
    }
    else {
      res.send(null)
    }
  }
  catch (error) {
    res.satus(400).json(error);
  }
});

module.exports = app;
