import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import { useState } from "react";
import LoginDonor from "./Donor/LoginDonor";
import RegisterDonor from "./Donor/RegisterDonor";
import ProfileDonor from "./Donor/ProfileDonor";
import DashboardDonor from "./Donor/DashboardDonor";
function App() {
 
  return (
    <div className="App">

      <BrowserRouter>
     <Routes>
      <Route path="/Login" element={<Login />}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home/>}/>

      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile />}/>

      {/* Donor Page */}

      <Route path="/LoginDonor" element={<LoginDonor />}/>
      <Route path="/registerDonor" element={<RegisterDonor/>} />
      <Route path="/profileDonor" element={<ProfileDonor/>} />
      <Route path="/dashboardDonor" element={<DashboardDonor/>} />
     </Routes>
     </BrowserRouter>
      
     
      
      
    </div>
  );
}

export default App;
