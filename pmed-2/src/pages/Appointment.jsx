import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import "./Appointment.css";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';


const Appointment = () => {
  const [symptoms, setSymptopms] = useState("");
  const [value, onChange] = useState(new Date());
  return (
    <div className="appointment">
      <Sidenav />
      <div className="main-content">
        <h1>Appointment</h1>
        <div className="p-5">
         <DateTimePicker placeholder="Choose a Date and Time"  onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
