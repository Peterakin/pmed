const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email:{
        type: String,
        unique: true,
        lowercase: true 
    },
    password: String,
    role: String
})

const User = mongoose.model('user', userSchema)
module.exports = User