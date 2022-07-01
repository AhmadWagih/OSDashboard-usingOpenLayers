import React from "react";
import Video from "./Video";
import { Button } from './Button';

const NotLoggedIn = (props) => {
  
  return ( <>



    <div>
      <Video></Video>
    </div>
    
    
    
    
    
    <div class="container-fluid  ">
 

    <div class="row m-5 p-0  ">

  <div class="col align-self-center">
  <p class="h1">OS Dashboard</p>
  <br/>
  <p class="h5">"Look Beyond What You Can See" </p>
  <p > --Mark A. Cooper-- </p> 
    {/* <div>
      <a href="#" class="btn1 btn btn-secondary " id="btn1" >Get Started</a>
    </div>    */}
         <div className='video-btns'>
      <Button className="btnMP" buttonStyle="btnMP--outline" buttonSize="btnMP--large">Get Started</Button>
      <Button className="btnMP" buttonStyle="btnMP--primary" buttonSize="btnMP--large">Sign UP</Button>
     </div>
</div>

<div class="col-6 ">
<img src={require("../../imgs/dashboard2.png")} class="img-fluid" alt="..."/> 
</div>

</div>

    
    <div class="row  ">
    {/* COLOUMN1 */}
    <div class="col row2-col1 ">
   
    <div class="text">
    <div><p class="h3">WHAT</p></div>
      <p class="text2">
      A Dashboard which has a <b><i>Location</i></b> and <b><i>Time</i></b> component to
      convey information.<br></br>
      These two components are
      interconnected to give the user a better idea about how <b><i>GEO</i></b> properties
      change over time.
      </p>
    </div>
    <div class="row m-5 ">
      <div class="col-5">
      <img src={require("../../imgs/location.png")} style={{height:"50px;"}} class="img-fluid" alt="location"/> 

      </div>

      <div class="col-5">
      <img src={require("../../imgs/time.png")} style={{height:"50px;"}}class="img-fluid" alt="time"/> 

      </div>
    </div>
    </div>

    {/* COLOUMN-2 */}
    <div class="col row2-col2 ">
    <div class="text">
    <div><p class="h3">WHY</p></div>
      <p class="text2">
      <b><i>Visualization</i></b> always provide <b><i>better insights !</i></b>
      <br></br> 
      Think about it from a delivery comapny's perspective, These dashboards provide them with information
      about their delivery workers and how well they are performing.

      </p>
    </div>
    <div class="row m-5  ">
      <div class="col-7 ">
      <img src={require("../../imgs/insight.png")} style={{height:"50px;"}} class="img-fluid" alt="location"/> 

      </div>
      <div class="col-5 ">
      <br></br>
  
      <img src={require("../../imgs/graph.png")} style={{height:"50px;"}} class="img-fluid" alt="location"/> 

      </div>
    </div>
    </div>

    {/* COLOUMN-3 */}
    <div class="col row2-col3 ">
    <div class="text">
    <div><p class="h3">HOW</p></div>
      <p class="text2">
      Upload your <b><i>Data,</i></b>
      <br></br> 
      Choose your <b><i>Symbology,</i></b>
      <br></br>
      Create your <b><i>DASHBOARD</i></b>
      <br></br>

      </p>
    </div>
    <div class="row m-5  ">
      <div class="col-8 ">
        <br></br>
      <img src={require("../../imgs/dashboard3.png")} style={{height:"50px;"}} class="img-fluid" alt="location"/> 

      </div>

    </div>
    </div>

    </div>
   

    






  
  </div> 
 


  </> );
}
 
export default NotLoggedIn;