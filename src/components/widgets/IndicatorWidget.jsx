
import classes from "./widget.module.css";

const IndicatorWidget = ({indicator}) => {
  
   
  return (
    <>
      <div className={classes.container} style={{ backgroundColor: indicator.bgColor }}>
        <p className={classes.title} style={{ fontSize: indicator.textSize, color: indicator.textColor ,textAlign:indicator.alignTitle}}>
          {indicator.title}
        </p>
        <p className={classes.Indicator} style={{ color: indicator.textColor }}>
          {indicator.attribute}
        </p>
      </div>
    </>
  );
};

export default IndicatorWidget;
