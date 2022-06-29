import React, { useContext, useEffect } from "react";

import { addMap } from "../helper/addMapHelper";
import { Routes, Route } from "react-router-dom";


import MyMap from "./Common/Map";
import LeftPanel from "./symbology/leftPanel";
import SingleSymb from "./symbology/SingleSymb";
import CatSymb from "./symbology/CatSymb";
import GraduatedSymbology from "./symbology/GraduatedSymbology";
import GraduatedColor from "./symbology/GraduatedColor";
import { SymbologyContext } from './../contexts/symbologyContext';
import {ToastContainer} from "react-toastify";

const Symbology = () => {

  const {readLayer}=useContext(SymbologyContext); 

  // didMount -
  useEffect(() => {
    const { map, baseMapGroup } = addMap("map");
    
    readLayer(map);
  }, []);

  return (
    <>
    <ToastContainer/>
      <div className="row m-0">
        <div className="column-1">
          <LeftPanel />
        </div>
        <div className="col-3 sub-left-panel">
          <Routes>
            <Route
              path="/"
              element={<SingleSymb/>}
            />
            <Route path="/Category" element={<CatSymb />} />
            <Route path="/GSize" element={<GraduatedSymbology />} />
            <Route path="/GColor" element={<GraduatedColor />} />
          </Routes>
        </div>
        <div className="col">
          <MyMap />
        </div>
      </div>
    </>
  );
};

export default Symbology;
