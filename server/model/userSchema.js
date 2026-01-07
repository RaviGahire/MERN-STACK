const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    "firstname": String,
    "lastname": String,
    "phone": Number,
    "email": String,
    "city": String,
})

module.exports = mongoose.model('MERN_STACK_USER',userSchema  ,"MERN_STACK_USER")

