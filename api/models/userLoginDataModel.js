const mongoose = require("mongoose");
const userLoginDataSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        id: {type: String},
        username: { type: String, default: "" },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        mobileNumber: { type: Number },
        gender: { type: String, enum: [ "Male", "Female" ] },
        location: { type: String, default: "" },
        hometown: { type: String, default: "" },
        birthday: { type: Date },
        porfilePicture: { type: String, default: "" },
        likes: { type: Array, default: [] },
        friends: { type: Number },
        verifiedEmail: { type: Boolean },
        isGuestUser: { type: Boolean },
        locale: { type: String, default: "" },
        posts : { type : Array , default : [] },
        avatar_url: { type: String, default: "" },
        bio: { type: String, default: "" },
        created_at: { type: String, default: "" },
        events_url: { type: String, default: "" },
        followers: { type: Number },
        followers_url: { type: String, default: "" },
        following: { type: Number },
        following_url: { type: String, default: "" },
        gists_url: { type: String, default: "" },
        updated_at: { type: String, default: "" },
        organizations_url: { type: String, default: "" },
        public_repos: { type: Number },
        received_events_url: { type: String, default: "" },
        repos_url: { type: String, default: "" },
        site_admin: { type: Boolean },
        subscriptions_url: { type: String, default: "" },
        twitter_username: { type: String, default: "" },
        type: { type: String, default: "" },
        blog: { type: String, default: "" },
        profile_url: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

const userLoginDataModel = mongoose.model("user_login", userLoginDataSchema);
module.exports = userLoginDataModel;
