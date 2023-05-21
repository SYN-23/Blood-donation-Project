
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Home(){
  // let navigate=useNavigate();

  // useEffect(()=>{
  //   if(localStorage.getItem('authenticated'))
  //   {
  //       const authenticated = localStorage.getItem('authenticated')

  //       if(authenticated == false)
  //       {
  //           navigate('/') 
  //       }
  //   }
  //   else{
  //       navigate('/')   
  //   }
  // })
    return(
     <div>
        <Navbar></Navbar>
       <h4>Home</h4>
        
     </div>
    );
}
export default Home;