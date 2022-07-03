import classes from "../../styles/symbologies.module.css";
import { useContext, useState } from "react";
import { SymbologyContext } from "./../../contexts/symbologyContext";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

const LabelSymb = () => {
  const { attributes, assignStyle, saveStyle } = useContext(SymbologyContext);
  const [state, setState] = useState({
    color: "#00ffd4",
    size: 12,
    attribute: "",
    strokeColor: "#FFFFFF",
    strokeThk: "0",
  });

  const handleSave = () => {
    saveStyle({type:"label",...state})
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((oldUser) => ({ ...oldUser, [name]: value }));
    if (name!=="attribute") {
      changeSymbol();
    }else{
      changeSymbol(value);
    }
  };

  const changeSymbol = (attribute) => {
    const style = new Style({
      text: new Text({
        font: `${state.size}px Calibri,sans-serif`,
        fill: new Fill({
          color: state.color,
        }),
        stroke: new Stroke({
          color: state.strokeColor,
        }),
      }),
    });
    assignStyle("label", style, attribute||state.attribute);
  };

  return (
    <>
      <div className="list-group-item">
        <h4>AddLabel</h4>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="IndField" className="label-dark w-75">
          Label Field
        </label>
        <select
          name="attribute"
          className="drop-down w-75 p-0"
          id="IndField"
          value={state.attribute}
          onChange={handleChange}
        >
          <option value={""} hidden disabled>
            Select Field
          </option>
          {attributes?.map((att, index) => {
            return (
              <option key={index} value={att}>
                {att}
              </option>
            );
          })}
        </select>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="color" className="label-dark w-75">
          Color :
        </label>
        <input
          name="color"
          type="color"
          id="color"
          onChange={handleChange}
          value={state.color}
        />
      </div>
      <div className="component-div border-bot">
        <label htmlFor="text-size" className="label-dark w-75">
          Size :
        </label>
        <input
          min={8}
          max={72}
          step={2}
          name="size"
          onChange={handleChange}
          type="number"
          className="text-input-dark w-20"
          id="text-size"
          value={state.size}
        />
      </div>
      <div className="component-div">
        <label htmlFor="strokeColor" className="label-dark w-75">
          StrokeColor :
        </label>
        <input
          name="strokeColor"
          type="color"
          id="strokeColor"
          onChange={handleChange}
          value={state.strokeColor}
        />
      </div>
      <div className="component-div border-bot">
        <label htmlFor="thick" className="label-dark w-75">
          Stroke Thickness :
        </label>
        <input
          name="strokeThk"
          onChange={handleChange}
          type="number"
          className="text-input-dark w-20"
          id="thick"
          value={state.strokeThk}
        />
      </div>

      <button className="button-form" onClick={handleSave}>
        Save
      </button>
    </>
  );
};

export default LabelSymb;
