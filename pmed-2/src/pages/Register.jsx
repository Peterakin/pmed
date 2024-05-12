import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    const navigate = useNavigate()

    const submitUser = async(e) =>{
        e.preventDefault()
        try {
        if(password !== confirmpassword){
            alert("Passwords do not match")
            throw new Error('password do not match')
        }    
        const user = await axios.post('http://localhost:1602/create', {email, fullname, password})

        if(user.data.error){
            return alert(user.data.error.message)
        }
        navigate('/login')

        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div className="root">
    <div className='register-page'>
        <h2>Register</h2>
        <form onSubmit={submitUser}>
            <label>
                Fullname:
                <input type="text" required placeholder='Fullname' value={fullname} onChange={(e) =>setFullname(e.target.value)}/>
            </label>
            <label>
                Email:
                <input type="text" required  placeholder='Email' value={email} onChange={(e) =>setEmail(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="text" required  placeholder='Password' value={password} onChange={(e) =>setPassword(e.target.value)}/>
            </label>
            <label>
                Confirm password:
                <input type="text" required  placeholder='Confirm password' value={confirmpassword} onChange={(e) =>setConfirmpassword(e.target.value)}/>
            </label>
            <button type="submit">Register</button>
        </form>
    </div>
    </div>

  )
}

export default Register