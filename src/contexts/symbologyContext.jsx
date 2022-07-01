import { createContext, useState } from "react";

import { EditLayer, getLayerById } from "../APIs/layer";
import { drawGeoJson } from "../helper/addMapHelper";

export const SymbologyContext = createContext();


const SymbologyContextProvider = ({ children }) => {

  const [attributes, setAttributes] = useState(null);
  const [data, setData] = useState(null);
  const [features, setFeatures] = useState(null);
  const [layer,setLayer] = useState(null);

  async function readLayer(map,layerId) {
    const layer = await getLayerById(layerId);
    let {features} = drawGeoJson(map, layer.geoJson, layer.style);
    let attributes = features[0].getKeys();
    attributes.shift();  // to remove first element
    setAttributes(attributes);
    setLayer(layer);
    setFeatures(features);
  }

  const assignStyle = (type,style,attribute) => {
    switch (type) {
      case "single":
        features.map((f) => f.setStyle(style));
        break;
      case  "label":
        features.map((f) => f.setStyle((feature)=>{
          style.getText().setText(feature.get(attribute).toString());
          return style;
        },));
        break;
        default:
        console.log("error");
        break;
    }
  };

  const saveStyle = (styleData)=>{
    console.log(styleData);
    EditLayer(layer.id,{...layer,style:styleData})
  }

  return (
    <SymbologyContext.Provider value={{ readLayer, assignStyle,saveStyle,attributes }}>
      {children}
    </SymbologyContext.Provider>
  );
};

export default SymbologyContextProvider;
