import React, { useContext, useEffect } from "react";

import { addMap } from "../helper/addMapHelper";
import { Routes, Route,useParams } from "react-router-dom";

import MyMap from "./Common/Map";
import LeftPanel from "./symbology/leftPanel";
import SingleSymb from "./symbology/SingleSymb";
import GraduatedSymbology from "./symbology/GraduatedSymbology";
import GraduatedColor from "./symbology/GraduatedColor";
import { SymbologyContext } from './../contexts/symbologyContext';
import {ToastContainer} from "react-toastify";
import LabelSymb from "./symbology/label";

const Symbology = () => {

  const {readLayer}=useContext(SymbologyContext); 
  let {layerId} = useParams()
  // didMount -
  useEffect(() => {
    const { map, baseMapGroup } = addMap("map");
    readLayer(map,layerId);
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
            <Route path="/GSize" element={<GraduatedSymbology />} />
            <Route path="/GColor" element={<GraduatedColor />} />
            <Route path="/label" element={<LabelSymb />} />
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
