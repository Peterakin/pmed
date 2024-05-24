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
      <div>
        <h1>Medical Record</h1>
        <h2>Firstname:{record.firstname}</h2>
        <h2>Lastname:{record.lastname}</h2> 
        <h2>Dateofbirth:{record.dateofbirth}</h2>
        <h2>Gender:{record.gender}</h2>
        <h2>Address:{record.address}</h2>
        <h2>Phonenumber:{record.phonenumber}</h2>
        <h2>Bloodgroup:{record.bloodgroup}</h2>
        <h2>Genotype:{record.genotype}</h2>
        <h2>Nationality:{record.nationality}</h2>
        <h2>Lga:{record.lga}</h2>
        <h2>Religion:{record.religion}</h2>
        <h2>Allergies:{record.allergies}</h2>
      </div>
    </div>
  );
};

export default Userrecord;