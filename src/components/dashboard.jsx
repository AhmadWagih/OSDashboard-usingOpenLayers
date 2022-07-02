import React, { useState, useCallback, useContext, useEffect } from "react";
import Indicator from "./Layout_Component/Indicator";
import Text from "./Layout_Component/Text";
import PieChart from "./Layout_Component/pieChart";
import IndicatorWidget from "./widgets/IndicatorWidget";
import { DashBoardContext } from "./../contexts/dashBoardContext";
import { ToastContainer } from "react-toastify";
import PieChartWidget from "./widgets/PieChartWidget";
import useGoogleCharts from "../helper/google";
import { useParams, useLocation } from "react-router-dom";
import { addMap } from "../helper/addMapHelper";
import { getDashboardById } from "../APIs/dashboard";
import { getLayerById } from "../APIs/layer";
import classes from "../styles/dash.module.css";
// import Layout from "./Layout_Component/Layout";
import Widget from "./Layout_Component/Widget";
import Themes from "./Layout_Component/Themes";
import LeftPanel from './symbology/leftPanel';

const Dashboard = () => {
  const [leftPanel, setLeftPanel] = useState(null)
  const [rightPanel, setRightPanel] = useState({
    component: null,
    display: "none",
  });
  // get layerId || dashId from Url
  const layerId = useLocation().search.split("=")[1];
  const { dashId } = useParams();

  const { widgets, LoadMapData } = useContext(DashBoardContext);
  const { indicator, chart } = widgets;

  const google = useGoogleCharts();

  const renderRightPanel = useCallback(
    (e) => {
      let style = { display: "inline-block" };
      let component;
      switch (e.target.innerText) {
        case "Indicator":
          component = (
            <Indicator
              closeRightPanel={() => setRightPanel({ display: "none" })}
            />
          );
          break;
        case "Text":
          component = (
            <Text closeRightPanel={() => setRightPanel({ display: "none" })} />
          );
          break;
        case "Pie Chart":
        case "Bar Chart":
        case "Table":
          component = (
            <PieChart
              type={e.target.innerText}
              closeRightPanel={() => setRightPanel({ display: "none" })}
            />
          );
          break;
        // case "Gauge":
        //   component=<Gauge />;
        //   break;
        // case "List":
        //   component=<List />;
        //   break;
        // case "Table":
        //   component=<Table />;
        //   break;
        default:
          style = { display: "none" };
          break;
      }
      setRightPanel({ component, style });
    },
    [setRightPanel, rightPanel]
  );

  const renderModifyRightPanel = (widgetName, state) => {
    let style = { display: "inline-block" };
    let component;
    switch (widgetName) {
      case "indicator":
        component = (
          <Indicator
            state={state}
            closeRightPanel={() => setRightPanel({ display: "none" })}
          />
        );
        break;
      case "text":
        component = (
          <Text
            state={state}
            closeRightPanel={() => setRightPanel({ display: "none" })}
          />
        );
        break;
      case "chart":
        component = (
          <PieChart
            state={state}
            closeRightPanel={() => setRightPanel({ display: "none" })}
          />
        );
        break;
      // case "list":
      //   component=<List />;
      //   break;
      default:
        style = { display: "none" };
        break;
    }
    setRightPanel({ component, style });
  };

  const renderLeftPanel = (e) => {
    console.log(e.target.className);
    let leftPanel;
    switch (e.target.className) {
      // case "fa-solid fa-border-all":
      //   leftPanel = <Layout />;
      //   break;
      case "fa-solid fa-toolbox":
        leftPanel = <Widget renderRightPanel={renderRightPanel}/>;
        break;
      case "fa-solid fa-palette":
        leftPanel = <Themes />;
        break;
      default:
        break;
    }
    setLeftPanel(leftPanel);
  };

  useEffect(() => {
    
    (async () => {
      // edit Dashboard
      if (dashId) {
        //call Backend
        const dashData = await getDashboardById(dashId);

        const mapArr = dashData.layers?.map((layer, i) => {
          // create map
          const { map } = addMap(`map${i}`);

          // add Features
          LoadMapData(map, layer.geoJson, layer.style);
          return map;
        });
      }
      // new Dashboard
      else {
        //call Backend
        const layerData = await getLayerById(layerId);
        // create map
        const { map } = addMap(`map${layerId}`);
        // add Features
        LoadMapData(map, layerData.geoJson, layerData.style);
      }
      setLeftPanel(<Widget renderRightPanel={renderRightPanel}/>)
    })();
  }, [layerId,setLeftPanel]);

  return (
    <>
      <ToastContainer />
      <div className="row m-0">
        <div className="column-1">
          <div className="p-2 toolti">
            <i onClick={renderLeftPanel} className="fa-solid fa-border-all"></i>
            <span className="tooltiptext">Layout</span>
          </div>
          <div className="p-2 toolti">
            <i onClick={renderLeftPanel} className="fa-solid fa-toolbox"></i>
            <span className="tooltiptext">Widget</span>
          </div>
          <div className="p-2 toolti">
            <i onClick={renderLeftPanel} className="fa-solid fa-palette"></i>
            <span className="tooltiptext">Themes</span>
          </div>
          <div className="p-2 toolti">
            <i className="fa-solid fa-floppy-disk"></i>
            <span className="tooltiptext">Save</span>
          </div>
        </div>
        <div className="column-2 col-2 p-0">
         {leftPanel}
        </div>
        <div className={"col " + classes.dashDiv}>
          {indicator?.map((ind) => (
            <IndicatorWidget
              key={ind.id}
              renderModifyRightPanel={renderModifyRightPanel}
              indicator={ind}
            />
          ))}
          {chart?.map((ch) => (
            <PieChartWidget
              key={ch.id}
              closeRightPanel={() => setRightPanel({ display: "none" })}
              google={google}
              renderModifyRightPanel={renderModifyRightPanel}
              state={ch}
            />
          ))}
          <div id={`map${layerId}`} className={classes.defaultMap}></div>
        </div>
        <div className="column-4" style={rightPanel.style}>
          {rightPanel.component}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
