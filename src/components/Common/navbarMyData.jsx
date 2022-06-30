import React from "react";
import { NavLink } from "react-router-dom";

const NavBarMyData = () => {
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/home">
            My Data
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/home/myDashboards">
            My Dashboards
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavBarMyData;
