import classes from "../../styles/symbologies.module.css";

const SingleSymb = () => {
  const handleChange = () => {
    // get layer (by id or name "prefered")
    // search for symbol
    // handle assign symbol to layer
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
        List of available symbologies
      </div>
      <button className={classes.btn}>
        Apply
      </button>
    </>
  );
};

export default SingleSymb;
