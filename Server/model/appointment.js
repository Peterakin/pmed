const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  symptoms: String,
  dateandtime: String,
  prediction: String,
  doctor: String,
  approved: Boolean,
  userid: String,
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
