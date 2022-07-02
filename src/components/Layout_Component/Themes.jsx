import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DashBoardContext } from "../../contexts/dashBoardContext";

const Themes = (props) => {
  const { attributes, createWidget } = useContext(DashBoardContext);
  const [state, setState] = useState({
    // initialize state
    bgColor: "#00cccc",
    titleHeader: "",
    alignTitleHeader: "left",
    textSizeHeader: "",
    textColorHeader: "#f0f9e8",
    titleFooter: "",
    alignTitleFooter: "left",
    textSizeFooter: "",
    textColorFooter: "#f0f9e8",
  });

  // did mount - with every render
  useEffect(() => {
    if (props.state) {
      console.log(props.state);
      setState(props.state);
    } else {
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((oldUser) => ({ ...oldUser, [name]: value }));
  };

  return (
    <>
      <div>
        <h4 className="list-group-item">Widgets</h4>
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
      <div>
        <h4 style={{color:"white",paddingLeft:"10px",margin:"5px" }}>Header</h4>
      </div>
      <div className="component-div">
        <label htmlFor="component-name" className="label-dark">
          Title :
        </label>
        <input
          name="titleHeader"
          onChange={handleChange}
          className="text-input-dark w-75"
          placeholder="Enter Comp. name"
          id="component-name"
          value={state.title}
        />
      </div>
      <div className="component-div">
        <label htmlFor="alignTitleHeader" className="label-dark w-75">
          Title align :
        </label>
        <select
          name="alignTitleHeader"
          className="drop-down w-75 p-0"
          id="alignTitleHeader"
          value={state.alignTitleHeader}
          onChange={handleChange}
        >
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>
      </div>
      <div className="component-div">
        <label htmlFor="text-size-header" className="label-dark w-75">
          Text size :
        </label>
        <input
          min={8}
          max={72}
          step={2}
          name="textSizeHeader"
          onChange={handleChange}
          type="number"
          className="text-input-dark w-20"
          id="text-size-header"
          value={state.textSizeHeader}
        />
      </div>
      <div className="component-div border-bot">
        <label htmlFor="colorHeader" className="label-dark w-75">
          Text Color
        </label>
        <input
          name="textColorHeader"
          type="color"
          id="colorHeader"
          onChange={handleChange}
          value={state.textColorHeader}
        />
      </div>
      <div>
        <h4 style={{color:"white",paddingLeft:"10px",margin:"5px" }}>Footer</h4>
      </div>
      <div className="component-div">
        <label htmlFor="component-name-footer" className="label-dark">
          Title :
        </label>
        <input
          name="titleFooter"
          onChange={handleChange}
          className="text-input-dark w-75"
          placeholder="Enter title name"
          id="component-name-footer"
          value={state.titleFooter}
        />
      </div>
      <div className="component-div">
        <label htmlFor="alignTitleFooter" className="label-dark w-75">
          Title align :
        </label>
        <select
          name="alignTitleFooter"
          className="drop-down w-75 p-0"
          id="alignTitleFooter"
          value={state.alignTitleFooter}
          onChange={handleChange}
        >
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>
      </div>
      <div className="component-div">
        <label htmlFor="text-size-footer" className="label-dark w-75">
          Text size :
        </label>
        <input
          min={8}
          max={72}
          step={2}
          name="textSizeFooter"
          onChange={handleChange}
          type="number"
          className="text-input-dark w-20"
          id="text-size-footer"
          value={state.textSizeFooter}
        />
      </div>
      <div className="component-div border-bot">
        <label htmlFor="colorFooter" className="label-dark w-75">
          Text Color
        </label>
        <input
          name="textColorFooter"
          type="color"
          id="colorFooter"
          onChange={handleChange}
          value={state.textColorFooter}
        />
      </div>
    </>
  );
};

export default Themes;
