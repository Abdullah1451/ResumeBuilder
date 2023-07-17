const { AES, enc } = require('crypto-js');
const express = require("express");
const axios = require("axios");
const UserLoginData = require("../models/userLoginDataModel");
const app = express.Router();
const secretKey = 'resumebuildertest655@gmail.com';

const CLIENT_KEY = "967278741aab4a1b098d69edd7e014ff08dc8b2c";
const CLIENT_ID = "6786c50c201453792949";

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
            else {
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


app.get("/getAccessToken", async (req, res) => {
    // console.log(req.query)

    const requestBody =
        `?client_id=${CLIENT_ID}&client_secret=${CLIENT_KEY}&code=${req.query.code}`

        console.log("first")
        await axios.post('https://github.com/login/oauth/access_token' + requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.data)
                // return response.json();
            })
            .then((data) => {
                console.log(data)
                // console.log(data)
                res.json(data)
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
                // Handle the error
            })
})


module.exports = app;