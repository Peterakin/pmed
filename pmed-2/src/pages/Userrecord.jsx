import React from "react";
import './Userrecord.css';
import Sidenav from "../components/Sidenav";
import { useUserContext } from '../context/Usercontext';
import axios from "axios";

const Userrecord = () => {

  const {userValue} = useUserContext()
  const userid = userValue._id

  const getUserrecord = async() => {
    console.log(userid)
    const myrecord = await axios.get('http://localhost:1602/getrecord',  {userid})
    console.log(myrecord)
    
  }
getUserrecord()

  return (
    <div className="userrecord">
      <Sidenav />
      <div>
        <h1>Medical Record</h1>
        <h2>firstname:</h2>
        <h2>lastname:</h2>
        <h2>dateofbirth:</h2>
        <h2>gender:</h2>
        <h2>address:</h2>
        <h2>phonenumber:</h2>
        <h2>bloodgroup:</h2>
        <h2> genotype:</h2>
        <h2>nationality:</h2>
        <h2>lga:</h2>
        <h2>religion:</h2>
        <h2>allergies:</h2>
      </div>
    </div>
  );
};

export default Userrecord;
