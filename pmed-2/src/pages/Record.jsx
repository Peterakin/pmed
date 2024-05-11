import React, { useState } from 'react';
import Sidenav from '../components/Sidenav';
import './Record.css';

const Record = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    bloodGroup: '',
    genotype: '',
    nationality: '',
    lga: '',
    religion: '',
    allergies: false,
  });

  const handleInputChange = (e) => {
    setForm({
     ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAllergiesChange = (e) => {
    setForm({
     ...form,
      allergies: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(form);
  };

  return (
    <div className='record'>
      <Sidenav />
      <div className="main-content">
        <h1>Record</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex' }}>
          <label>
            First Name:
            <input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Last Name:
            <input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Date of Birth:
            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleInputChange} />
          </label>
          </div>
          <br />
          <label>
            Gender:
            <select name="gender" value={form.gender} onChange={handleInputChange}>
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />
          <label>
            Address:
            <textarea name="address" value={form.address} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Phone Number:
            <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleInputChange} />
          </label>
          <br />
          <div style={{ display: 'flex' }}>
          <label>
            Blood Group:
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleInputChange}>
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
            <select name="genotype" value={form.genotype} onChange={handleInputChange}>
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
            <input type="text" name="nationality" value={form.nationality} onChange={handleInputChange} />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            LGA:
            <input type="text" name="lga" value={form.lga} onChange={handleInputChange} />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Religion:
            <input type="text" name="religion" value={form.religion} onChange={handleInputChange} />
          </label>
          </div>
          <br />
          <label>
            Allergies:
            <input type="checkbox" name="allergies" checked={form.allergies} onChange={handleAllergiesChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Record;