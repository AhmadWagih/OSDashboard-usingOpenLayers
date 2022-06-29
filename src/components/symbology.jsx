import React, { useState, useCallback, useEffect } from "react";
import { getLayerById } from "../APIs/layer";
import { addMap, drawGeoJson } from "../helper/addMapHelper";
import { Routes, Route } from "react-router-dom";

import MyMap from "./Common/Map";
import LeftPanel from "./symbology/leftPanel";
import SingleSymb from "./symbology/SingleSymb";
import CatSymb from "./symbology/CatSymb";
import GraduatedSymbology from "./symbology/GraduatedSymbology";
import GraduatedColor from "./symbology/GraduatedColor";

const Symbology = () => {
  const [features, setFeatures] = useState(null);

  const changeStyle = (style) => {
    features.map((f) => f.setStyle(style));
  };

  // didMount -
  useEffect(() => {
    const { map, baseMapGroup } = addMap("map");
    async function readLayer() {
      const layer = await getLayerById(5);
      let { features } = drawGeoJson(map, layer.geoJson);
      setFeatures(features);
    }
    readLayer();
  }, []);

  return (
    <>
      <div className="row m-0">
        <div className="column-1">
          <LeftPanel />
        </div>
        <div className="col-3 sub-left-panel">
          <Routes>
            <Route
              path="/"
              element={<SingleSymb changeStyle={changeStyle} />}
            />
            <Route path="/Category" element={<CatSymb />} />
            <Route path="/GSize" element={<GraduatedSymbology />} />
            <Route path="/GColor" element={<GraduatedColor />} />
          </Routes>
        </div>
        <div className="col">
          <MyMap />
        </div>
      </div>
    </>
  );
};

export default Symbology;
