import React, { useState, useCallback } from "react";

import MyMap from "./Common/Map";


const Symbology = () => {

  const [rightPanel, setRightPanel] = useState({ display: "none" });
  const renderRightPanel = useCallback((e) => {
    let style = { display: "inline-block" };
    let component;
    switch (e.target.innerText) {
      //   case "Indicator":
      //     component=<Indicator attributes={attributes} handleChange={handleChange}/>;
      //     break;
      //   case "Text":
      //     component=<Text handleChange={handleChange}/>;
      //     break;
      // case "Pie Chart":
      //   Layout_Component=<PieChart attributes={state.attributes} handleChange={handleChange}/>;
      //   break;
      // case "Gauge":
      //   Layout_Component=<Gauge attributes={state.attributes} handleChange={handleChange}/>;
      //   break;
      // case "Bar Chart":
      //   Layout_Component=<BarChart attributes={state.attributes} handleChange={handleChange}/>;
      //   break;
      // case "List":
      //   Layout_Component=<List attributes={state.attributes} handleChange={handleChange}/>;
      //   break;
      // case "Table":
      //   Layout_Component=<Table attributes={state.attributes} handleChange={handleChange}/>;
      //   break;
      default:
        style = { display: "none" };
        break;
    }
    setRightPanel(style);
  }, []);
  return (
    <>
      <div className="row m-0">
        <div className="column-1">
          <div className="p-2 toolti">
            <i className="fa-solid fa-table"></i>
            <span className="tooltiptext"></span>
          </div>
          <div className="p-2 toolti">
            <i className="fa-solid fa-palette"></i>
            <span className="tooltiptext">Themes</span>
          </div>
          <div className="p-2 toolti">
            <i className="fa-solid fa-floppy-disk"></i>
            <span className="tooltiptext">Save</span>
          </div>
        </div>
        <div className="column-2 col-2 p-0">
          <div>
            <h4 className="list-group-item">Symbology</h4>
          </div>
          <div className="list-elements" onClick={renderRightPanel}>
            Single Symbology
          </div>
          <div className="list-elements" onClick={renderRightPanel}>
            Category
          </div>
          <div className="list-elements" onClick={renderRightPanel}>
            Graduated Colors
          </div>
          <div className="list-elements" onClick={renderRightPanel}>
            Graduated Symbology
          </div>
        </div>
        <div className="col">
          <MyMap/>
        </div>
      </div>
    </>
  );
};

export default Symbology;
