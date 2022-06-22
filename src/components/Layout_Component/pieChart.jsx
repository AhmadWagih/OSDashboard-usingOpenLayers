const PieChart = (props) => {
  return (
    <>
      <div className="list-group-item">
        <h4>
          Pie Chart
          <i
            className="fa-solid fa-rectangle-xmark close"
            onClick={props.closeRightPanel}
          ></i>
        </h4>
      </div>
      <div className="component-div">
        <label htmlFor="componentName" className="label-dark">
          Chart Title :
        </label>
        <input
          onChange={props.handleChange}
          className="text-input-dark d-block"
          placeholder="Enter chart title"
          id="component-name"
        />
      </div>
      <div className="component-div">
        <label htmlFor="text-size" className="label-dark w-75">
          Text size :
        </label>
        <input
          onChange={props.handleChange}
          type="number"
          className="text-input-dark w-20"
          id="text-size"
        />
      </div>
      <div className="component-div">
        <label htmlFor="color" className="label-dark w-75">
          Text Color
        </label>
        <input
          type="color"
          id="color"
          value={"#ff0000"}
          onChange={props.handleChange}
        />
      </div>
      <div className="component-div">
        <label htmlFor="background-color" className="label-dark w-75">
          Background Color
        </label>
        <input
          type="color"
          id="background-color"
          value={"#ffffff"}
          onChange={props.handleChange}
        />
      </div>
      <div className="component-div">
        <label htmlFor="componentName" className="label-dark w-75">
          Field
        </label>
        <select className="form-select w-50 p-0 d-inline" id="Field">
          {props?.attributes?.map((att) => {
            return <option value={att}>att</option>;
          })}
        </select>
      </div>
      <div className="component-div">
        <input type="checkbox"  className="form-check-input" name="" id="" /><label className="label-dark w-75"> doun </label>
      <br />
        <input type="checkbox"  className="form-check-input" name="" id="" /><label className="label-dark w-75"> doun </label>

      </div>
    </>
  );
};

export default PieChart;
