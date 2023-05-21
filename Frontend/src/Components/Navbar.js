import './Navbar.css';
import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
function Navbar(){
  const [donor_id, setDonor_id] = useState("");
  const [type,setType]=useState("");
  let navigate = useNavigate();
  
  //login as a user function
  function logInUser(){
    navigate('/Login');
    console.clear();
  }
   
  //login as a donor function
  function logInDonor(){
    navigate('/LoginDonor');
    console.clear();
  }
  useEffect(()=>{
    if(localStorage.getItem('authenticated'))
    {
        const authenticated = localStorage.getItem('authenticated')

        if(authenticated === false)
        {
            navigate('/') 
        }
    }
    else{
        navigate('/')   
    }
    if(localStorage.getItem('donor_id'))
        {
            const did = localStorage.getItem('donor_id');
            setDonor_id(did)
        }
        else{
            setDonor_id('');
        }

     if(localStorage.getItem('user')){
        
        setType("user");
     }else if(localStorage.getItem('donor')){
      setType("donor");
     }else{
      setType("");
     }
  },[]);

  
  

  function logOut(){
    localStorage.removeItem('authenticated');
    localStorage.removeItem('donor_id');
    localStorage.removeItem('user');
    localStorage.removeItem('donor');
    
    navigate('/');
    window.location.reload(true);
    console.clear();
  }




    return(
      <div className='navbar'>
        <div className='header'>
          <div className='information'>
          <h4>Email: bloodDonation@gmail.com</h4>
          <h4>||</h4>
          <h4>Phone N0: 0123456789</h4>
          </div>
          {
            donor_id ===''?(
          <div className='btnHolder'>
            <h4>Login As a</h4>
          <button onClick={logInUser}>User</button>
          <h4>/</h4>
          <button onClick={logInDonor}>Donor</button>
          </div>
            ):(
              <div className='btnHolder'>
              <h4>Log Out from your profile</h4>
            <button onClick={logOut}>Logout</button>
            </div>
            )
            }

        </div>

        <div className='switcher'>
         <h4>Blood Donation</h4>
         {
          type ==='' ?(
            <div className='switchHolder'>
          <NavLink activeclassname="active" className='link' to="/"><h4></h4></NavLink>
          </div>
          ):(
          type ==='user'?
             (
         
          <div className='switchHolder'>
          <NavLink activeclassname="active" className='link' to="/"><h4>Home</h4></NavLink>
           <NavLink activeclassname="active" className='link' to="/dashboard"><h4>Dashboard</h4></NavLink>
           <NavLink activeclassname="active" className='link' to="/profile"><h4>Profile</h4></NavLink>
          </div>
          ):(
            <div className='switchHolder'>
          <NavLink activeclassname="active" className='link' to="/"><h4>Home</h4></NavLink>
           <NavLink activeclassname="active" className='link' to="/dashboardDonor"><h4>Dashboard</h4></NavLink>
           <NavLink activeclassname="active" className='link' to="/profileDonor"><h4>Profile</h4></NavLink>
          </div>
          )
          
          )
        }  
        </div>
        <Outlet></Outlet>
      </div>

    );
}
export default Navbar;