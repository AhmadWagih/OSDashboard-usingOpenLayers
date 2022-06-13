import React, { useEffect,useCallback,useState } from "react";


const Indicator = (props) => {

  return (  <>
    <div className="list-group-item">
      <h4>
        Indicator
        <i className="fa-solid fa-rectangle-xmark close" onClick={props.closeRightPanel}></i>
      </h4>
    </div>
    <div className="component-div">
      <label htmlFor="componentName" className="label-dark">
        Component Name :
      </label>
      <input
        onChange={props.handleChange}
        className="text-input-dark d-block"
        placeholder="Enter Comp. name"
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
        Indecator Field
      </label>
      <select className="form-select w-50 p-0 d-inline" id="Field">
        {props?.attributes?.map((att)=>{
          return <option value={att}>att</option>
        })}
      </select>
    </div>
  </> );
}
 
export default Indicator;