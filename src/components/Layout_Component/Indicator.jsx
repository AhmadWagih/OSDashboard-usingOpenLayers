import React, { useContext,useState,useEffect } from "react";
import { DashBoardContext } from "../../contexts/dashBoardContext";


const Indicator = (props) => {
  const {attributes,createWidget} = useContext(DashBoardContext);
  const [state,setState]=useState({ title: "",alignTitle:"left", textSize: "",textColor:"#ff0000", bgColor: "#ffffff" ,attribute:attributes[2],agg:"sum"})

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((oldUser) => ({ ...oldUser, [name]: value }));
  };

  return (  <>
    <div className="list-group-item">
      <h4>
        Indicator
        <i className="fa-solid fa-rectangle-xmark close" onClick={props.closeRightPanel}></i>
      </h4>
    </div>
    <div className="component-div border-bot">
      <label htmlFor="componentName" className="label-dark">
        Title :
      </label>
      <input
        name='title'
        onChange={handleChange}
        className="text-input-dark d-block"
        placeholder="Enter Comp. name"
        id="component-name"
        value={state.title}
      />
    </div>
    <div className="component-div border-bot">
    <label htmlFor="alignTitle" className="label-dark w-75">
        Title align :
      </label>
      <select name="alignTitle" className="drop-down w-75 p-0" id="alignTitle" onChange={handleChange}>
        <option value="left">left</option>
        <option value="center">center</option>
        <option value="right">right</option>
      </select>
    </div>
    <div className="component-div border-bot">
      <label htmlFor="text-size" className="label-dark w-75">
        Text size :
      </label>
      <input
        name="textSize"
        onChange={handleChange}
        type="number"
        className="text-input-dark w-20"
        id="text-size"
        value={state.textSize}
      />
    </div>
    <div className="component-div border-bot">
      <label htmlFor="color" className="label-dark w-75">
        Text Color
      </label>
      <input
      name="textColor"
        type="color"
        id="color"
        onChange={handleChange}
        value={state.textColor}
      />
    </div>
    <div className="component-div border-bot">
      <label htmlFor="background-color" className="label-dark w-75">
        Background Color
      </label>
      <input
        name="bgColor"
        type="color"
        id="background-color"
        onChange={handleChange}
        value={state.bgColor}
      />
    </div>
    <div className="component-div border-bot">
      <label htmlFor="componentName" className="label-dark w-75">
        Indecator Field
      </label>
      <select name="attribute" className="drop-down w-75 p-0" id="Field" onChange={handleChange}>
        {attributes?.map((att,index)=>{
          return <option key={index} value={att}>{att}</option>
        })}
      </select>
    </div>
    <div className="component-div border-bot">
      <label htmlFor="agg" className="label-dark w-75">
        Aggregate
      </label>
      <select name="agg" className="drop-down w-75 p-0" id="agg" onChange={handleChange}>
        <option value="sum">sum</option>
        <option value="mean">mean</option>
        <option value="min">min</option>
        <option value="max">max</option>
      </select>
    </div>
    <button onClick={()=>createWidget("indicator",state)} className="button-form ">
        apply
      </button>
  </> );
}
 
export default Indicator;