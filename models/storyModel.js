const mongoose = require("mongoose");

// Insta_Schema

const storySchema = new mongoose.Schema({
    story:{type: String},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    views :{type: Number, default: 0}
},
{timestamps: true});

const instaStories =  mongoose.model('instaStories', storySchema);
module.exports = instaStories