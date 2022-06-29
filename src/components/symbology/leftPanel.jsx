import { NavLink } from "react-router-dom";

const LeftPanel = () => {
    return ( 
        <>
        <NavLink className="navLink" to="/Symbology/">
            <div className="p-2 toolti">
            <i className="fa-solid fa-circle-dot"></i>
              <span className="tooltiptext ">SingleSymb</span>
            </div>
          </NavLink>
        <NavLink className="navLink" to="/Symbology/Category">
            <div className="p-2 toolti">
            <i className="fa-solid fa-shapes"></i>
              <span className="tooltiptext ">Categorical</span>
            </div>
          </NavLink>
        <NavLink className="navLink" to="/Symbology/GSize">
            <div className="p-2 toolti">
            <i className="fa-solid fa-viruses"></i>
              <span className="tooltiptext ">GradSymbology</span>
            </div>
          </NavLink>
        <NavLink className="navLink" to="/Symbology/GColor">
            <div className="p-2 toolti">
            <i class="fa-solid fa-paintbrush"></i>
              <span className="tooltiptext ">GradColors</span>
            </div>
          </NavLink>
        </>
     );
}
 
export default LeftPanel;