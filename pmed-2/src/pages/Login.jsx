import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const {updateUser} = useUserContext()

    const loginUser = async(e) =>{
      e.preventDefault()

      try {
        const user = await axios.post('http://localhost:1602/login', {email, password})

        console.log(user.data)
        const role = user.data.data.user.role;
        

        if(user.data.error){
          return alert(user.data.error.message)
        }

        updateUser(user.data.data.user)
        if(role == "doctor"){
          navigate('/drhome')
        }else{
          navigate('/')
        }

      
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className="root">
    <div className='login-page'>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
        <label>
                Email:
                <input type="text" required  placeholder='Email' value={email} onChange={(e) =>setEmail(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" required placeholder='Password' value={password} onChange={(e) =>setPassword(e.target.value)}/>
            </label>
            <button type="submit">Login</button>
            <a href="/register" className='link'>Dont have an account please register</a>
        </form>
    </div>
    </div>
  )
}

export default Login