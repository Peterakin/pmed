import './App.css';
import Sidenav from './components/Sidenav';
import Home from './pages/Home';
import Record from './pages/Record';
import Appointment from './pages/Appointment';
import { Route, Routes } from 'react-router-dom';


function App() {
  
  return (
    <>
    <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/booking' Component={Appointment}/>
        <Route path='/record' Component={Record}/>
    </Routes>
     {/* <Sidenav />
     <Home />
     <Record />
     <Appointment/> */}
    </>
  )
}

export default App
