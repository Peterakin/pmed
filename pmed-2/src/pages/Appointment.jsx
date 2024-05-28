import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import "./Appointment.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";

const Appointment = () => {
  const [symptoms, setSymptopms] = useState("");
  const [doctor, setDoctor] = useState("");
  const [value, onChange] = useState(new Date());
  const [predicted, setPredicted] = useState(false);

  const handlePredict = () => {
    setPredicted(true);
  };

  const getDoctors = async () => {
    const doctorsResponse = await axios.get("http://localhost:1602/getdoctors");
    const users = doctorsResponse.data.data.users;
    setUsers(users);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

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
                <select
                  name="Doctor"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option value=""></option>
                  {users.map((user, index) => (
                    <option key={index} value={user._id}>
                      Dr. {user.fullname}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="aptp-button">
              {predicted && <button className="appointment-btn">Submit</button>}
              {!predicted && (
                <button onClick={handlePredict} className="predict-button">
                  Predict
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
