const { AES, enc } = require('crypto-js');
const express = require("express");
const axios = require("axios");
const UserLoginData = require("../models/userLoginDataModel");
const app = express.Router();

const CLIENT_KEY = "967278741aab4a1b098d69edd7e014ff08dc8b2c";
const CLIENT_ID = "6786c50c201453792949";

app.post("/register", async (req, res) => {
    try {
        const result = await UserLoginData.findOne({
            email: req.body.email,
        });

        if (result) {
            res.status(500).json("registeration failed. already signed up");
        }
        else {
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
            email: req.body.userData.email,
        });
        if (result) {
            if (req.body.userData?.password === result?.password || req.body.userData.loginFrom !== 'web') {
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
            const params = new URLSearchParams(response.data)
            res.send({
                accessToken: params.get('access_token')
            });
        })
        .catch((error) => {
            console.log(error)
            console.error('Error:', error);
        })
})

module.exports = app;