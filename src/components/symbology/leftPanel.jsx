import { NavLink } from "react-router-dom";

const LeftPanel = () => {
    return ( 
        <>
        <NavLink className="navLink" to="/Symbology/">
            <div className="p-2 toolti">
            <i className="fa-solid fa-circle-dot"></i>
              <span className="tooltiptext ">Single_Symb</span>
            </div>
          </NavLink>
        <NavLink className="navLink" to="/Symbology/Category">
            <div className="p-2 toolti">
            <i className="fa-solid fa-shapes"></i>
              <span className="tooltiptext ">Category</span>
            </div>
          </NavLink>
        <NavLink className="navLink" to="/Symbology/GSize">
            <div className="p-2 toolti">
            <i className="fa-solid fa-viruses"></i>
              <span className="tooltiptext ">Gradient_Size</span>
            </div>
          </NavLink>
        <NavLink className="navLink" to="/Symbology/GColor">
            <div className="p-2 toolti">
            <i class="fa-solid fa-paintbrush"></i>
              <span className="tooltiptext ">Gradient_Color</span>
            </div>
          </NavLink>
        </>
     );
}
 
export default LeftPanel;