const { AES, enc } = require('crypto-js');
const express = require("express");
const UserLoginData = require("../models/userLoginDataModel");
const app = express.Router();
const secretKey = 'resumebuildertest655@gmail.com';



const encryptText = (text) => {
    const encryptedText = AES.encrypt(text, secretKey).toString();
    return encryptedText;
};

const decryptText = (encryptedText) => {
    const decryptedText = AES.decrypt(encryptedText, secretKey).toString(enc.Utf8);
    return decryptedText;
};

app.post("/register", async (req, res) => {
    try {
        const result = await UserLoginData.findOne({
            email: req.body.email,
        });

        if (result) {
            res.status(500).json("registeration failed. already signed up");
        }
        else {
            req.body.password = encryptText(req.body.password)
            const newuser = new UserLoginData(req.body);
            await newuser.save();
            res.send("Registration Successfull...");

        }
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const result = await UserLoginData.findOne({
            email: req.body.email,
        });
        if (result) {
            if (req.body.password === decryptText(result.password)) {
                res.send(result);
            }
            else{
                res.status(401).json("Wrong Password.");
            }
        }
        else if (req.body.google_login) {
            res.send(null)
        }
        else {
            res.status(500).json("Login failed.");
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = app;