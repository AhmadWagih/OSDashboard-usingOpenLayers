import { useEffect,useContext } from "react";
import AddLayer from "../AddDataComponents/addLayer";
import { AddDataContext } from '../../contexts/addData';

const MyMap = () => {
  
  const {changeBaseMap,addMap,addDrawInteraction}=useContext(AddDataContext)
  useEffect(()=>{
    addMap();
    addDrawInteraction("Point");
    try {
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
        img.src = require(`../../imgs/${baseMap}.png`);
        img.alt = baseMap;
        img.addEventListener("click", changeBaseMap);
        rightPanel.appendChild(img);
  
        let zoomPanel = document.getElementsByClassName(
          "ol-zoom ol-unselectable ol-control"
        )[0];
        zoomPanel.style.top = "1em";
        zoomPanel.style.left = "1em";
      }
    } catch (error) {}
  },[]) 

  return (
    <div id="map">
      <AddLayer />
    </div>
  );
};

export default MyMap;
