import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  //sfc
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height:"8vh"}}>
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                <span className="navbar-brand mb-0 h1">OSDashBoard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/addData">
                Add Data
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Symbology">
                Symbology
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
            </li>
          </ul>
              <NavLink className="nav-link" style={{color:"rgba(255, 255, 255, 0.55)"}} to={props.loggedIn ? "/notLoggedIn" : "/login"}>
                {props.loggedIn ? "Log Out" : "Log In"}
              </NavLink>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
