import React, { useState , useCallback } from "react";
import axios from "axios";

const JsonFile = (props) => {
  const [state,setState] = useState({
    layerName:"",
    isOpen: false,
    CoordSys: "EPSG:4326",
    jsonurl:"", 
    longKey:"",
    latKey:"",
    selectedFile:null,
    data:null,
    attOptions:null,
    attributes:[{name:"",key:""}],     //name of attributes given by the user & the chosen fields from the json file
    method:null,
  })
  const [style,setStyle] = useState([{display:"none"},{display:"none"}]);

  const handleChange = useCallback( (e) => {
    const {value,name,type} = e.target;
    if (type!="file") {     
      setState((u) => ({ ...u, [name]: value }))
    }else{
      setState((u) => ({ ...u, [name]: e.target.files }))
    }
  },[])
  
  const handleChangeAtt = useCallback( (e) => {
    let {value,type,name} = e.target;
    let attributes=[...state.attributes];
    if(type=="text"){
      console.log(name);
      console.log(attributes);
      attributes[+name]["name"]=value;
    }else{
      attributes[+name]["key"]=value;
    }
    console.log(attributes);
        setState((u) => ({ ...u, attributes:attributes}))
  },[state.attributes])

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
    let latKey,longKey;
    for (const key of dataKeys) {
      if (key.includes(" lon")) {
        longKey = key;
      } else if (key.includes(" lat")) {
        latKey = key;
      }
    }
    let attOptions = dataKeys.map(elm=>{return <option key={elm} value={elm}>{elm}</option>})
    let att = [...state.attributes];
    let attributes=att.map(elm=>({name:elm.name,key:dataKeys[0]}));
    console.log(attributes);
    setState({...state,data,attOptions,latKey,longKey,attributes});
  };

  const radio = useCallback( (e) => {
    state.method = e.target.value;
    let style=[];
    if (state.method === "url") {
      style=[{display:"none"},{display:"block"}];
    }else{
      style=[{display:"block"},{display:"none"}];
    }
    setStyle(style)
  },[state.method]);

  const addField = useCallback( () => {
    let att= [...state.attributes];
    att.push({name:'',key:''});
    setState({...state,attributes:att})
  },[state.attributes]);
  return ( <>
    <h3>JsonFile Import</h3>
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
        type="radio"
        onClick={radio}
        className="form-check-input"
        name="json"
        id="jsonFile"
        value="uploadFile"
      />
      <label className="form-col" htmlFor="jsonFile">
        Upload Json File
      </label>
      <input
        type="radio"
        onClick={radio}
        className="form-check-input"
        name="json"
        value="url"
        id="jsonUrl"
      />
      <label htmlFor="jsonUrl">input URL</label>
      <input
        type="file"
        onChange={handleChange}
        name="selectedFile"
        files={state.selectedFile}
        accept=".json"
        className="button-form"
        style={style[0]}
        id="uploadFile"
      />
      <input
        type="url"
        onChange={handleChange}
        value={state.jsonurl}
        className="text-input"
        name="jsonurl"
        id="url"
        size="40"
        style={style[1]}
        placeholder="http//:...."
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
          onChange={handleChange}
          name="longKey"
          id="long-select"
          className="form-select w-50 p-0 d-inline"
          value={state.longKey}
        >{state.attOptions}</select>
      </div>
      <div className="p-1">
        <label className="form-col" id="lat-label" htmlFor="lat-select">
          Latitude
        </label>
        <select
          onChange={handleChange}
          name="latKey"
          className="form-select w-50 p-0 d-inline"
          id="lat-select"
          value={state.latKey}
        >{state.attOptions}</select>
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
          {state.attributes.map((elm,index)=>(
          <div key={index} index={index}>
          <input onChange={handleChangeAtt} name={index} className="form-col text-input" value={elm.name}/>
          <select onChange={handleChangeAtt} name={index} className="form-select w-50 p-0 d-inline" value={elm.key}
          >{state.attOptions}</select>
          </div>
        ))}
      </div>
      <div id="add-field-div" onClick={addField}>
        Add Field
      </div>
    </div>
    <button
      onClick={() => props.finalView(state.data,state.CoordSys,state.longKey,state.latKey,state.attributes)}
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
 
export default JsonFile;

