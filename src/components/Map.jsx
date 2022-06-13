import React, { useState, useEffect } from "react";
import AddLayer from "./addLayer";
import { MapHook } from "./hooks/Map.js";

const MyMap = () => {
  const [mapState, setMapState] = useState({
    map: null,
    baseMapsGroup: null,
    data: null,
    layers: null,
    drawSource: null,
    drawInteraction: null,
    keys: null,
  });
  const {
    mapData,
    addDrawLayer,
    changeType,
    drawing,
    addDrawInteraction,
    addMap,
    changeBaseMap,
  } = MapHook();

  useEffect(()=>{
    addMap();
  },[])

  useEffect(() => {

    if(!mapData.map) return ;
    addDrawLayer();
    addDrawInteraction("Point");

    let rightPanel = document.getElementsByClassName(
      "ol-full-screen ol-unselectable ol-control "
    )[0];

    let baseMapButton = document.createElement("Button");
    let myIcon = document.createElement("i");
    baseMapButton.appendChild(myIcon);
    myIcon.className = "fa-solid fa-layer-group";
    baseMapButton.addEventListener("click", () => {
      let rightPanelBtns = [...rightPanel.children];
      let baseMapBtns = rightPanelBtns.slice(
        rightPanelBtns.length - 4,
        rightPanelBtns.length
      );
      for (const btn of baseMapBtns) {
        btn.style.display = btn.style.display !== "none" ? "none" : "block";
      }
    });
    rightPanel.appendChild(baseMapButton);

    let baseMaps = ["OSMap", "stadia", "stamen", "satellite"];
    for (const baseMap of baseMaps) {
      let img = document.createElement("img");
      img.className = "basemapimg";
      img.style.display = "none";
      img.id = baseMap;
      // img.innerHTML=`<img src={require("../imgs/${baseMap}.png")} alt="${baseMap}" />`
      img.src = require(`../imgs/${baseMap}.png`);
      img.alt = baseMap;
      img.addEventListener("click", changeBaseMap);
      rightPanel.appendChild(img);

      let zoomPanel = document.getElementsByClassName(
        "ol-zoom ol-unselectable ol-control"
      )[0];
      zoomPanel.style.top = "1em";
      zoomPanel.style.left = "1em";
    }
  }, [mapData.map]);

  
  return (
    <div id="map">
      <AddLayer />
    </div>
  );
};

export default MyMap;
