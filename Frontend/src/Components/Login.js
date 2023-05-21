import { useEffect, useState } from 'react';
import './Login.css'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import axios from 'axios';
function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[message,setMessage]=useState("");
    

    const[user,setUser]=useState([]);
    

    let navigate = useNavigate();
    const submitHandeler=(event)=>{
        event.preventDefault();

        if(email==="" && password===""){
            alert("Fill both email and password first")
            return
        }
        
   
        if(user.length>0){
            navigate('/');
            localStorage.setItem('authenticated','true');
            localStorage.setItem('donor_id', email);
            localStorage.setItem('user','true');
        }else{
            setMessage("You are not a registerd user Register First !!");
        }
}
    const fetchData=()=>{
        axios
        .post("http://localhost:5000/loginUser",{email,password})
        .then((response)=>{
        
         setUser(response.data);
         //console.log(user)
        })
        .catch(err => {
            console.error(err);
            alert("Something Error Try again")
          });

    }
    useEffect(()=>{
        fetchData();
        
    });
    

    
    return(
        <div>
     <div className="container">
        
       <form className='loginForm' onSubmit={submitHandeler}>
       <h4>Welcome Back User</h4>
        <label>Email Id</label>
        <br></br>
        <input type="text" placeholder="xyz.@gmail.com" className='input' onChange={event=>setEmail(event.target.value)}></input>
        <br></br>
        <label>Password</label>
        <br></br>
        <input type="password" className='input' onChange={event=>setPassword(event.target.value)}></input>
        <br></br>
        <button type='submit'>Log In</button>
        <p>{message}</p>
        <h6>Don't have any account ? <Link to="/register"><span>Register</span></Link></h6>
        </form>
        <div className='imageHolder'>
            <img src='https://static.vecteezy.com/system/resources/previews/000/655/122/original/vector-blood-donation-charity-cartoons.jpg' alt=''></img>
        </div>
        
     </div>
     <Outlet />
     </div>
    );
}
export default Login;