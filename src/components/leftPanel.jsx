import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import propTypes from "prop-types";
const LeftPanel = () => {
  const wrap = () => {
    let btns = document.getElementsByClassName("dash");
    for (const btn of btns) {
      btn.style.display = btn.style.display !== "none" ? "none" : "block";
    }
  };
  return ( <>
    <div>
      <div className="list-group-item w-75" onClick={wrap}>
        <i className="fa-solid fa-folder-plus"></i> Add Data
      </div>
      <NavLink className="nav-link dash" to="/addData/draw">
        <div className="list-group-item">
          <i className="fa-solid fa-compass-drafting"></i> Draw Data
        </div>
      </NavLink>
      <NavLink className="nav-link dash" to="/addData/json">
        <div className="list-group-item">
          <i className="fa-solid fa-database"></i> Json File Import
        </div>
      </NavLink>
      <NavLink className="nav-link dash" to="/addData/csv">
        <div className="list-group-item">
          <i className="fa-solid fa-file-csv"></i> Csv File Import
        </div>
      </NavLink>
      <NavLink className="nav-link dash" to="/addData/geoserver">
        <div className="list-group-item">
          <img src={require("../imgs/geoserver.png")} alt="geoserver" className="icon"/> GeoServer Import</div>
      </NavLink>
    </div>
    <div>
      <NavLink className="nav-link" to="/Symbology">
      <div className="list-group-item"><i className="fa-solid fa-flag"></i> Symbology</div>

      </NavLink>
    </div>
    <div>
    <NavLink className="nav-link" to="/dashboard">
      <div className="list-group-item"><i className="fa-solid fa-chart-line"></i> Dashboard</div>
      </NavLink>
    </div>
  </> );
}
 
export default LeftPanel;
