const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String, 
        default:""
    },
    coverPicture:{
        type:String, 
        default:""
    },
    followers:{
        type:Array, 
        default:[]
    },
    followings:{
        type:Array, 
        default:[]
    },
    isAdmin:{
        type:Boolean, 
        default:false
    },
    desc:{
        type:String, 
        max:50
    },
    city:{
        type:String, 
        max:50
    },
    relationship:{
        type:Number, 
        enum:[1,2,3]
    },
    stories:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Story"
    }]
},
{timestamps: true});

module.exports = mongoose.model("User", userSchema);