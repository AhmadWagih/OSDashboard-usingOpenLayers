//#region
import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import XYZ from "ol/source/xyz";
import OSM from "ol/source/osm";
import ScaleLine from "ol/control/scaleline";
import Rotate from "ol/control/rotate";
import OverViewMap from "ol/control/overviewmap";
import FullScreen from "ol/control/fullscreen";
import control from "ol/control.js";
import Group from "ol/layer/group.js";
import VectorLayer from "ol/layer/vector";
import CircleStyle from "ol/style/circle";
import Fill from "ol/style/fill";
import Stroke from "ol/style/stroke";
import Style from "ol/style/style";
import VectorSource from "ol/source/vector";
//#endregion

export const addMap = (target) => {
  let OSMap = new TileLayer({
    source: new OSM(),
    visible: false,
    title: "OSMap",
  });
  let stadia = new TileLayer({
    source: new XYZ({
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
    }),
    visible: true,
    title: "stadia",
  });
  let stamen = new TileLayer({
    source: new XYZ({
      url: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
    }),
    visible: false,
    title: "stamen",
  });
  let satellite = new TileLayer({
    source: new XYZ({
      url: "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=3pna9juQt4oFLoY3CxJw",
    }),
    title: "satellite",
    visible: false,
  });
  let baseMapsGroup = new Group({
    layers: [OSMap, stadia, stamen, satellite],
  });
  let map = new Map({
    target: target || "map",
    controls: control.defaults({
      attribution: false,
    }),
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
  map.addLayer(baseMapsGroup);
  //--- add controllers
  map.addControl(new FullScreen());
  map.addControl(new ScaleLine());
  map.addControl(new OverViewMap());
  map.addControl(new Rotate());
  addBaseMapButton(baseMapsGroup);
  return { map, baseMapsGroup };
};
export const addDrawLayer = (map) => {
  let drawSource = new VectorSource({});
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
          color: "blue",
        }),
      }),
    }),
  });
  map.addLayer(drawLayer);

  return { map, drawLayer };
};

export const changeBaseMap = (id, baseMapsGroup) => {
  baseMapsGroup.getLayers().forEach((basemap) => {
    if (basemap.get("title") === id) {
      basemap.setVisible(true);
    } else {
      basemap.setVisible(false);
    }
    let rightPanel = document.getElementsByClassName(
      "ol-full-screen ol-unselectable ol-control "
    )[0];
    let rightPanelBtns = [...rightPanel.children];
    let baseMapBtns = rightPanelBtns.slice(
      rightPanelBtns.length - 4,
      rightPanelBtns.length
    );
    for (const btn of baseMapBtns) {
      btn.style.display = "none";
    }
  });
};

export const addBaseMapButton = (baseMapsGroup) => {
  let rightPanel = document.getElementsByClassName(
    "ol-full-screen ol-unselectable ol-control "
  )[0];
  if (rightPanel) {
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
      img.src = require(`../imgs/${baseMap}.png`);
      img.alt = baseMap;
      img.addEventListener("click", (e) => changeBaseMap(e.target.id,baseMapsGroup));
      rightPanel.appendChild(img);

      let zoomPanel = document.getElementsByClassName(
        "ol-zoom ol-unselectable ol-control"
      )[0];
      zoomPanel.style.top = "1em";
      zoomPanel.style.left = "1em";
    }
  }
};
