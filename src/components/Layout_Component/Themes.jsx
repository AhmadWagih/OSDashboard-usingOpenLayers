import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DashBoardContext } from "../../contexts/dashBoardContext";

const Themes = (props) => {
  const { attributes, createWidget } = useContext(DashBoardContext);
  const [state, setState] = useState({
    // initialize state
    title: "",
    alignTitle: "left",
    textSize: "",
    textColor: "#f0f9e80",
    bgColor: "#00cccc",
    attribute: "",
    agg: "sum",
    format: "default",
  });

  // did mount - with every render
  useEffect(() => {
    if (props.state) {
      console.log(props.state);
      setState(props.state);
    } else {
    }
  }, []);

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
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((oldUser) => ({ ...oldUser, [name]: value }));
  };

  const [show, setShow] = useState(true);
  return (
    <>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              onClick={props.closeRightPanel}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Theme
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <button
                onClick={props.closeRightPanel}
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Theme
              </button>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              onClick={() => {
                setShow(!show);
              }}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Background
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              {show ? (
                <div className="accordion-body ">
                  {/* ====================our code================================================================= */}
                  <div className="component-div ">
                    <label
                      htmlFor="background-color"
                      className="label-dark w-75"
                    >
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
                  {/* ============================================================================================== */}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              onClick={() => {
                setShow(!show);
              }}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Header
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              {show ? (
                <div className="accordion-body">
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
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Themes;
