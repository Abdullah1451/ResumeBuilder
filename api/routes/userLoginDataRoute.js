const { AES, enc } = require('crypto-js');
const express = require("express");
const axios = require("axios");
const UserLoginData = require("../models/userLoginDataModel");
const app = express.Router();

const CLIENT_KEY = "967278741aab4a1b098d69edd7e014ff08dc8b2c";
const CLIENT_ID = "6786c50c201453792949";
const LINKEDIN_CLIENT_ID = "77lfgz6j5yn62l";
const LINKEDIN_SECRET_KEY = "QVLLnHaysWa1H6gi";

app.post("/register", async (req, res) => {
    try {
        const result = await UserLoginData.findOne({
            email: req.body.email,
        });

        if (result) {
            res.status(500).json("User already exists!");
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
        const user = await UserLoginData.findOne({
            email: req.body.userData.email,
        });
        if (user) {
            if (req.body.userData?.password === user?.password && req.body.userData.loginFrom === 'web') {
                res.send(user);
            }
            else if (user?.password && req.body.userData.loginFrom !== 'web') {
                if (req.body.userData.loginFrom === 'google') {
                    user.id = req.body.userData.id;
                    user.name = req.body.userData.name;
                    user.locale = req.body.userData.locale;
                    user.profilePicture = req.body.userData.profilePicture;
                    user.verifiedEmail = req.body.userData.verifiedEmail;
                }
                else if (req.body.userData.loginFrom === 'facebook') {
                    user.id = req.body.userData.id;
                    user.birthday = req.body.userData.birthday;
                    user.friends = req.body.userData.friends;
                    user.gender = req.body.userData.gender;
                    user.hometown_id = req.body.userData.hometown_id;
                    user.hometown_name = req.body.userData.hometown_name;
                    user.isGuestUser = req.body.userData.isGuestUser;
                    user.likes = req.body.userData.likes;
                    user.name = req.body.userData.name;
                    user.profilePicture = req.body.userData.profilePicture;
                    user.posts = req.body.userData.posts;
                }
                else if (req.body.userData.loginFrom === 'github') {
                    user.github_primary = req.body.userData.github_primary;
                    user.github_visibility = req.body.userData.github_visibility
                    user.id = req.body.userData.id;
                    user.avatar_url = req.body.userData.avatar_url;
                    user.bio = req.body.userData.bio;
                    user.created_at = req.body.userData.created_at;
                    user.events_url = req.body.userData.events_url;
                    user.followers = req.body.userData.followers;
                    user.followers_url = req.body.userData.followers_url;
                    user.following = req.body.userData.following;
                    user.following_url = req.body.userData.following_url;
                    user.gists_url = req.body.userData.gists_url;
                    user.updated_at = req.body.userData.updated_at;
                    user.organizations_url = req.body.userData.organizations_url;
                    user.public_repos = req.body.userData.public_repos;
                    user.received_events_url = req.body.userData.received_events_url;
                    user.repos_url = req.body.userData.repos_url;
                    user.site_admin = req.body.userData.site_admin;
                    user.subscriptions_url = req.body.userData.subscriptions_url;
                    user.twitter_username = req.body.userData.twitter_username;
                    user.type = req.body.userData.type;
                    user.profile_url = req.body.userData.profile_url;
                }
                else {
                    user.id = req.body.userData.id;
                    user.name = req.body.userData.name;
                    user.firstName = req.body.userData.firstName;
                    user.lastName = req.body.userData.lastName;
                    user.locale = req.body.userData.locale;
                    user.location = req.body.userData.firstName.location;
                    user.linkedinProfilePicture = req.body.userData.linkedinProfilePicture;
                    user.verifiedEmail = true;
                }
                await user.save(); // Save the updated document to the database
                res.send(user);
            }
            else if (!user?.password && req.body.userData.loginFrom !== 'web'){
                res.send(user);
            }
            else {
                res.status(401).json("Wrong Password!");
            }
        }
        else if (req.body.google_login) {
            res.send(null)
        }
        else {
            res.status(500).json("User not found!");
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


app.get("/getGithubAccessToken", async (req, res) => {
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


app.get("/getLinkedinAccessTokenAndUserData", async (req, res) => {
    const requestBody =
        `?grant_type=authorization_code&client_id=${LINKEDIN_CLIENT_ID}&client_secret=${LINKEDIN_SECRET_KEY}&code=${req.query.code}&redirect_uri=http://localhost:3000/linkedin`
    //GETTING LINKEDIN USER ACEESSTOKEN
    await axios.post('https://www.linkedin.com/oauth/v2/accessToken' + requestBody, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(async (response) => {
            let userData = {};
            if (response.data.access_token) {
                const accessToken = response.data.access_token
                //GETTING LINKEDIN USER EMAIL
                await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => {
                        userData.email = response.data.elements[0]['handle~'].emailAddress;
                    })
                    .then(async () => {
                        //GETTING LINKEDIN USER DATA
                        await axios.get('https://api.linkedin.com/v2/me', {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        })
                            .then((response) => {
                                userData = {
                                    ...userData,
                                    ...response.data
                                }
                            })
                            .then(async () => {
                                //GETTING LINKEDIN USER PROFILE PICTURE
                                await axios.get('https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))', {
                                    headers: {
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                })
                                    .then((response) => {
                                        userData = {
                                            ...userData,
                                            profilePicture: { ...response.data.profilePicture }
                                        }
                                    })
                            })
                            .catch((err) => { console.log(err) })
                    })
                    .catch((err) => { console.log(err) })
            }
            res.send(userData)
        })
        .catch((error) => {
            console.log(error)
            console.error('Error:', error);
        })
})


app.post("/isRegistered", async (req, res) => {
    try {
        const result = await UserLoginData.findOne({
            email: req.body.email,
        });

        if (result) {
            res.send(true)
        }
        else {
            res.send(false);
        }
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = app;