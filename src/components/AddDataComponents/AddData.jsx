import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import LeftPanel from "../Common/leftPanel";
import Draw from "./draw";
import JsonFile from "./jsonFile";
import MyMap from "../Common/Map";
import GeoServer from "./GeoServer";
import Csv from "./Csv";

const AddData = () => {
  useEffect(() => {
    toast.success("you are Logged In", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

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
              <Route path="/addData/" element={<Draw />} />
              <Route path="/addData/json" element={<JsonFile />} />
              <Route path="/addData/geoserver" element={<GeoServer />} />
              <Route path="/addData/csv" element={<Csv />} />
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
