import React, { useState, useCallback, useContext } from "react";
import axios from "axios";
import { AddDataContext } from "./../../contexts/addData";
import { toast } from "react-toastify";

const JsonFile = () => {
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
    isLoaded:false,
    isViewed:false,
    attributes: [{ name: "", key: "" }], //name of attributes given by the user & the chosen fields from the json file
    method: null,
  });

  const { save, finalView } = useContext(AddDataContext);

  const [style, setStyle] = useState([
    { display: "none" },
    { display: "none" },
  ]);

  const handleChange = useCallback((e) => {
    const { value, name, type } = e.target;
    if (type !== "file") {
      setState((u) => ({ ...u, [name]: value }));
    } else {
      setState((u) => ({ ...u, [name]: e.target.files }));
    }
  }, []);

  const handleChangeAtt = useCallback(
    (e) => {
      let { value, type, name } = e.target;
      let attributes = [...state.attributes];
      if (type === "text") {
        attributes[+name]["name"] = value;
      } else {
        attributes[+name]["key"] = value;
      }
      setState((u) => ({ ...u, attributes: attributes }));
    },
    [state.attributes]
  );

  const readData = async () => {
    // let url = "https://corona.lmao.ninja/v2/countries"; //url -----------------------
    if (state.method === "url") {
      try {
        let { data } = await axios.get(state.jsonurl);
        viewData(data);
      } catch (error) {
        toast.error("can't fetch data from "+state.jsonurl, {
          position: "bottom-left",
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } else if (state.method === "uploadFile") {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        viewData(JSON.parse(event.target.result));
      });
      reader.readAsText(state.selectedFile[0]);
    }
  };
  const viewData = (data) => {
    if (!data.length) {
      data = Object.values(data)[0];
    }
    let dataKeys = [];
    let Keys = Object.keys(data[0]);
    for (let i = 0; i < Keys.length; i++) {
      const value = Object.values(data[0])[i];
      if (typeof value == "object") {
        for (let j = 0; j < Object.keys(value).length; j++) {
          let nestedkey = Object.keys(value)[j];
          let value2 = Object.values(value)[j];
          if (typeof value2 == "object") {
            for (const nestednestedkeys of Object.keys(value2)) {
              dataKeys.push(
                Keys[i] + " / " + nestedkey + " / " + nestednestedkeys
              );
            }
          } else {
            dataKeys.push(Keys[i] + " / " + nestedkey);
          }
        }
      } else {
        dataKeys.push(Keys[i]);
      }
    }
    let latKey, longKey;
    for (const key of dataKeys) {
      if (key.toLowerCase().includes("lon")||key.toLowerCase().includes(" lon")) {
        longKey = key;
      } else if (key.toLowerCase().includes(" lat")||key.toLowerCase().includes(" lat")) {
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
    let att = [...state.attributes];
    let attributes = att.map((elm) => ({ name: elm.name, key: dataKeys[0] }));
    setState({ ...state, data, attOptions, latKey, longKey, attributes });
  };

  const radio = useCallback(
    (e) => {
      state.method = e.target.value;
      state.isOpen=true;
      let style = [];
      if (state.method === "url") {
        style = [{ display: "none" }, { display: "block" }];
      } else {
        style = [{ display: "block" }, { display: "none" }];
      }
      setStyle(style);
    },
    [state, setStyle]
  );

  const addField = useCallback(() => {
    let att = [...state.attributes];
    att.push({ name: "", key: "" });
    setState({ ...state, attributes: att });
  }, [state]);

  const handleFinalView=()=>{
    if(state.isLoaded){
      finalView(
        state.data,
        state.CoordSys,
        state.longKey,
        state.latKey,
        state.attributes
      )
      state.isViewed=true;
    }else{
      toast.error("Load data First", {
        position: "bottom-left",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }
  const handleReadData=()=>{
    if(state.isOpen){
      readData()
      state.isLoaded=true;
    }else{
      toast.error("please Enter Url or Choose File", {
        position: "bottom-left",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }

  const handleSave=useCallback(()=>{
    if (state.layerName!==""&&state.isViewed) {
      save(state.layerName);
    }else{
      let message = state.layerName!==""? "You can't save without View data":" Add Layer Name ";
      toast.error(message, {
        position: "bottom-left",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  },[save,state])

  return (
    <>
      <div className="list-group-item">
        <h4>JsonFile Import</h4>
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
      <div className="component-div">
        <div className="w-50">
          <input
            type="radio"
            onClick={radio}
            className="form-check-label"
            name="json"
            id="jsonFile"
            value="uploadFile"
            />
          <label className="label-dark" htmlFor="jsonFile">
            Upload Json File
          </label>
        </div>
        <div className="w-50">
          <input
            type="radio"
            onClick={radio}
            className="form-check-label"
            name="json"
            value="url"
            id="jsonUrl"
            />
          <label htmlFor="jsonUrl">input URL</label>
        </div>
      </div>
      <div className="component-div border-bot p-0">
        <input
          type="file"
          onChange={handleChange}
          name="selectedFile"
          files={state.selectedFile}
          accept=".json"
          className="button-form w-100 m-2"
          style={style[0]}
          id="uploadFile"
          />
        <input
          type="url"
          onChange={handleChange}
          value={state.jsonurl}
          className="text-input-dark m-2"
          name="jsonurl"
          id="url"
          size="32"
          style={style[1]}
          placeholder="http//:...."
          />
      </div>
      <div className="component-div border-bot">
        <button onClick={handleReadData} className="button-form">
          Load Data
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
            <div key={index} index={index} >
              <input
                onChange={handleChangeAtt}
                name={index}
                className="text-input-dark"
                style={{width:"48%",marginRight:"6px"}}
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
        onClick={handleFinalView}
        className="button-form "
      >
        Preview
      </button>
      <button onClick={handleSave} className="button-form ">
        Save
      </button>
    </>
  );
};

export default JsonFile;
