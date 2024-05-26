const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    symptoms: String,
    dateandtime: String,
    approved: Boolean
})

const Appointment = mongoose.model('appointment', appointmentSchema)
module.exports = Appointment