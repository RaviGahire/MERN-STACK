const session = require('express-session');
const SECRET_KEY = process.env.SECRET_KEY;

if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY missing in .env file");
}

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: SECRET_KEY,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }

})
module.exports = sessionMiddleware;