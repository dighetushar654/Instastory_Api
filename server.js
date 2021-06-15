const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stories = require("./models/storyModel")

// App Config
const app = express();
const Port = process.env.Port || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB Config
mongoose.connect("mongodb://127.0.0.1:27017/insta", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then ( () => console.log("Connection Successful"))
.catch ( (err) => console.log(err));


// API Endpoints
app.get("/", (req, res) => {
    res.send("Hello From Express Server.........");
});

app.post("/posts", (req, res) => {
    const dbStories =req.body
    Stories.create(dbStories, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(200).send(data)
    })
})


app.get("/posts", (req, res) => {
    Stories.find((err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(200).send(data)
    })
})
// Listen
app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`);
})
