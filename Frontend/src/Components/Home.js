import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import './Home.css'

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
        <div className="slideImage">
        <Carousel className="mainSlider">
          
                <div >
                    <img src="image1.jpg" alt="" />
                    <p className="legend">Donate Today Save A life</p>
                </div>
                <div>
                    <img src="https://images.everydayhealth.com/images/healthy-living/10-things-doctor-wont-tell-about-blood-tests-722x406.jpg" alt="" />
                    <p className="legend">Donate Blood Today</p>
                </div>
                <div>
                    <img src="image2.jpg" alt="" />
                    <p className="legend">You Can Help Save A Life</p>
                </div>
            </Carousel>
            </div>
        
     </div>
    );
}
export default Home;