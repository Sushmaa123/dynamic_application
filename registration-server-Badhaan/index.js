const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;
const userRouter = require("./Routes/user");

app.use("/", userRouter);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    mongoose.connect('mongodb://mongo:27017/budhan-users', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferTimeoutMS: 30000,       // Sets buffer timeout to 30 seconds
        connectTimeoutMS: 30000,      // Sets connection timeout to 30 seconds
        socketTimeoutMS: 45000        // Sets socket timeout to 45 seconds
    }, () => {
        console.log("connected to database");
    });

    console.log(`server is up at ${port}`);
});
