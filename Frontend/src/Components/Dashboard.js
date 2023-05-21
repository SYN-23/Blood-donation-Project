import Navbar from "./Navbar";
import './Dashboard.css';
import DonorList from "./DonorList";
import {  useEffect, useState } from "react";
import axios from "axios";
import RequestList from "./RequestList";
function Dashboard(){

 
   
   const [pinCode,setPinCode]=useState();
   const [profile,setProfile]=useState([]);
   const [flag,setFlag]=useState(0);
   const [requestProfile,setRequestProfile]=useState([]);

   const[donor_id,setDonor_id]=useState("");

   

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

      // get diteals of donors who's are available
      {
      axios
        .get("http://localhost:5000/getDitealsStatus/true" )
        .then((response)=>{
         setProfile(response.data);
        })
        .catch(err => {
         console.error(err);
         alert("Something Error Try again")
       });
      
      }

      // get diteals of donors who's are reuqested by current login user
      if(donor_id !==''){
      axios
      .get(`http://localhost:5000/getRequestDiteals/${donor_id}` )
        .then((message)=>{
         setRequestProfile(message.data);
         
        })
        .catch(err => {
         console.error(err);
         alert("Something Error Try again")
       });
      }
      

   }
      
   },[donor_id])

  //Searching Profile by pincode
   function handelSearch(){
      
      let result = [];
      
      for(let i=0;i<profile.length;i++){
         if(pinCode==profile[i].pinCode){
            console.log(profile[i])
           result.push(profile[i])
           
         }
         
         setProfile(result);
      }
      
      
   }


   //
   



    return(
    <div  >
    <Navbar></Navbar>
    <div className="mainContain">
     <div className="search">
        <input placeholder="Search donor by pincode" type="number" onChange={event=>setPinCode(event.target.value)}></input>
        <button onClick={handelSearch}>Search</button>
     </div>

     <div className="requests">
        <h4>Sent Requests</h4>
        <div className="heading">
         <h5 className="name">Name</h5>
         <h5 className="pincode">Pin Code</h5>
         <h5 className="phoneNumber">Contact Number</h5>
         <h5 className='bloodgroup'>Blood Group</h5>
         </div>
         <hr></hr>

         <div className="donor">
           
            {
               // Sent Request Section
               requestProfile.map((donor)=>(
                  <RequestList key={Math.random()}  profile={donor}></RequestList>

       
               ))
               
            }
         </div>
     </div>

     <div className="donorProfile">
        <h4>Available Donors</h4>
        <div className="heading">
         <h5 className="name">Name</h5>
         <h5 className="pincode">Pin Code</h5>
         <h5 className="phoneNumber">Contact Number</h5>
         <h5 className='bloodgroup'>Blood Group</h5>
         </div>
         <hr></hr>
         
         <div className="donor">
           
            {
               //Available donors section
               profile.map((donor)=>(
                  <DonorList key={Math.random()} requestProf={requestProfile}  profile={donor}></DonorList>

       
               ))
               
            }
         </div>
     </div>
     <div className="fit"></div>
     </div>
    </div>
    );
}
export default Dashboard;