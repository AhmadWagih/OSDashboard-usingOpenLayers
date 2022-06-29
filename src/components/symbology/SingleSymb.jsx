import classes from "../../styles/symbologies.module.css";
import Style from "ol/style/style";
import Icon from "ol/style/icon";

const SingleSymb = ({changeStyle}) => {
  
  
  const handleChange = () => {
    // get layer (by id or name "prefered")
    // search for symbol
    // handle assign symbol to layer
  };

  const handleSubmit = () => {
    const googleLocIcon = new Style({
      image: new Icon({
        anchor: [0.5, 5],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: require("../../imgs/icons8-google-maps-48.png"),
      }),
    });
    changeStyle(googleLocIcon);
  };

  return (
    <>
      <div className="list-group-item">
        <h4>Single Symbology</h4>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="layer-name" className="label-dark">
          Layer Name
        </label>
        <input
          // onChange={handleChange}
          // value={state.layerName}
          name="layerName"
          className="text-input-dark"
          placeholder="Layer1"
          id="layer-name"
        />
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
        <img src={require("../../imgs/icons8-google-maps-48.png")}
        onClick={handleSubmit}
        ></img>
        
        </div>
      <button className={classes.btn} onClick={handleSubmit}>Apply</button>
    </>
  );
};

export default SingleSymb;
