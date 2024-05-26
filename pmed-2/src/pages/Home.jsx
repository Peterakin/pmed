import React from "react";
import Sidenav from "../components/Sidenav";
import "./Home.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const gotToBookings = () => {
    navigate("/booking");
  };
  const gotToRecords = () => {
    navigate("/record");
  };

  return (
    <div className="home">
      <Sidenav />
      <div className="main-content">
        <h1>Welcome Patient</h1>
        <div className="grid">
          <div>
            <h2>Book Appointment</h2>
            <button onClick={() => gotToBookings()}>Click Here</button>
          </div>
          <div>
            <h2>Check Medical Record</h2>
            <button onClick={() => gotToRecords()}>Click Here</button>
          </div>
        </div>
        <div>
          <h2 className="appointment-h2">My Appointment</h2>
          <ListGroup className="appointment-list">
            <ListGroup.Item>Dr Name  Appointment Date</ListGroup.Item>
            <ListGroup.Item>Dr Name  Appointment Date</ListGroup.Item>
            <ListGroup.Item>Dr Name  Appointment Date</ListGroup.Item>
            <ListGroup.Item>Dr Name  Appointment Date</ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Home;
