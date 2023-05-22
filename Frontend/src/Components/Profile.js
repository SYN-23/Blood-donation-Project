import './Profile.css'
import Navbar from "./Navbar";
import { useEffect,useState } from 'react';
import axios from 'axios';
function Profile(){
    const [donor_id, setDonor_id] = useState("");
    const [profile,setProfile]=useState([]);
    const[flag,setFlag]=useState(0);

    const[id,setId]=useState("");
    const [name,setName]=useState("");
    const [phoneNumber,setPhoneNumber]=useState();
    const [location,setLocation]=useState("");
    const [pinCode,setPinCode]=useState();
    const [bloodGroup,setBloodGroup]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    

    const [disable,setDisable]=useState(true);
    const [edit,setEdit]=useState(false);

    

    useEffect(()=>{

        if(flag===0){
        
        if(localStorage.getItem('donor_id'))
        {
            const did = localStorage.getItem('donor_id');
            setDonor_id(did)
        }
        else{
            setDonor_id('');
        }


        if(donor_id !==''){
        axios
        .get(`http://localhost:5000/getDiteals/${donor_id}` )
        .then((response)=>{
         setProfile(response.data);
         setId(response.data[0]._id);
         setName(response.data[0].name);
         setPhoneNumber(response.data[0].phoneNumber);
         setLocation(response.data[0].location);
         setPinCode(response.data[0].pinCode);
         setBloodGroup(response.data[0].bloodGroup);
         setEmail(response.data[0].email);
         setPassword(response.data[0].password);

        })
        .catch(err => {
            console.error(err);
            alert("Something Error Try again")
          });

        }
    }

       
    });

    function editProfile(){
        setDisable(false);
        setFlag(1);
        setEdit(true);

    }
    function handelConfirm(){
        const registerData={
            "name":name,
            "phoneNumber":phoneNumber,
            "location":location,
            "pinCode":pinCode,
            "bloodGroup":bloodGroup,
            "email":email,
            "password":password
            }

        axios
        .patch(`http://localhost:5000/updateUser/${id}`, registerData)
        .then(() => {
            console.log("Data updated and added to database")
            alert('Profile Update Sucessdully')
        })
        .catch(err => {
          console.error(err);
          alert("Something Error Try again")
        });
        setFlag(0);
        setDisable(true);
        setEdit(false);
    }

    
      
        


    return(
        <div>
         <Navbar></Navbar>
         <div className='containerProfile'>
            <button onClick={editProfile} disabled={edit} className='buttonEdit'>Edit</button>
         <div className='name'>
            <div>
                <label>Name</label>
                <br></br>
                <input value={name} disabled></input>
            </div>
            <div>
                <label>Phone Number</label>
                <br></br>
                <input value={phoneNumber} type='number' disabled={disable} onChange={(event)=>setPhoneNumber(event.target.value)} ></input>
            </div>
           </div>

           <div className='name'>
            <div>
                <label>Location</label>
                <br></br>
                <input value={location} type='text' disabled={disable} onChange={(event)=>setLocation(event.target.value)}></input>
            </div>
            <div>
                <label>Pin Code</label>
                <br></br>
                <input type='number' value={pinCode} disabled={disable} onChange={(event)=>setPinCode(event.target.value)}></input>
            </div>
           </div>
           
           <div className='bloodGroup'>
           <label>Blood Group</label>
           <br></br>
           <input value={bloodGroup} type='text' disabled={disable} onChange={(event)=>setBloodGroup(event.target.value)}></input>
           </div>

           <div className='name'>
            <div>
                <label>Email</label>
                <br></br>
                <input value={email} disabled></input>
            </div>
            <div>
                <label>Password</label>
                <br></br>
                <input value={password}  disabled={disable} onChange={(event)=>setPassword(event.target.value)} type='password'></input>
            </div>
           </div>

           <button disabled={disable} onClick={handelConfirm} className='buttonConfirm'>Confirm</button>

           </div>
           <div className='image'>
            <img src='%PUBLIC_URL%/profile background5.jpg' alt=''></img>
           </div>
        </div>
    );
}
export default Profile;