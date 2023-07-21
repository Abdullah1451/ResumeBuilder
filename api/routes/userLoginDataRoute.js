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

    const requestBody =
        `?client_id=${CLIENT_ID}&client_secret=${CLIENT_KEY}&code=${req.query.code}`

    await axios.post('https://github.com/login/oauth/access_token' + requestBody, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            console.log("GITHUB ACCESS TOKEN")
            const params = new URLSearchParams(response.data)
            console.log(params.get('access_token'))
            res.send({
                accessToken: params.get('access_token')
            });
        })
        .catch((error) => {
            console.log(error)
            console.error('Error:', error);
        })
})


app.get("/getUserData", async (req, res) => {
    console.log(req.query.accessToken)
    await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${req.query.accessToken}`,
            Accept: 'application/json'
        }
    })
        .then((response) => {
            console.log("GITHUB LOGIN")
            console.log(response.data)
            res.send(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = app;