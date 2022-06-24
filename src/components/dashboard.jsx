import React, { useState,useCallback,useContext } from "react";

import Indicator from "./Layout_Component/Indicator";
import Text from "./Layout_Component/Text";
import PieChart from './Layout_Component/pieChart';
import IndicatorWidget from './widgets/IndicatorWidget';
import { DashBoardContext } from './../contexts/dashBoardContext';

const Dashboard = () => {
  const [rightPanel,setRightPanel] =useState({component:null,display:"none"})

  const {widgets} =  useContext(DashBoardContext)
  const {indicator}=widgets;

  const renderRightPanel = useCallback((e)=>{
    let style={display:"inline-block"};
    let component;
    switch (e.target.innerText) {
      case "Indicator":
        component=<Indicator closeRightPanel={()=>setRightPanel({display:"none"})}/>;
        break;
      case "Text":
        component=<Text />;
        break;
      case "Pie Chart":
        component=<PieChart />;
        break;
      // case "Gauge":
      //   component=<Gauge />;
      //   break;
      // case "Bar Chart":
      //   component=<BarChart />;
      //   break;
      // case "List":
      //   component=<List />;
      //   break;
      // case "Table":
      //   component=<Table />;
      //   break;
      default:
        style={display:"none"};
        break;
      }
      setRightPanel({component,style});
  },[setRightPanel,rightPanel])
  
  return ( <>        
    <div className="row m-0">
      <div className="column-1">
        <div className="p-2 toolti">
          <i className="fa-solid fa-table"></i>
          <span className="tooltiptext">Layout</span>
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
          <h4 className="list-group-item">Layout</h4>
        </div>
        <div className="list-elements" onClick={renderRightPanel}>
          <div className="d-inline m-2">
            <i className="fa-solid fa-6"></i>
            <i className="fa-solid fa-7"></i>
          </div>
          Indicator
        </div>
        <div className="list-elements" onClick={renderRightPanel}>
          <i className="fa-solid fa-spell-check m-2"></i>
          Text
        </div>
        <div className="list-elements" onClick={renderRightPanel}>
          <i className="fa-solid fa-chart-pie m-2"></i>
          Pie Chart
        </div>
        <div className="list-elements" onClick={renderRightPanel}>
          <i className="fa-solid fa-gauge-high m-2"></i>
          Gauge
        </div>
        <div className="list-elements" onClick={renderRightPanel}>
          <i className="fa-solid fa-chart-column m-2"></i>
          Bar Chart
        </div>
        <div className="list-elements" onClick={renderRightPanel}>
          <i className="fa-solid fa-list m-2"></i>
          List
        </div>
        <div className="list-elements" onClick={renderRightPanel}>
          <i className="fa-solid fa-table-cells m-2"></i>
          Table
        </div>
      </div>
      <div className="col">
        {indicator?.map((ind,i)=><IndicatorWidget key={i} indicator={ind} />)}

        {/* <div id="map"></div>
        <canvas
          id="myChart"
          style={{ width: "20%", maxWidth: "200px" ,height:"200px"}}
        ></canvas> */}
      </div>
      <div className="column-4" style={rightPanel.style}>
        {rightPanel.component}
      </div>
    </div>
    
  </> );
}
 
export default Dashboard;
