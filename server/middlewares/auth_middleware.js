const jwt = require('jsonwebtoken');

const verifyJWTToken = async (req, res, next) => {

    // front end side we get this token in header
    const authHeader = req.headers.authorization
    // console.log(authHeader)

    // check authHeader is present or not 
    if (!authHeader) {

        return res.status(401).json({ message: "Authorization header is missing" })

    }

    //split the token and i two part

    const token = authHeader.split(" ")[1] //take 1 index

    //check token is present in the header

    if (!token) {
        res.status(401).json({ message: 'Token is missing in header' })
    }


    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        //assing to req 
        req.user = decode

        // call next 
        next()

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error
        })
    }



}


module.exports = verifyJWTToken;