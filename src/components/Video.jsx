import { Button } from './Button';
import React from 'react';
import "../../styles/styles.css"
import "../../styles/homsStyle.css"
import VideoHome from "./VideoHome.mp4"
// import Card from './Card';

const Video = () => {
  return (
    <>
    
    <div className='Video-Container'>
     <video src={VideoHome} autoPlay loop muted/>
     <h1 class="Header">OS Dashborads</h1>
     <p>Producing Dashborads for Free</p>

    </div>
    {/* <Card></Card>  */}
    </>
  );
};

export default Video;