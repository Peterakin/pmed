const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    dateofbirth: String,
    gender: String,
    address: String,
    phonenumber: String,
    bloodgroup: String,
    genotype: String,
    nationality: String,
    lga: String,
    religion: String,
    allergies: String,
    userid: String
})

const Record = mongoose.model('record', recordSchema)
module.exports = Record