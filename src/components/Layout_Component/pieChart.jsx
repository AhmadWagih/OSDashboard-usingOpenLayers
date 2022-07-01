import { useContext, useState ,useEffect} from "react";
import { toast } from "react-toastify";
import { DashBoardContext } from "./../../contexts/dashBoardContext";

const PieChart = (props) => {
  const { attributes, createWidget } = useContext(DashBoardContext);
  const [state, setState] = useState({
    title: "",
    alignTitle: "left",
    textSize: "",
    textColor: "#ff0000",
    bgColor: "#ffffff",
    attributeX:"",
    attributeY:"",
    is3D:true,
    donught:false,
    agg:"sum"
  });

  const submit = () => {
    if (state.title === "" && state.attributeX !== ""&& state.attributeY !== "") {
      toast.error(" Title or Attribute field is missing", {
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      createWidget("chart", state);
      props.closeRightPanel();
    }
  };

  const handleChange = (event) => {
    const { type, name, value } = event.target;
    type==="checkbox"
    ?setState((oldUser) => ({ ...oldUser, [name]: !oldUser[name] }))
    :setState((oldUser) => ({ ...oldUser, [name]: value }));
  };

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
      <div className="component-div border-bot">
        <label htmlFor="componentName" className="label-dark">
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
      <div className="component-div ">
        <label htmlFor="componentName" className="label-dark w-75">
          X Direction
        </label>
        <select
          name="attributeX"
          className="drop-down w-75 p-0"
          id="Field"
          value={state.attributeX}
          onChange={handleChange}
        >
          <option value={""} hidden disabled>
            Select Field
          </option>
          {attributes?.map((att, index) => {
            return (
              <option key={index} value={att}>
                {att}
              </option>
            );
          })}
        </select>
      </div>
      <div className="component-div">
        <label htmlFor="componentName" className="label-dark w-75">
          Y Direction
        </label>
        <select
          name="attributeY"
          className="drop-down w-75 p-0"
          id="Field"
          value={state.attributeY}
          onChange={handleChange}
        >
          <option value={""} hidden disabled>
            Select Field
          </option>
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
      <div className="component-div">
        <input type="checkbox" className="form-check-input" name="is3D" id="is3D" onChange={handleChange} checked={state.is3D}/>
        <label htmlFor="is3D" className="label-dark w-75"> 3D Chart </label>
      </div>
      <div className="component-div">
        <input type="checkbox" className="form-check-input" name="donught" id="donught" onChange={handleChange} checked={state.donught} />
        <label htmlFor="donught" className="label-dark w-75"> Donught </label>
      </div>
      <button onClick={submit} className="button-form ">
        apply
      </button>
    </>
  );
};

export default PieChart;
