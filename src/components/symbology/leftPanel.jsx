import { NavLink, useParams } from "react-router-dom";

const LeftPanel = () => {
  let { layerId } = useParams();
  return (
    <>
      <NavLink className="navLink" to={`/Symbology/${layerId}`}>
        <div className="p-2 toolti">
          <i className="fa-solid fa-circle-dot"></i>
          <span className="tooltiptext ">SingleSymb</span>
        </div>
      </NavLink>
      <NavLink className="navLink" to={`/Symbology/${layerId}/label`}>
        <div className="p-2 toolti">
          <i className="fa-solid fa-paintbrush"></i>
          <span className="tooltiptext ">Label</span>
        </div>
      </NavLink>
      <NavLink className="navLink" to={`/Symbology/${layerId}/Category`}>
        <div className="p-2 toolti">
          <i className="fa-solid fa-shapes"></i>
          <span className="tooltiptext ">Categorical</span>
        </div>
      </NavLink>
      <NavLink className="navLink" to={`/Symbology/${layerId}/GSize`}>
        <div className="p-2 toolti">
          <i className="fa-solid fa-viruses"></i>
          <span className="tooltiptext ">GradSymbology</span>
        </div>
      </NavLink>
    </>
  );
};

export default LeftPanel;
