import React, { useEffect, useContext } from "react";
import { AddDataContext } from "../../contexts/addData";

const Draw = () => {
  const { mapData, addLayerForm, drawing, save } = useContext(AddDataContext);
  const { mapIsLoaded } = mapData;
  let drawBtns;

  const addDrawButtons = () => {
    //--- add buttons
    let zoomPanel = document.getElementsByClassName(
      "ol-zoom ol-unselectable ol-control"
    )[0];
    let addLayerButton = document.createElement("Button");
    let myIcon0 = document.createElement("i");
    myIcon0.className = "fa-solid fa-folder-plus";
    addLayerButton.appendChild(myIcon0);
    addLayerButton.addEventListener("click", addLayerForm);
    zoomPanel.appendChild(addLayerButton);

    let drawButton = document.createElement("Button");
    let myIcon1 = document.createElement("i");
    myIcon1.className = "fa-solid fa-compass-drafting";
    drawButton.appendChild(myIcon1);
    drawButton.addEventListener("click", drawing);
    zoomPanel.appendChild(drawButton);

    let saveButton = document.createElement("Button");
    let myIcon2 = document.createElement("i");
    myIcon2.className = "fa-solid fa-floppy-disk";
    saveButton.appendChild(myIcon2);
    saveButton.addEventListener("click", save);
    zoomPanel.appendChild(saveButton);
    drawBtns = [saveButton, drawButton, addLayerButton];
  };
  const removeDrawButtons = () => {
    for (const btn of drawBtns) {
      btn.remove();
    }
  };

  useEffect(() => {
    try {
      addDrawButtons();
    } catch (error) {}
    document.getElementById("2ndCol").style.display = "none";
    document.getElementById("map").style.width = "80%";
    return () => {
      try {
        removeDrawButtons();
        let form = document.getElementsByClassName("div-container")[0];
        form.classList.add("hidden");
      } catch (error) {}
      try {
        document.getElementById("2ndCol").style.display = "block";
      } catch (error) {}
      document.getElementById("map").style.width = "auto";
    };
  }, [mapIsLoaded, addDrawButtons, removeDrawButtons]);
  return (
    <>
      {/* <div id="drawDiv">
      <label htmlFor="draw" className="drawLabel">
        Draw type
      </label>
      <select onChange={props.changeType} name="draw" id="drawList">
        <option value="Point">Point</option>
        <option value="LineString">Line</option>
        <option value="Polygon">Polygon</option>
      </select>
    </div> */}
    </>
  );
};

export default Draw;
