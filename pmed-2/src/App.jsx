import './App.css';
import Sidenav from './components/Sidenav';
import Home from './pages/Home';
import Record from './pages/Record';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import Register from './pages/Register';
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
    </Routes>
    </UsercontextProvider>
    </>
  )
}

export default App
