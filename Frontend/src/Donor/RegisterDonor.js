import '../Components/Login.css'
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
function RegisterDonor(){
    const [name,setName]=useState("");
    const [phoneNumber,setPhoneNumber]=useState();
    const [location,setLocation]=useState("");
    const [pinCode,setPinCode]=useState();
    const [bloodGroup,setBloodGroup]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [status,setStatus]=useState(false);

    //
    const [lastDate,setLastDate]=useState("7/12/2000");
    const [nextDate,setNextDate]=useState("7/12/2000");

    const registerHandeler=(event)=>{
        event.preventDefault();
        
        //creating registerdataObject
        const registerData={
        "name":name,
        "phoneNumber":phoneNumber,
        "location":location,
        "pinCode":pinCode,
        "bloodGroup":bloodGroup,
        "email":email,
        "password":password,
        "status":status,
        "lastDate":new Date("12/17/2000").toLocaleString(),
        "nextDate":new Date("12/17/2000").toLocaleString(),
        }

        //axios 
        axios
        .post('https://blood-donation-api-ng4t.onrender.com/registerDonor', registerData)
        .then(() => {
            console.log("Data Created added to database")
            alert('Registration Sucessfull')
        })
        .catch(err => {
          console.error(err);
          alert("Something Error Try again")
        });
        event.target.reset();
     
    }
    return(
        <div>
        <div  className="container">
        <form className='registerForm' onSubmit={registerHandeler}>
        <h4>Register</h4>

        <div className='location'>
        <div>
        <label>Name</label>
        <br></br>
        <input type='text' className='input' onChange={event =>setName(event.target.value)}></input>
        </div>
        <div>
        <label>Phone No</label>
        <br></br>
        <input type='number' className='input' onChange={event =>setPhoneNumber(event.target.value)}></input>
        </div>
        </div>

        <div className='location'>
        <div>
        <label>Location</label>
        <br></br>
        <input type='text' className='input' onChange={event =>setLocation(event.target.value)}></input>
        </div>  
        <div>
        <label>Pin Code</label>
        <br></br>
        <input type='number' className='input' onChange={event =>setPinCode(event.target.value)}></input>
        </div>  
        </div>
        <label >Blood Group</label>
        <br></br>
        <input type='text' className='input' onChange={event =>setBloodGroup(event.target.value)}></input>
        <br></br>

        <div className='location'>
        <div>
        <label>Email Id</label>
        <br></br>
        <input type="text" placeholder="xyz.@gmail.com" className='input' onChange={event =>setEmail(event.target.value)}></input>
        </div>
        <div>
        <label>Password</label>
        <br></br>
        <input type="password" className='input' onChange={event =>setPassword(event.target.value)}></input>
        </div>
        </div>
        <button type='submit'>Register</button>
        <h6>You allready have an account ? <Link to="/LoginDonor"><span>Login</span></Link></h6>
        </form>
        <div className='imageHolder'>
            <img src='https://static.vecteezy.com/system/resources/previews/000/655/122/original/vector-blood-donation-charity-cartoons.jpg' alt=''></img>
        </div>
        
        </div>
        <Outlet />
        </div>
    );
}
export default RegisterDonor;