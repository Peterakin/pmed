// import React, { useState, useEffect } from "react";
// import Drsidenav from "../components/Drsidenav";
// import "./Drhome.css";
// import axios from "axios";
// import Modal from "../components/Modal"

// const Drhome = () => {
//   const getUsers = async () => {
//     const usersResponse = await axios.get("http://localhost:1602/getusers");
//     const users = usersResponse.data.data.users;
//     console.log(usersResponse)
//     setUsers(users);
//   };

//   const getRecords = async () => {
//     const recordsResponse = await axios.post('http://localhost:1602/getuserrecord')
//     console.log(recordsResponse)
//     setRecords(records)
//   }
 
//   const [users, setUsers] = useState([]);
//   const [records, setRecords] = useState([]);


//   useEffect(() => {
//     getUsers();
//     getRecords();
//   }, []);


  

//   return (
//     <div className="drhome">
//       <Drsidenav />
//       <div>
//         <h1 className="drh1">Welcome Doctor</h1>
//         <div className="user-cards">
//           {users.map((user) => (
//             <div className="user-card" key={user._id}>
//               <h2>{user.fullname}</h2>
//               <p>Email: {user.email}</p>
//               <Modal />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Drhome;

import React, { useState, useEffect } from "react";
import Drsidenav from "../components/Drsidenav";
import "./Drhome.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Drhome = () => {
  const getUsers = async () => {
    const usersResponse = await axios.get("http://localhost:1602/getusers");
    const users = usersResponse.data.data.users;
    console.log(usersResponse);
    setUsers(users);
  };

  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState({});
  const [showModal, setShowModal] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const handleClose = (id) => {
    setShowModal((prevShowModal) => ({...prevShowModal, [id]: false }));
  };
  const handleShow = async (id) => {
    try {
      const recordsResponse = await axios.post("http://localhost:1602/getuserrecord", { userid: id });
      const recordsData = recordsResponse.data.data.records;
      setRecords((prevRecords) => ({...prevRecords, [id]: recordsData }));
    } catch (error) {
      console.error(error);
    }
    setShowModal((prevShowModal) => ({...prevShowModal, [id]: true }));
  };

  return (
    <div className="drhome">
      <Drsidenav />
      <div>
        <h1 className="drh1">Welcome Doctor</h1>
        <div className="user-cards">
          {users.map((user) => (
            <div className="user-card" key={user._id}>
              <h2>{user.fullname}</h2>
              <p>Email: {user.email}</p>
              <Button variant="primary" onClick={() => handleShow(user._id)}>
                Patient Details
              </Button>

              <Modal
                show={showModal[user._id]}
                onHide={() => handleClose(user._id)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{user.fullname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Medical Record:</h4>
                  {records[user._id] && (
                    <div>
                      <p>
                        Date of Birth:{" "}
                        {records[user._id].dateofbirth}
                      </p>
                      <p>
                        Gender: {records[user._id].gender}
                      </p>
                      <p>
                        Address: {records[user._id].address}
                      </p>
                      <p>
                        Phone Number:{" "}
                        {records[user._id].phonenumber}
                      </p>
                      <p>
                        Blood Group:{" "}
                        {records[user._id].bloodgroup}
                      </p>
                      <p>
                        Genotype: {records[user._id].genotype}
                      </p>
                      <p>
                        Nationality:{" "}
                        {records[user._id].nationality}
                      </p>
                      <p>
                        LGA: {records[user._id].lga}
                      </p>
                      <p>
                        Religion: {records[user._id].religion}
                      </p>
                      <p>
                        Allergies: {records[user._id].allergies}
                      </p>
                    </div>
                  )}
                </Modal.Body>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drhome;