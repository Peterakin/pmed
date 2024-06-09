import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "../components/Drsidenav.css"
import { useUserContext } from '../context/Usercontext';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Drsidenav = () => {

    const {logout, userExist} = useUserContext()
    const navigate = useNavigate()
  
    useEffect(() =>{
      if(!userExist){
        navigate('/login')
      }
    },[userExist, navigate])
  return (
        <div className="bg-dark col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column">
          <div>
            <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-3 mt-2">
              <span className="ms-1 py-2 py-sm-0 fs-4 d-none d-sm-inline">
                PMED
              </span>
            </a>
            <hr className="text-secondary d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  to="/drhome"
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-house"></i>
                  <span className="ms-3 d-none d-sm-inline">Patients</span>
                </NavLink>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  to="/drappointments" 
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-person"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Appointment
                  </span>
                </NavLink>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  to="/drchat" 
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-person"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Chat with Patient
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="dropdown open">
            <NavLink
              className="text-decoration-none text-white dropdown-toggle p-3"
              to="/user"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle"></i>
              <span className="ms-2 d-none d-sm-inline">User</span>
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <NavLink className="dropdown-item" onClick={logout}>
                Log Out
              </NavLink>
            </div>
          </div>
        </div>
  )
}

export default Drsidenav