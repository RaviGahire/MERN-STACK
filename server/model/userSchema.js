const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    "firstname": String,
    "lastname": String,
    "password":String,
    "phone": Number,
    "email": String,
    "city": String,
    "createdAt": {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('MERN_STACK_USER', userSchema, "MERN_STACK_USER")

