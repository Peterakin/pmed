import React, { useState, useEffect } from "react";
import Drsidenav from '../components/Drsidenav'
import './Drappointments.css'
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

const Drappointments = () => {
  const getAppointments = async () => {
    const appointment = await axios.get("http://localhost:1602/getappointments");
    const appointments = appointment.data.data.appointments
    console.log(appointments)
    setAppointments(appointments)
  } 

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className='drappointments'>
        <Drsidenav/>
        <div>
            <h1>Appointments</h1>
            <ListGroup className="appointment-list">
              {appointments.map((appointment, index) => (
                <ListGroup.Item className="listing" key={index}>
                  Doctor: {appointment.doctor}
                  Appointment Data and Time: {appointment.dateandtime}
                  Symptoms: {appointment.symptoms}
                  <button className="appointment-btn">Approve Appointment</button>
                </ListGroup.Item>
              ))}
            </ListGroup>
        </div>
    </div>
  )
}

export default Drappointments