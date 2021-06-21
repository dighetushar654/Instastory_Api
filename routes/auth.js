const router = require("express").Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async(req, res) => {
    try{
        // Genarate New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // Create New User
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        // save user and response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).status(err);
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).send("wrong password");

        res.status(200).send(user);
    } catch (err) {
        res.status(500).status(err);
    }
    })


module.exports = router