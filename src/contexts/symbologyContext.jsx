import { createContext, useState } from "react";

import { EditLayer, getLayerById } from "../APIs/layer";
import { drawGeoJson } from "../helper/addMapHelper";

export const SymbologyContext = createContext();


const SymbologyContextProvider = ({ children }) => {

  const [features, setFeatures] = useState(null);
  const layerId = 1;
  const [layer,setLayer] = useState(null);

  async function readLayer(map) {
    const layer = await getLayerById(layerId);
    let features = drawGeoJson(map, layer.geoJson, layer.style);
    setLayer(layer);
    setFeatures(features);
  }

  const changeStyle = (style) => {
    features.map((f) => f.setStyle(style));
    setLayer({...layer,style})
  };

  const saveStyle = ()=>{
    EditLayer(layerId,layer)
  }

  return (
    <SymbologyContext.Provider value={{ readLayer, changeStyle,saveStyle }}>
      {children}
    </SymbologyContext.Provider>
  );
};

export default SymbologyContextProvider;
