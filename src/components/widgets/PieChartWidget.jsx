import { useEffect, useState,useContext } from "react";
import { Spinner } from "react-bootstrap";
import { DashBoardContext } from "../../contexts/dashBoardContext";
import classes from "./widget.module.css";
function PizzaChart(props) {
    const {google,state,renderModifyRightPanel}= props;
  const [chart, setChart] = useState(null);
  const { deleteWidget } = useContext(DashBoardContext);
  const parent = document.getElementById("parent");

  const handleModify = ()=>{
    renderModifyRightPanel("chart",state)
  }
  useEffect(() => {
    if (google && !chart) {
      // Load the Visualization API and the controls package.

      var data = google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ]);
      let hole = state.donught?0.4:0;
      var options = {
        titlePosition: 'none',
        legend: "none",
        is3D: state.is3D,
        backgroundColor: { fill: state.bgColor },
        pieHole: hole,
      };

      var chart = new google.visualization.PieChart(
        document.getElementById("piechart")
      );

      chart.draw(data, options);
    }
  }, [google, chart,state,parent]);


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
                onClick={handleModify}
                className={"fa-solid fa-pen-to-square " + classes.modifyIcon}
              ></i>
              <i
                onClick={()=>deleteWidget("chart",state.id)}
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
      <div id="piechart" className={classes.chart} style={{width:parent?.style.width,height:parent?.style.height}}></div>
      </div>
    </>
  );
}

export default PizzaChart;
