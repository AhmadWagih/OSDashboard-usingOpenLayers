import classes from "../../styles/widget.module.css";
import { useContext } from "react";
import { DashBoardContext } from "./../../contexts/dashBoardContext";

const IndicatorWidget = (props) => {
  const { indicator, renderModifyRightPanel } = props;

  const { deleteWidget } = useContext(DashBoardContext);

  const handleModify = () => {
    renderModifyRightPanel("indicator", indicator);
  };

  return (
    <>
      <div
        className={classes.container}
        style={{ backgroundColor: indicator.bgColor }}
      >
        <div className={classes.titleDiv} style={{ width: "50px" }}>
          <i
            onClick={handleModify}
            className={"fa-solid fa-pen-to-square " + classes.modifyIcon}
          ></i>
          <i
            onClick={() => deleteWidget("indicator", indicator.id)}
            className={"fa-solid fa-xmark " + classes.modifyIcon}
          ></i>
        </div>
        <p
          className={classes.title}
          style={{
            fontSize: indicator.textSize,
            color: indicator.textColor,
            textAlign: indicator.alignTitle,
          }}
        >
          {indicator.title}
        </p>
        <p className={classes.Indicator} style={{ color: indicator.textColor }}>
          {indicator.aggvalue}
        </p>
      </div>
    </>
  );
};

export default IndicatorWidget;
