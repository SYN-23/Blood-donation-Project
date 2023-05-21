import { useEffect, useState } from 'react';
import './Dashboard.css'
import axios from 'axios';

function RequestList({profile}){

    const[disable,setDisable]=useState(true);
    const[donor_id,setDonor_id]=useState("");
    useEffect(()=>{
        if(localStorage.getItem('donor_id'))
        {
            const did = localStorage.getItem('donor_id');
            setDonor_id(did)
            
        }
        else{
            setDonor_id('');
        }
        setDisable(!profile.request)
    },[])
    
   

    //delete request and delete diteals from database
    function cancel(e,email){
        setDisable(true);
       deleteRequest(donor_id,email);
       window.location.reload(true)
    }  
       
    function deleteRequest(donor_id,email){
        const data={
            userEmail:donor_id,
            donorEmail:email
        }
        axios
        .delete('http://localhost:5000/userToDonorDelete' ,{data:data})
        .then(() => {
            alert(`Request delete to ${email}`)
            console.log("Data Deleted From Database")
            
        })
        .catch(err => {
          console.error(err);
          alert("Something Error Try again")
        });
    }
    

   return(
    <div className="donorHolder">
        <h5 className='name'>{profile.donorName}</h5>
        <h5 className='pincode'>{profile.donorPinCode}</h5>
        <h5 className='phoneNumber'>{profile.donorPhoneNumber}</h5>
        <h5 className='bloodgroup'>{profile.donorBloodGroup}</h5>

        <div className='buttonRequest'>
        <button disabled={!disable}  >Send Request</button>
        <button disabled={disable} onClick={e=>cancel(e,profile.donorEmail)}>Cancel Request</button>
        </div>
    </div>
   )
}
export default RequestList;