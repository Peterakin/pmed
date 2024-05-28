import React from "react";
import { useState, useEffect } from "react";
import './Userrecord.css';
import Sidenav from "../components/Sidenav";
import { useUserContext } from '../context/Usercontext';
import axios from "axios";

const Userrecord = () => {

  const {userValue} = useUserContext()
  const userid = userValue._id
  const [record, setRecord] = useState({});

  const getUserrecord = async() => {
    const myrecord = await axios.post('http://localhost:1602/getrecord',  {userid})
    setRecord(myrecord.data.data.recordExist);
  }
  
  useEffect(() => {
    getUserrecord()
 }, [])

  return (
    <div className="userrecord">
      <Sidenav />
      <div className="medical-record-card">
        <h1>Medical Record</h1>
        <div className="record-section">
          <h2>Patient Information</h2>
          <ul>
            <li>
              <span>Firstname:</span> {record.firstname}
            </li>
            <li>
              <span>Lastname:</span> {record.lastname}
            </li>
            <li>
              <span>Date of Birth:</span> {record.dateofbirth}
            </li>
            <li>
              <span>Phone Number:</span> {record.phonenumber}
            </li>
            <li>
              <span>Gender:</span> {record.gender}
            </li>
           
            <li>
              <span>Religion:</span> {record.religion}
            </li>
          </ul>
        </div>
        <div className="record-section">
          <h2>Demographics</h2>
          <ul>
            <li>
              <span>Address:</span> {record.address}
            </li>
            <li>
              <span>Nationality:</span> {record.nationality}
            </li>
            <li>
              <span>LGA:</span> {record.lga}
            </li>
          </ul>
        </div>
        <div className="record-section">
          <h2>Medical Information</h2>
          <ul>
            <li>
              <span>Blood Group:</span> {record.bloodgroup}
            </li>
            <li>
              <span>Genotype:</span> {record.genotype}
            </li>
            <li>
              <span>Allergies:</span> {record.allergies}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Userrecord;