import React, { useState } from 'react'
import Sidenav from '../components/Sidenav';
import './Appointment.css';
import DateTimePicker from 'react-datetime-picker';

const Appointment = () => {
  const [symptoms,setSymptopms] = useState("")
  const [value, onChange] = useState(new Date());

  return (
    <div className='appointment'>
    <Sidenav/>
    <div className="main-content">
      <h1>Appointment</h1>
      <DateTimePicker className="date-time" onChange={onChange} value={value} />
    </div>
    </div>
  )
}

export default Appointment