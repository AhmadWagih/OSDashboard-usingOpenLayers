import classes from "../../styles/symbologies.module.css";
import Style from "ol/style/style";
import Icon from "ol/style/icon";
import { useContext } from 'react';
import { SymbologyContext } from './../../contexts/symbologyContext';
import Text from "ol/style/text";
import Fill from "ol/style/fill";

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
      text: new Text({
        text: '\ue062',
        font : 'normal 18px "Glyphicons Halflings"',
        textBaseline: 'Bottom',
        fill: new Fill({
            color: 'blue',
        })          
    })
      
    });
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
        ></img>
        <i class="bi bi-alarm"></i>
        </div>
      <button className={classes.btn} onClick={saveStyle}>Apply</button>
    </>
  );
};

export default SingleSymb;
