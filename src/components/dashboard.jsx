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
import Table from "./widgets/Table"
const Dashboard = () => {
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
          component = <Text closeRightPanel={() => setRightPanel({ display: "none" })}/>;
          break;
        case "Pie Chart":
        case "Bar Chart":
          component = <PieChart type={e.target.innerText} closeRightPanel={() => setRightPanel({ display: "none" })}/>;
          break;
        // case "Gauge":
        //   component=<Gauge />;
        //   break;
        case "Table":
          component= <PieChart type={e.target.innerText} closeRightPanel={() => setRightPanel({ display: "none" })}/>;
          break;
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
      // case "gauge":
      //   component=<Gauge />;
      //   break;
      // case "bar Chart":
      //   component=<BarChart />;
      //   break;
      // case "list":
      //   component=<List />;
      //   break;
      // case "table":
      //   component=<Table />;
      //   break;
      default:
        style = { display: "none" };
        break;
    }
    setRightPanel({ component, style });
  };

  useEffect(() => {
    (async () => {
      // edit Dashboard
      if (dashId) {
        //call Backend
        const dashData = await getDashboardById(dashId);

        const mapArr = dashData.layers?.map((layer,i) => {
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
    })();
  }, [layerId]);

  return (
    <>
      <ToastContainer />
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
        <div className={'col '+classes.dashDiv}>
          {indicator?.map((ind) => (
            <IndicatorWidget
              key={ind.id}
              renderModifyRightPanel={renderModifyRightPanel}
              indicator={ind}
            />
          ))}
          {chart?.map((ch) => (
          <>
            <PieChartWidget
              key={ch.id}
              closeRightPanel={() => setRightPanel({ display: "none" })}
              google={google}
              renderModifyRightPanel={renderModifyRightPanel}
              state={ch}
            />
            <Table
            key={ch.id}
            closeRightPanel={() => setRightPanel({ display: "none" })}
            google={google}
            renderModifyRightPanel={renderModifyRightPanel}
            state={ch}
            />
          </>
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
