const mongoose = require("mongoose");

// Insta_Schema

const instaSchema = new mongoose.Schema({
    url: String,
    user:String,
    text: String,
    views: String 
});

const instaStories =  mongoose.model('instaStories', instaSchema);
module.exports = instaStories