import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DashBoardContext } from "../../contexts/dashBoardContext";

const Indicator = (props) => {
  const { attributes, createWidget } = useContext(DashBoardContext);
  const [state, setState] = useState({    // initialize state
    title: "",
    alignTitle: "left",
    textSize: "",
    textColor: "#ff0000",
    bgColor: "#00cccc",
    attribute: "",
    agg: "sum",
    format: "default",
  });

  // did mount - with every render
  useEffect(()=>{
    if (props.state) {
      console.log(props.state);
      setState(props.state)      
    }
  },[props])

  // submit button handle
  const submit = () => {
    console.log(state);
    if (state.title === "" || state.attribute === "") {
      toast.error(" Title or Indicator field is missing", {
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
        createWidget("indicator", state);
        props.closeRightPanel()
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((oldUser) => ({ ...oldUser, [name]: value }));
  };

  return (
    <>
      <div className="list-group-item">
        <h4>
          Indicator
          <i
            className="fa-solid fa-rectangle-xmark close"
            onClick={props.closeRightPanel}
          ></i>
        </h4>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="component-name" className="label-dark">
          Title :
        </label>
        <input
          name="title"
          onChange={handleChange}
          className="text-input-dark w-75"
          placeholder="Enter Comp. name"
          id="component-name"
          value={state.title}
        />
      </div>
      <div className="component-div border-bot">
        <label htmlFor="alignTitle" className="label-dark w-75">
          Title align :
        </label>
        <select
          name="alignTitle"
          className="drop-down w-75 p-0"
          id="alignTitle"
          value={state.alignTitle}
          onChange={handleChange}
        >
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
          min={8}
          max={72}
          step={2}
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
        <label htmlFor="IndField" className="label-dark w-75">
          Indicator Field
        </label>
        <select
          name="attribute"
          className="drop-down w-75 p-0"
          id="IndField"
          value={state.attribute}
          onChange={handleChange}
        >
          <option value={""} hidden disabled >Select Field</option>
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
        <label htmlFor="agg" className="label-dark w-75">
          Aggregate
        </label>
        <select
          name="agg"
          className="drop-down w-75 p-0"
          id="agg"
          onChange={handleChange}
          value={state.agg}
        >
          <option value="sum">sum</option>
          <option value="mean">mean</option>
          <option value="min">min</option>
          <option value="max">max</option>
          <option value="count">count</option>
        </select>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="format" className="label-dark w-75">
          Format
        </label>
        <select
          name="format"
          className="drop-down w-75 p-0"
          id="format"
          onChange={handleChange}
          value={state.format}
        >
          <option value="default">1000000</option>
          <option value="comma">1,000,000</option>
          <option value="dollar">$1,000,000</option>
          <option value="egPound">LE1,000,000</option>
          <option value="K">1000 K</option>
          <option value="M">1 M</option>
        </select>
      </div>
      <button onClick={submit} className="button-form ">
        apply
      </button>
    </>
  );
};

export default Indicator;
