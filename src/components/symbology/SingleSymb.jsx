import classes from "../../styles/symbologies.module.css";
import { useContext } from 'react';
import { SymbologyContext } from './../../contexts/symbologyContext';

import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import FontSymbol from 'ol-ext/style/FontAwesome5Def';
import { useState } from 'react';
import { icons } from "../../helper/fontawsomeIcons";
import Stroke from "ol/style/Stroke";

const SingleSymb = () => {
  const [symbols,setSymbols] = useState(icons)
  const [state,setState] = useState({color:"#00FFFF",size:5})


  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((oldUser) => ({ ...oldUser, [name]: value }));
  };

  const {changeStyle,saveStyle} = useContext(SymbologyContext)

  const changeSymbol = (e) => {
    const googleLocIcon = new Style({
      // image: new Icon({
      //   anchor: [0.5, 5],
      //   anchorXUnits: "fraction",
      //   anchorYUnits: "pixels",
      //   src: require("../../imgs/icons8-google-maps-48.png"),
      // }),
      image: new FontSymbol({
        glyph: e.target.value,
        form: 'none',
        radius: state.size,
        offsetY: -15,
        fontSize: 1.0,
        rotation: 0,
        rotateWithView: false,
        color: state.color,
        fill: new Fill({
            color: 'red',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
      }),
      }),     
    })
    changeStyle(googleLocIcon);
  };

  return (
    <>
      <div className="list-group-item">
        <h4>Single Symbology</h4>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="symbol" className="label-dark">
          Symbology
        </label>
        <input
          // onChange={handleChange}
          // value={state.symbology}
          name="symbol"
          className="text-input-dark"
          placeholder="symbol..."
          id="symbol"
        />
      </div>
      <div className="component-div border-bot">
        <label htmlFor="color" className="label-dark w-75">
          Color
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
      <div className={classes.Body}>
        {/* <img alt="symbology" src={require("../../imgs/icons8-google-maps-48.png")}
        onClick={handleSubmit}
        /> */}
        {symbols.map((symb,i)=>(
            <button value={symb} key={i} onClick={changeSymbol} className={`fas ${symb} ${classes.symbol}`}></button>
        ))}
        </div>
      <button className={classes.btn} onClick={saveStyle}>Apply</button>
    </>
  );
};

export default SingleSymb;
