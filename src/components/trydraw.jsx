import React, { useState,useRef, Component } from "react";
// import {
//   interaction,
//   layer,
//   custom,
//   control, //name spaces
//   Interactions,
//   Overlays,
//   Controls, //group
//   Map,
//   Layers,
//   Overlay,
//   Util, //objects
// } from "react-openlayers";
// import Conrol from "ol/control/";
import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import XYZ from "ol/source/xyz";
import VectorLayer from "ol/layer/vector";
import GeoJSON from "ol/format/geojson";
import CircleStyle from "ol/style/circle";
import Fill from "ol/style/fill";
import Stroke from "ol/style/stroke";
import Style from "ol/style/style";
import olDraw from "ol/interaction/draw";
import VectorSource from "ol/source/vector";
import OSM from "ol/source/osm";

const TryDraw = (props) => {
  const [mapp, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [selectedCoord, setSelectedCoord] = useState();
  let map;
  let drawSource;
  let drawInteraction;
  let drawControls = {
    isDrawing: false,
    isMeasuring: false,
    type: "point",
  };

  drawSource = new VectorSource();
  let OSMap = new TileLayer({ source: new OSM() });
  let stadia = new TileLayer({
    source: new XYZ({
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
    }),
  });
  let drawLayer = new VectorLayer({
    source: drawSource,
    style: new Style({
      fill: new Fill({
        color: "rgba(0, 0, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "#ff00e1",
        width: 2,
      }),
      image: new CircleStyle({
        radius: 4,
        fill: new Fill({
          color: "red",
        }),
      }),
    }),
  });
  map = new Map({
    target: "map",
    layers: [OSMap, drawLayer],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
  drawInteraction = addDrawInteraction("Point");

  let changeType = (e) => {
    map.removeInteraction(drawInteraction);
    drawControls.type = e.target.value;
    drawInteraction = addDrawInteraction(drawControls.type);
    if (drawControls.isDrawing) {
      map.addInteraction(drawInteraction);
    }
  };
  let drawing = () => {
    let drawactive = drawControls.isDrawing;
    let drawButton = document.getElementById("drawButton");
    if (!drawactive) {
      drawButton.style.backgroundColor = "gray";
      map.addInteraction(drawInteraction);
    } else {
      drawButton.style.backgroundColor = "#5555";
      map.removeInteraction(drawInteraction);
      //   if (drawControls.isMeasuring) {
      //     measure();
      //   }
    }
    drawControls.isDrawing = !drawactive;
  };
  function addDrawInteraction(type) {
    let drawInteraction = new olDraw({
      source: drawSource,
      type: type,
      style: new Style({
        fill: new Fill({
          color: "rgba(0, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "blue",
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 3,
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.7)",
          }),
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
        }),
      }),
    });
    return drawInteraction;
  }
  return (
    <React.Fragment>
      <div id="drawDiv">
        <button id="drawButton" onClick={drawing}>
          Draw
        </button>
        <label htmlFor="draw" className="drawLabel">
          Draw type
        </label>
        <select onChange={changeType} name="draw" id="drawList">
          <option value="Point">Point</option>
          <option value="LineString">Line</option>
          <option value="Polygon">Polygon</option>
        </select>
      </div>
      <div id="map"></div>
    </React.Fragment>
  );
};

export default TryDraw;
