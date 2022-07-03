import { useContext } from "react";
import { DashBoardContext } from "../../contexts/dashBoardContext";
import classes from "../../styles/dash.module.css";
import IndicatorWidget from "./IndicatorWidget";
import PieChartWidget from "./PieChartWidget";

const DashPreview = ({
  google,
  renderModifyRightPanel,
  setRightPanel,
  layerId,
}) => {
  const { widgets } = useContext(DashBoardContext);
  const { indicator, chart } = widgets;

  return (
    <>
      <div className={classes.bottomArea}>{indicator?.map((ind) => (
          <IndicatorWidget
            key={ind.id}
            renderModifyRightPanel={renderModifyRightPanel}
            indicator={ind}
          />
        ))}</div>
      <div id={`map${layerId}`} className={classes.defaultMap}></div>
      <div className={classes.leftArea}>
        {chart?.map((ch) => (
          <PieChartWidget
            key={ch.id}
            closeRightPanel={() => setRightPanel({ display: "none" })}
            google={google}
            renderModifyRightPanel={renderModifyRightPanel}
            state={ch}
          />
        ))}
      </div>
    </>
  );
};

export default DashPreview;
