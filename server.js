const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require("helmet");
const userRoute = require("./routes/users")
const userAuth = require("./routes/auth");
const storyRoute = require("./routes/story");

// App Config
const app = express();                  // instanciating express() in app variable
dotenv.config();                        // to use .env variables
const Port = process.env.Port;

// DB Config
mongoose.connect("mongodb://mongo:27017/docker-node-mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then ( () => console.log("MongoDB Connected"))
.catch ( (err) => console.log(err));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/story", storyRoute);

//Default Route
app.get("/", (req, res) => {
    res.send("Hello From Server All Ok.........");
});

//Port for listening
app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`);
})
