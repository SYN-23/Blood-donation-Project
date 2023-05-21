import Navbar from "../Components/Navbar";
import '../Components/Dashboard.css';

import {  useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import axios from "axios";
import RequestDonor from "./RequestDonor";
function DashboardDonor(){

   const [userRequest,setUserRequest]=useState([]);
      
     
    const[post,setPost]=useState([]);
    const [pincode,setpinCode]=useState();
    const [donor_id, setDonor_id] = useState("");
    
    const[id,setId]=useState("");
    

    
    const [status, setStatus] = useState(false);

    //
    const [flag,setFlag]=useState(0);
    const [nextDate,setNextDate]=useState("8/29/2020, 10:30:10 PM");
    const [time,setTime]=useState(0);
    const [difference,setDifference]=useState(0);
  //Searching Profile by pincode
   function handelSearch(){
      let result = [];
      for(let i=0;i<userRequest.length;i++){
         if(pincode==userRequest[i].userPinCode){
            
           result.push(userRequest[i])
           console.log(post)
         }
         setUserRequest(result)
      }
      
   }

   useEffect(()=>{
    //if(flag===0){
    if(localStorage.getItem('donor_id'))
    {
        const did = localStorage.getItem('donor_id');
        setDonor_id(did)
        
        
        
    }
    else{
        setDonor_id('');
    }
    
    //get diteals of donor for set the avialabe switch status
    if(donor_id !==''){
        axios
        .get(`http://localhost:5000/getDitealsDonor/${donor_id}` )
        .then((response)=>{
         
         setId(response.data[0]._id);
         setNextDate(response.data[0].nextDate);
         setStatus(response.data[0].status);
         
         
         
         //alert(nextDate);
         })
        .catch(err => {
            console.error(err);
            alert("Something Error Try again")
          });

        
      }
    
     
    
     //get diteals by donor email of which user sent request to donor 
    if(donor_id !==''){
      axios
      .get(`http://localhost:5000/getRequestdonor/${donor_id}` )
      .then((response)=>{
         setUserRequest(response.data);
         //console.log(userRequest);
      })
      .catch(err => {
         console.error(err);
         alert("Something Error Try again")
       });

     }
    
    //}
    
   getDate();

   
    
  
  
   },[donor_id])


   function getDate(){
      
      let currentDate=new Date().toLocaleString();
      let dd=currentDate.split(",");
      let dateCurrent =new Date(dd[0]);
   
      let dd1=nextDate.split(",");

      

      let dateNext=new Date(dd1[0])
       let timeDifference=dateNext.getTime()-dateCurrent.getTime();

       //console.log(dateCurrent.getTime()+" "+dateNext.getTime())
       
       let daydiff=timeDifference/(1000*60*60*24);
       setDifference(daydiff)
       //console.log(difference);
       if(daydiff >=0){
         //status1=false;
         setTime(daydiff);
       }else{
         //status1=value;
         setTime(0);
       }
       
   
   }

   
   // change available status by id
   const handleChange = (value) => {
    

    setStatus(value);
    let message="";
    if(value){
      message="ON"
    }else{
      message="OFF"
    }
    
    let status1="";
    if(difference >=0){
      status1=false;
      //setTime(daydiff);
    }else{
      status1=value;
      //setTime(daydiff);
    }
    const registerData={
           
            "status":status1,
    }

    axios
    .patch(`http://localhost:5000/updateDonor/${id}`, registerData)
    .then(() => {
        console.log("Data updated and added to database")
        alert(`Your status change to ${message} `);
    })
    .catch(err => {
      console.error(err);
      alert("Something Error Try again")
    });
   
    
  }
  
   
    



    return(
    <div  >
    <Navbar></Navbar>
    <div className="mainContain">
     <div className="search">
        <input placeholder="Search donor by pincode" type="number" onChange={event=>setpinCode(event.target.value)}></input>
        <button onClick={handelSearch}>Search</button>
     </div>

     <div className="requestsDonor">
        <h5>Active Status</h5>
        <div className="reactSwitch">
        <ReactSwitch
                    checked={status}
                    onChange={handleChange}
                />

         
                
         </div>
         <div className="timer">
            <h6>{`Timer : ${time} days left`}</h6>
         </div>
         
         
     </div>

     <div className="donorProfile">
        <h4>Requests</h4>
        <div className="heading">
         <h5 className="name">Name</h5>
         <h5 className="pincode">Pin Code</h5>
         <h5 className="phoneNumber">Contact Number</h5>
         <h5 className='bloodgroup'>Blood Group</h5>
         </div>
         <hr></hr>
         
         <div className="donor" >
           
            {
              
               // user Request section
               userRequest.map((donor)=>(
                  <RequestDonor key={Math.random()} profile={donor} id={id}  ></RequestDonor>
               ))
               
            }
         </div>
     </div>
     <div className="fit"></div>
     </div>
    </div>
    );
}
export default DashboardDonor;