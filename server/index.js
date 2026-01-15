 const express = require("express");
require("dotenv").config();
const P = process.env.PORT;
const H = process.env.HOST;
const app = express();

//Express middlewares
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session 
const sessionMiddleware = require("./middlewares/session_middleware");
app.use(sessionMiddleware);

//Multer
const upload = require('./middlewares/multer_middleware')

//database connection 
const connectDB = require("./config/connectDB");

// routes
app.get("/", (req, res) => {
res.status(200).json({
    message:"Server is running, good job......!"
})});

//REST API 
const authRoutes = require('./routes/authRoutes')
app.use('/api',authRoutes)






//Server
app.listen(P, H, () => {
    console.log(`Server is runing on http://${H}:${P}`);
});
