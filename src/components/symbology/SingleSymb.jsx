import classes from "../../styles/symbologies.module.css";
import { useContext } from 'react';
import { SymbologyContext } from './../../contexts/symbologyContext';

import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import FontSymbol from 'ol-ext/style/FontSymbol';

const SingleSymb = () => {
  
  
  const handleChange = () => {
    // get layer (by id or name "prefered")
    // search for symbol
    // handle assign symbol to layer
  };

  const {changeStyle,saveStyle} = useContext(SymbologyContext)

  const handleSubmit = () => {
    const googleLocIcon = new Style({
      // image: new Icon({
      //   anchor: [0.5, 5],
      //   anchorXUnits: "fraction",
      //   anchorYUnits: "pixels",
      //   src: require("../../imgs/icons8-google-maps-48.png"),
      // }),
      image: new FontSymbol({
        glyph: 'fa-check-circle',
        form: 'none',
        radius: 5,
        offsetY: -15,
        gradient: true,
        fontSize: 1.0,
        rotation: 0,
        rotateWithView: false,
        color: 'white',
        fill: new Fill({
            color: 'green',
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
      <div className={classes.Body}>
        <img alt="symbology" src={require("../../imgs/icons8-google-maps-48.png")}
        onClick={handleSubmit}
        />
        <span className="custom-icon"></span>
        </div>
      <button className={classes.btn} onClick={saveStyle}>Apply</button>
    </>
  );
};

export default SingleSymb;
