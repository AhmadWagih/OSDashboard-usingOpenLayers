
import { useEffect,useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import LeftPanel from "../Common/leftPanel";
import Draw from "./draw";
import JsonFile from "./jsonFile";
import MyMap from "../Common/Map";
import GeoServer from "./GeoServer";
import Csv from "./Csv";
import { AddDataContext } from '../../contexts/addData';

const AddData = () => {
  const {addMapAndDrawLayer,addDrawInteraction}=useContext(AddDataContext)
  useEffect(()=>{
    addMapAndDrawLayer();
    addDrawInteraction("Point");
    try {
      
    } catch (error) {}
  },[]) 

  return (
    <>
      <ToastContainer />
      {/* <div className="progress m-2">
        <div
          className="progress-bar progress-bar-striped bg-warning progress-bar-animated"
          style={{ width: "50%" }}
          role="progressbar"
          aria-valuenow="10"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div> */}
      <div className="container m-0" style={{ maxWidth: "1500px" }}>
        <div className="row">
          <div className="column-1">
            <LeftPanel />
          </div>
          <div className="col-3 sub-left-panel" id="2ndCol">
            <Routes>
              <Route path="/" element={<Draw />} />
              <Route path="/json" element={<JsonFile />} />
              <Route path="/geoserver" element={<GeoServer />} />
              <Route path="/csv" element={<Csv />} />
              {/* <Route exact path="/addData" element={<Intro />} /> */}
            </Routes>
          </div>
          <div className="col">
            <MyMap />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddData;
