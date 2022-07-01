
import { useEffect, useState, useContext } from "react";
import { DashBoardContext } from "../../contexts/dashBoardContext";
import classes from "../../styles/widget.module.css";

function Table(props) {
  const { google, state, renderModifyRightPanel,closeRightPanel } = props;
  const [chart, setChart] = useState(null);
  const { deleteWidget } = useContext(DashBoardContext);
  const parent = document.getElementById("parent");

  const handleModify = () => {
    renderModifyRightPanel("chart", state);
  };

  useEffect(() => {
    if (google && !chart) {
      // Load the Visualization API and the controls package.

      var data = google.visualization.arrayToDataTable([
        [state.attributeX, state.attributeY],
        ...state.chartArr
      ]);
      let chart,options;
      if (state.type==="Table") {
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
      }
      chart.draw(data, options);
    }
  }, [google, chart, state, parent]);

  const refresh=()=>{
    handleModify();
    closeRightPanel()
  }

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

export default Table;













// else if (state.type==="Table"){
//     options = {
//       titlePosition: "none",
//       legend: "none",
//       is3D: state.is3D,
//       backgroundColor: { fill: state.bgColor },
//       hAxis: {
//         title: state.attributeX
//       },
//       vAxis: {
//         title: state.attributeY
//       }
//     };
//     chart =(!state.horizontal)
//     ? new google.visualization.ColumnChart(
//       document.getElementById(state.id)
//     )
//     :new google.visualization.BarChart(
//       document.getElementById(state.id)
//     )
//   }