import React, { useState , useEffect } from 'react'
import Drsidenav from '../components/Drsidenav'
import './Drhome.css'
import axios from "axios";

const Drhome = () => {
  const getUsers = async() =>{
    const usersResponse = await axios.get('http://localhost:1602/getusers');
    const users = usersResponse.data.data.users;
    setUsers(users);
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='drhome'>
        <Drsidenav/>
        <div>
            <h1 className='drh1'>Welcome Doctor</h1>
            <div className="user-cards">
              {users.map((user) => (
                <div className="user-card" key={user._id}>
                  <h2>{user.fullname}</h2>
                  <p>Email: {user.email}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Drhome