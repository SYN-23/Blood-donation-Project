import { useEffect, useState } from 'react';
import '../Components/Dashboard.css'
import axios from 'axios';

function RequestDonor({profile,id}){

    const[disable,setDisable]=useState(false);
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
        
    },[donor_id])

    // accept request by donor 
    function send(e,userEmail,userName,userPinCode,userPhoneNumber,userBloodGroup,donorEmail,donorName,donorPinCode,donorPhoneNumber,donorBloodGroup){
           deleteRequest(donor_id,userEmail);
           alert(donorBloodGroup)
           const registerData={
           
            "status":false,
            "lastDate":new Date().toLocaleString(),
            "nextDate":new Date(new Date().setDate(new Date().getDate() + 100)).toLocaleString(),
    }       

     axios
    .patch(`http://localhost:5000/updateDonor/${id}`, registerData)
    .then(() => {
        console.log("Data updated and added to database")
        //alert(`Your status change to ${message} `);
    })
    .catch(err => {
      console.error(err);
      alert("Something Error Try again")
    });

    if(donor_id !==''){
    const requestData={
        "userEmail":userEmail,
        "userName" :userName,
        "userPinCode":userPinCode,
        "userPhoneNumber":userPhoneNumber,
        "userBloodGroup":userBloodGroup,
        "donorEmail":donorEmail,
        "donorName":donorName,
        "donorPinCode":donorPinCode,
        "donorPhoneNumber":donorPhoneNumber,
        "donorBloodGroup":donorBloodGroup
        
    }

    axios
    .post('http://localhost:5000/donorToUserAccept', requestData)
    .then(() => {
        console.log("Data Created added to database")
        alert(`You sucessfully aceepted request of ${userName}`)
    })
    .catch(err => {
      console.error(err);
      alert("Something Error Try again")
    });
       
    }
}

    
    const cancel= (e,email)=>{
       
       deleteRequest(donor_id,email);
       window.location.reload(true)
    } 

    //reject request and delete diteals from database   
    function deleteRequest(donor_id,email){
        const data={
            userEmail:email,
            donorEmail:donor_id,
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
        <h5 className='name'>{profile.userName}</h5>
        <h5 className='pincode'>{profile.userPinCode}</h5>
        <h5 className='phoneNumber'>{profile.userPhoneNumber}</h5>
        <h5 className='bloodgroup'>{profile.userBloodGroup}</h5>

        <div className='buttonRequest'>
        <button disabled={disable} onClick={e=>send(e,profile.userEmail,profile.userName,profile.userPinCode,profile.userPhoneNumber,profile.userBloodGroup,profile.donorEmail,profile.donorName,profile.donorPinCode,profile.donorPhoneNumber,profile.donorBloodGroup)} >Accept Request</button>
        <button disabled={disable} onClick={e=>cancel(e,profile.userEmail)}>Cancel Request</button>
        </div>
    </div>
   )
}
export default RequestDonor;