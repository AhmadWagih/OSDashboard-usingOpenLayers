import { NavLink } from "react-router-dom";
import propTypes from "prop-types";

const LeftPanel = () => {
  
  return (
    <>
    <NavLink className="navLink" to="/addData/">
        <div className="p-2 toolti">
          <i className="fa-solid fa-compass-drafting"></i>
          <span className="tooltiptext ">DrawData</span>
        </div>
      </NavLink>
    <NavLink className="navLink" to="/addData/json">
        <div className="p-2 toolti">
          <i className="fa-solid fa-database"></i>
          <span className="tooltiptext ">JsonFile</span>
        </div>
      </NavLink>
    <NavLink className="navLink" to="/addData/csv">
        <div className="p-2 toolti">
          <i className="fa-solid fa-file-csv"></i>
          <span className="tooltiptext ">CsvFile</span>
        </div>
      </NavLink>
    <NavLink className="navLink" to="/addData/geoserver">
        <div className="p-2 toolti">
        <img src={require("../../imgs/geoserver.png")} alt="geoserver" className="icon"/>
          <span className="tooltiptext ">geoserver</span>
        </div>
      </NavLink>
    
      {/* <div>
      <div className="list-group-item w-75" onClick={wrap}>
        <i className="fa-solid fa-folder-plus"></i> Add Data
      </div>

      <NavLink className="nav-link dash" to="/addData/">
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
          <img src={require("../../imgs/geoserver.png")} alt="geoserver" className="icon"/> GeoServer Import</div>
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
    </div> */}
    </>
  );
};

export default LeftPanel;
