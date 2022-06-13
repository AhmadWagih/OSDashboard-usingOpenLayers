import React, { useCallback,useState } from "react";
import axios from "axios";

const Csv = (props) => {
  const [state,setState]=useState({
    layerName:"",
    isOpen: false,
    CoordSys: "EPSG:4326",
    selectedFile:null,
    data:null,
    dataKeys:[],
    method:null,
  })
  const handleChange = useCallback( (e) => {
    const {value,name,type} = e.target;
    if (type!="file") {     
      setState((u) => ({ ...u, [name]: value }))
    }else{
      setState((u) => ({ ...u, [name]: e.target.files }))
    }
  },[])
  
  const readData = async () => {
    // let url = "https://corona.lmao.ninja/v2/countries"; //url -----------------------
    if (state.method === "url") {
      let { data } = await axios.get(state.jsonurl);
      viewData(data);
    } else if (state.method === "uploadFile") {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        viewData(JSON.parse(event.target.result));
      });
      reader.readAsText(state.selectedFile[0]);
    }
  };

  const viewData = (data) => {
    console.log(data);
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
    let attrOptions = dataKeys.map((key) => `<option ${key}>${key}</option>`);
    let attSelectors = document.querySelectorAll("select[name=att-select]");
    for (const elm of attSelectors) {
      elm.innerHTML = attrOptions.join("");
    }
    for (const key of dataKeys) {
      if (key.includes(" lon")) {
        document.getElementById("long-select").value = key;
      } else if (key.includes(" lat")) {
        document.getElementById("lat-select").value = key;
      }
    }
    data = data;
    setState({...state,dataKeys:dataKeys});
  };

  const addField = () => {
    let newdiv = document.createElement("div");
    let attrOptions = state.dataKeys.map(
      (key) => `<option ${key}>${key}</option>`
    );
    newdiv.innerHTML = `
    <input type="text" class="form-col text-input"/><select name="att-select" class="form-select w-50 p-0 d-inline">${attrOptions.join(
      ""
    )}</select>`;
    document.getElementById("attribute-container").appendChild(newdiv);
  };

  return (  <>
    <h3>CSV File Import</h3>
    <div className="div-border-round">
  <label htmlFor="layer-name" className="form-col">
    Layer Name
  </label>
  <input onChange={handleChange} value={state.layerName} name="layerName" className="text-input" placeholder="Layer1" id="layer-name" />
  <div className="dropdown">
    <label htmlFor="coord-text" className="form-col">
      Coordinate System
    </label>
    <input
      onChange={handleChange}
      name="CoordSys"
      className="text-input w-25 "
      placeholder="EPSG:4326"
      value={state.CoordSys}
      id="coord-text"
    />
  </div>
  <div>
    <label className="form-col"></label>
    <select
      className="form-select w-50 p-0 d-inline"
      id="coord-select"
      name="coord-select"
      onChange={(e) => {
        setState({...state,CoordSys:e.target.value})
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
</div>
<div className="div-border-round">
  <input
    type="file"
    onChange={handleChange}
    name="selectedFile"
    files={state.selectedFile}
    accept=".json"
    className="button-form"
    id="uploadFile"
  />
</div>
<button onClick={readData} className="button-form">
  check
</button>
<div className="div-border-round">
  <div className="p-1">
    <label className="form-col" id="long-label" htmlFor="long-select">
      Longitude
    </label>
    <select
      name="att-select"
      id="long-select"
      className="form-select w-50 p-0 d-inline"
    ></select>
  </div>
  <div className="p-1">
    <label className="form-col" id="lat-label" htmlFor="lat-select">
      Latitude
    </label>
    <select
      name="att-select"
      className="form-select w-50 p-0 d-inline"
      id="lat-select"
    ></select>
  </div>
</div>
<div className="div-border-round mh-250">
  <div id="attribute-container">
    <div className="p-1">
      <label className="form-col">
        <b>Property Name</b>
      </label>
      <label>
        <b> Property Field </b>
      </label>
    </div>
    <div>
      <input type="text" className="form-col text-input" />
      <select
        name="att-select"
        className="form-select w-50 p-0 d-inline"
      ></select>
    </div>
  </div>
  <div id="add-field-div" onClick={addField}>
    Add Field
  </div>
</div>
<button
  onClick={() => props.finalView(state.data)}
  className="button-form "
>
  View
</button>
<button
  onClick={() => props.save()}
  className="button-form "
>
  Save
</button>
</> );
}
 
export default Csv;


