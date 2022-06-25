import React, { useCallback, useState, useContext } from "react";
import { AddDataContext } from "./../../contexts/addData";

const Csv = () => {
  const [state, setState] = useState({
    layerName: "",
    isOpen: false,
    CoordSys: "EPSG:4326",
    jsonurl: "",
    longKey: "",
    latKey: "",
    selectedFile: null,
    data: null,
    attOptions: null,
    attributes: [{ name: "", key: "" }], //name of attributes given by the user & the chosen fields from the json file
  });

  const { save, finalView } = useContext(AddDataContext);

  const handleChange = useCallback((e) => {
    const { value, name, type } = e.target;
    if (type !== "file") {
      setState((u) => ({ ...u, [name]: value }));
    } else {
      setState((u) => ({ ...u, [name]: e.target.files }));
    }
  }, []);

  const readData = async () => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      viewData(event.target.result);
    });
    reader.readAsText(state.selectedFile[0]);
  };
  const handleChangeAtt = useCallback(
    (e) => {
      let { value, type, name } = e.target;
      let attributes = [...state.attributes];
      if (type === "text") {
        attributes[+name]["name"] = value;
      } else {
        attributes[+name]["key"] = value;
      }
      console.log(attributes);
      setState((u) => ({ ...u, attributes: attributes }));
    },
    [state.attributes]
  );
  const viewData = (data) => {
    let arr = data.split("\n");
    let dataKeys = arr[0].split(",");

    let latKey, longKey;
    for (const key of dataKeys) {
      if (
        key.toLowerCase().includes("lon") ||
        key.toLowerCase().includes(" lon")
      ) {
        longKey = key;
      } else if (
        key.toLowerCase().includes("lat") ||
        key.toLowerCase().includes(" lat")
      ) {
        latKey = key;
      }
    }
    let attOptions = dataKeys.map((elm) => {
      return (
        <option key={elm} value={elm}>
          {elm}
        </option>
      );
    });
    let jsonObj = [];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== "") {
        let row = arr[i].split(",");
        let obj = {};
        for (let j = 0; j < row.length; j++) {
          if (row[j].trim() !== "") {
            obj[dataKeys[j].trim()] = row[j].trim();
          }
        }
        if (Object.keys(obj.length > 1))  jsonObj.push(obj);
      }
    }
    let att = [...state.attributes];
    let attributes = att.map((elm) => ({ name: elm.name, key: dataKeys[0] }));
    console.log(jsonObj);
    setState({
      ...state,
      data: jsonObj,
      attOptions,
      latKey,
      longKey,
      attributes,
    });
  };

  const addField = useCallback(() => {
    let att = [...state.attributes];
    att.push({ name: "", key: "" });
    setState({ ...state, attributes: att });
  }, [state]);

  return (
    <>
      <div className="list-group-item">
        <h3>CSV Import</h3>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="layer-name" className="label-dark">
          Layer Name
        </label>
        <input
          onChange={handleChange}
          value={state.layerName}
          name="layerName"
          className="text-input-dark"
          placeholder="Layer1"
          id="layer-name"
        />
      </div>

      <div className="component-div border-bot">
        <label htmlFor="coord-text" className="label-dark">
          Coord System
        </label>
        <input
          onChange={handleChange}
          name="CoordSys"
          className="text-input-dark w-25"
          placeholder="EPSG:4326"
          value={state.CoordSys}
          id="coord-text"
        />
        <select
          className="drop-down p-0"
          id="coord-select"
          name="coord-select"
          onChange={(e) => {
            setState({ ...state, CoordSys: e.target.value });
          }}
        >
          <option value="EPSG:4326" defaultChecked>
            WGS 84
          </option>
          <option value="EPSG:3857">Psedu-Mercator</option>
          <option value="EPSG:22993">Egypt Purple Belt</option>
          <option value="EPSG:22992">Egypt Red Belt</option>
          <option value="EPSG:22991">Egypt Blue Belt</option>
        </select>
      </div>
      <div className="component-div border-bot p-0">
        <input
          type="file"
          onChange={handleChange}
          name="selectedFile"
          files={state.selectedFile}
          accept=".csv"
          className="button-form"
          id="uploadFile"
        />
      </div>
      <div className="component-div border-bot">
        <button onClick={readData} className="button-form">
          check
        </button>
      </div>
      <div className="component-div border-bot">
        <div className="p-1 w-50">
          <label className="label-dark" id="long-label" htmlFor="long-select">
            Longitude
          </label>
          <select
            onChange={handleChange}
            name="longKey"
            id="long-select"
            className="drop-down w-100 p-0 d-inline"
            value={state.longKey}
          >
            {state.attOptions}
          </select>
        </div>
        <div className="p-1 w-50">
          <label className="label-dark" id="lat-label" htmlFor="lat-select">
            Latitude
          </label>
          <select
            onChange={handleChange}
            name="latKey"
            className="drop-down w-100 p-0 d-inline"
            id="lat-select"
            value={state.latKey}
          >
            {state.attOptions}
          </select>
        </div>
      </div>
      {/* ---------- */}
      <div className="component-div mh-250">
        <div id="attribute-container" className="w-100">
          <label className="label-dark w-50">
            <b>Property Name</b>
          </label>
          <label className="label-dark w-50">
            <b> Property Field </b>
          </label>
          {state.attributes.map((elm, index) => (
            <div key={index} index={index}>
              <input
                onChange={handleChangeAtt}
                name={index}
                className="text-input-dark"
                style={{ width: "48%", marginRight: "6px" }}
                value={elm.name}
              />
              <select
                onChange={handleChangeAtt}
                name={index}
                className="drop-down w-50 d-inline"
                value={elm.key}
              >
                {state.attOptions}
              </select>
            </div>
          ))}
        </div>
      </div>
      <div className="component-div border-bot">
        <div id="add-field-div" onClick={addField}>
          Add Field
        </div>
      </div>
      <button
        onClick={() =>
          finalView(
            state.data,
            state.CoordSys,
            state.longKey,
            state.latKey,
            state.attributes
          )
        }
        className="button-form "
      >
        View
      </button>
      <button onClick={() => save()} className="button-form ">
        Save
      </button>
    </>
  );
};

export default Csv;
