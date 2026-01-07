const express = require("express");
require("dotenv").config();
const P = process.env.PORT;
const H = process.env.HOST;
const app = express();

//Express middlewares
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));

//Session 
const sessionMiddleware = require("./middlewares/session_middleware");
app.use(sessionMiddleware);

//Multer
const upload = require('./middlewares/multer_middleware')

//database connection 
const connectDB = require("./config/connectDB");

app.get("/", (req, res) => {
    res.send("Hello boss server is runing well good job......!");
});


app.listen(P, H, () => {
    console.log(`Server is runing on http://${H}:${P}`);
});
