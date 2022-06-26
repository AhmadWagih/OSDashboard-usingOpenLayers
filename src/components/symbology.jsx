import React, { useState, useCallback,useEffect } from "react";
import { getLayerById } from "../APIs/layer";
import { addMap,drawGeoJson } from "../helper/addMapHelper";
import { Routes,Route } from 'react-router-dom';

import MyMap from "./Common/Map";
import LeftPanel from './symbology/leftPanel';
import SingleSymb from "./symbology/SingleSymb";
import CatSymb from './symbology/CatSymb';
import GradientSize from "./symbology/GradientSize";
import GradientColor from "./symbology/GradientColor";


const Symbology = () => {

  const [state,setState] = useState(null)

  useEffect(()=>{
    const {map,baseMapGroup} = addMap("map");
    async function  readLayer() {
      const layer= await getLayerById(11);
      let features = drawGeoJson(map,layer.geoJson)

    }
    readLayer()
  },[])
  
  return (
    <>
      <div className="row m-0">
        <div className="column-1">
          <LeftPanel/>
        </div>
        <div className="col-3 sub-left-panel">
          <Routes>
            <Route path="/" element={<SingleSymb/>} />
            <Route path="/Category" element={<CatSymb/>} />
            <Route path="/GSize" element={<GradientSize/>} />
            <Route path="/GColor" element={<GradientColor/>} />
          </Routes>
        </div>
        <div className="col">
          <MyMap/>
        </div>
      </div>
    </>
  );
};

export default Symbology;
