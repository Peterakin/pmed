import './App.css';
import Sidenav from './components/Sidenav';
import Home from './pages/Home';
import Record from './pages/Record';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import Register from './pages/Register';
import Userrecord from './pages/Userrecord';
import Drsidenav from './components/Drsidenav';
import Drhome from './pages/Drhome';
import Drappointments from './pages/Drappointments';
import Chatsystem from './pages/Chatsystem';
import Drchat from './pages/Drchat';
import UsercontextProvider from './context/Usercontext';
import { Route, Routes } from 'react-router-dom';


function App() {
  
  return (
    <>
    <UsercontextProvider>
    <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/booking' Component={Appointment}/>
        <Route path='/record' Component={Record}/>
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/userrecord' Component={Userrecord}/>
        <Route path='/drhome' Component={Drhome}/>
        <Route path='/drappointments'Component={Drappointments}/>
        <Route path='/chat' Component={Chatsystem}/>
        <Route path='/drchat' Component={Drchat}/>
    </Routes>
    </UsercontextProvider>
    </>
  )
}

export default App
