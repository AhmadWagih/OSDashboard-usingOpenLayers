import { useEffect, useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { DashBoardContext } from "../../contexts/dashBoardContext";
import classes from "../../styles/widget.module.css";

function PizzaChart(props) {
  const { google, state, renderModifyRightPanel, closeRightPanel } = props;
  const [chart, setChart] = useState(null);
  const { deleteWidget } = useContext(DashBoardContext);
  const parent = document.getElementById("parent");

  const handleModify = () => {
    renderModifyRightPanel("chart", state);
  };

  useEffect(() => {
    if (google) {
      // Load the Visualization API and the controls package.
      if (!state.data) {
        var data = google.visualization.arrayToDataTable([
          [state.attributeX, state.attributeY],
          ...state.chartArr,
        ]);
      }
      let chart, options;
      if (state.type === "Pie Chart") {
        options = {
          titlePosition: "none",
          legend: "none",
          is3D: state.is3D,
          backgroundColor: { fill: state.bgColor },
          pieHole: state.donught ? 0.4 : 0,
        };
        chart = new google.visualization.PieChart(
          document.getElementById(state.id)
        );
      } else if (state.type === "Bar Chart") {
        options = {
          titlePosition: "none",
          legend: "none",
          is3D: state.is3D,
          backgroundColor: { fill: state.bgColor },
          hAxis: {
            title: state.attributeX,
          },
          vAxis: {
            title: state.attributeY,
          },
        };
        chart = !state.horizontal
          ? new google.visualization.ColumnChart(
              document.getElementById(state.id)
            )
          : new google.visualization.BarChart(
              document.getElementById(state.id)
            );
      } else {
        let tableReturn = tableFn();
        chart = tableReturn.chart;
        options = tableReturn.options;
        data = tableReturn.data;
      }
      chart.draw(data, options);
    }
  }, [google, chart, state, parent]);

  const refresh = () => {
    handleModify();
    closeRightPanel();
  };

  const tableFn = () => {
    let data = new google.visualization.DataTable();
    
    state.opts.map((opt,i) => {
      let type = isNaN(+state.data[0][i])?"string":"number";
      return data.addColumn(type, opt)
    });
    data.addRows(state.data);
    let options = { showRowNumber: state.horizontal, width: "100%", height: "100%" };
    let chart = new google.visualization.Table(document.getElementById(state.id));
    return {data,chart,options}
  };

  return (
    <>
      {/* <!--Div that will hold the dashboard--> */}
      <div
        id="parent"
        className={classes.containerChart}
        style={{ backgroundColor: state.bgColor }}
      >
        <div className={classes.titleDiv}>
          <i
            onClick={refresh}
            className={"fa-solid fa-arrows-rotate " + classes.modifyIcon}
          ></i>
          <i
            onClick={handleModify}
            className={"fa-solid fa-pen-to-square " + classes.modifyIcon}
          ></i>
          <i
            onClick={() => deleteWidget("chart", state.id)}
            className={"fa-solid fa-xmark " + classes.modifyIcon}
          ></i>
        </div>
        <p
          className={classes.title}
          style={{
            fontSize: state.textSize,
            color: state.textColor,
            textAlign: state.alignTitle,
          }}
        >
          {state.title}
        </p>
        <div
          id={state.id}
          className={classes.chart}
          style={{ width: parent?.style.width, height: parent?.style.height }}
        ></div>
      </div>
    </>
  );
}

export default PizzaChart;
