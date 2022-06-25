import { useEffect,useContext } from "react";
import AddLayer from "../AddDataComponents/addLayer";
import { AddDataContext } from '../../contexts/addData';

const MyMap = () => {
  
  const {addMapAndDrawLayer,addDrawInteraction}=useContext(AddDataContext)
  useEffect(()=>{
    addMapAndDrawLayer();
    addDrawInteraction("Point");
    try {
      
    } catch (error) {}
  },[]) 

  return (
    <div id="map">
      <AddLayer />
    </div>
  );
};

export default MyMap;
