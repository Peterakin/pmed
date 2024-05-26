import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import "./Appointment.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";

const Appointment = () => {
  const [symptoms, setSymptopms] = useState("");
  const [doctor, setDoctor] = useState("");
  const [value, onChange] = useState(new Date());
  const [predicted, setPredicted] = useState(false)

  const handlePredict = () =>{
    setPredicted(true)
  }
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
          <div>
            <h3>See Prediction</h3>
            <div className="prediction-box">
                <p>see predictions here</p>
            </div>
          </div>
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
          <div className="dr">
          <label>
            <h3>Select Doctor:</h3>
            <select name="Doctor" value={doctor} onChange={(e) =>setDoctor(e.target.value)}>
              <option value=""></option>
              <option value="Dr A">Dr A</option>
              <option value="Dr B">Dr B</option>
              <option value="Dr AB">Dr AB</option>
              <option value="Dr O">Dr O</option>
            </select>
          </label>
          </div>
          <div className="aptp-button">
          {predicted && <button className="appointment-btn">Submit</button>}
          {!predicted && <button onClick={handlePredict} className="predict-button">Predict</button>}
          </div>
        </form>
       </div>
      </div>
      </div>
  );
};

export default Appointment;
