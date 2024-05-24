import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import "./Appointment.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";

const Appointment = () => {
  const [symptoms, setSymptopms] = useState("");
  const [value, onChange] = useState(new Date());
  return (
    <div className="appointment">
      <Sidenav />
      <div className="appointment-main-content">
      <h1>Appointment and Symptoms</h1>
       <div className="appointment-form">
       <form>
          <label>
            <h3>Enter Symptoms</h3>
            <input
              type="text"
              required
              placeholder="Enter Symptoms"
              value={symptoms}
              onChange={(e) => setSymptopms(e.target.value)}
            />
          </label>
          <label>
            <h3>Book Appointment Date and Time</h3>
            <div>
              <DateTimePicker
                placeholder="Choose a Date and Time"
                onChange={onChange}
                value={value}
              />
            </div>
          </label>
          <button className="appointment-btn">Submit</button>
        </form>
       </div>
      </div>
      </div>
  );
};

export default Appointment;
