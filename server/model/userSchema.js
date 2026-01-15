const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    "firstname": String,
    "lastname": String,
    "password":String,
    "phone": Number,
    "email": String,
    "city": String,
    "role": {
        type: String,
        enum:['user','admin','superadmin'],
        default: 'user'
    },
    "createdAt": {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('MERN_STACK_USER', userSchema, "MERN_STACK_USER")

