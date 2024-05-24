import React, { useState } from 'react';
import Sidenav from '../components/Sidenav';
import { useUserContext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';
import './Record.css';
import axios from 'axios';

const Record = () => {

  const {userValue} = useUserContext()

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [dateofbirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [bloodgroup, setBloodgroup] = useState('')
  const [genotype, setGenotype] = useState('')
  const [nationality, setNationality] = useState('')
  const [lga, setLga] = useState('')
  const [religion, setReligion] = useState('')
  const [allergies, setAllergies] = useState('')

  const navigate = useNavigate()

  const submitRecord = async(e) =>{
    e.preventDefault()
    try {
    const record = await axios.post('http://localhost:1602/record', {firstname, lastname, dateofbirth, gender, address, phonenumber, bloodgroup, genotype, nationality, lga, religion, allergies, userid: userValue._id})

    if(record.data.error){
        return alert(record.data.error.message)
    }

    navigate('/userrecord')

    } catch (error) {
        console.error(error)
    }
}


  return (
    <div className='record'>
      <Sidenav />
      <div className="main-content">
        <h1>Record</h1>
        <form onSubmit={submitRecord}>
          <div style={{ display: 'flex' }}>
          <label>
            First Name:
            <input type="text" name="firstName" value={firstname} onChange={(e) =>setFirstName(e.target.value)} />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Last Name:
            <input type="text" name="lastName" value={lastname} onChange={(e) =>setLastName(e.target.value)}/>
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Date of Birth:
            <input type="date" name="dateOfBirth" value={dateofbirth} onChange={(e) =>setDateOfBirth(e.target.value)} />
          </label>
          </div>
          <br />
          <label>
            Gender:
            <select name="gender" value={gender} onChange={(e) =>setGender(e.target.value)}>
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />
          <label>
            Address:
            <textarea name="address" value={address} onChange={(e) =>setAddress(e.target.value)} />
          </label>
          <br />
          <label>
            Phone Number:
            <input type="tel" name="phoneNumber" value={phonenumber} onChange={(e) =>setPhoneNumber(e.target.value)} />
          </label>
          <br />
          <div style={{ display: 'flex' }}>
          <label>
            Blood Group:
            <select name="bloodGroup" value={bloodgroup} onChange={(e) =>setBloodgroup(e.target.value)}>
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Genotype:
            <select name="genotype" value={genotype} onChange={(e) =>setGenotype(e.target.value)}>
              <option value=""></option>
              <option value="AA">AA</option>
              <option value="AS">AS</option>
              <option value="SS">SS</option>
              <option value="AC">AC</option>
              <option value="SC">SC</option>
            </select>
          </label>
          </div>
          <br />
          <div style={{ display: 'flex' }}>
          <label>
            Nationality:
            <input type="text" name="nationality" value={nationality} onChange={(e) =>setNationality(e.target.value)}/>
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            LGA:
            <input type="text" name="lga" value={lga} onChange={(e) =>setLga(e.target.value)} />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Religion:
            <input type="text" name="religion" value={religion} onChange={(e) =>setReligion(e.target.value)} />
          </label>
          </div>
          <br />
          <label>
            Allergies:
            <input type="text" name="allergies" value={allergies} onChange={(e) =>setAllergies(e.target.value)}/>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Record;