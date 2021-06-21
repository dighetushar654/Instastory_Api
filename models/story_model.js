const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User"
    },
    story:{
        type: String,
    },
    views :{
        type: Number, 
        default: 0
    }
},
{timestamps: true});

module.exports = mongoose.model("Story", storySchema);