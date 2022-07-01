//#region
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import {
  FullScreen,
  OverviewMap,
  Rotate,
  ScaleLine,
  defaults,
} from "ol/control.js";
import Group from "ol/layer/Group.js";
import VectorLayer from "ol/layer/Vector";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import FontSymbol from "ol-ext/style/FontAwesome5Def";
import Text from "ol/style/Text";

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
    controls: defaults({
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
  map.addControl(new OverviewMap());
  map.addControl(new Rotate());
  addBaseMapButton(baseMapsGroup);
  return { map, baseMapsGroup };
};
export const addDrawLayer = (map, style) => {
  let drawSource = new VectorSource({});

  if (!style) {
    style = new Style({
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
    });
  }
  let drawLayer = new VectorLayer({
    source: drawSource,
    style: style,
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
      img.addEventListener("click", (e) =>
        changeBaseMap(e.target.id, baseMapsGroup)
      );
      rightPanel.appendChild(img);

      let zoomPanel = document.getElementsByClassName(
        "ol-zoom ol-unselectable ol-control"
      )[0];
      zoomPanel.style.top = "1em";
      zoomPanel.style.left = "1em";
    }
  }
};
// make datasource with layer d=features inside
export const drawGeoJson = (map, geojson, styleData) => {
  let GEOJSON_PARSER = new GeoJSON();
  let features = GEOJSON_PARSER.readFeatures(geojson);
  let dataSource = new VectorSource({
    features,
  });
  const olLayer = new VectorLayer({
    source: dataSource,
  });
  if (!styleData) {
    let style = new Style({
      image: new FontSymbol({
        glyph: "fa-check-circle",
        form: "circle",
        radius: 5,
        offsetY: -15,
        gradient: true,
        fontSize: 1.0,
        rotation: 0,
        rotateWithView: false,
        color: "white",
        fill: new Fill({
          color: "green",
        }),
      }),
    });
    olLayer.setStyle(style);
  } else {
    assignStyle(features, styleData);
  }
  // get Layer Extent
  let myExtent=olLayer.getSource().getExtent();
  // zoom to layer Extent
  map.getView().fit(myExtent);
  map.addLayer(olLayer);

  return { features, olLayer };
};

const assignStyle = (features, styleData) => {
  switch (styleData.type) {
    case "single":
      let x = setInterval(() => {
        let styles = new Style({
          image: new FontSymbol({
            glyph: styleData.glyph,
            form: "none",
            radius: styleData.size,
            offsetY: -15,
            fontSize: 1.0,
            rotation: 0,
            rotateWithView: false,
            color: styleData.color,
            fill: new Fill({
              color: "red",
            }),
            stroke: new Stroke({
              color: "white",
              width: 2,
            }),
          }),
        });
        features.map((f) => f.setStyle(styles));
      }, 100);
      setTimeout(() => {
        clearInterval(x);
      }, 300);
      break;
    case "label":
      let y = setInterval(() => {
      const style = new Style({
      text: new Text({
        font: `${styleData.size}px Calibri,sans-serif`,
        fill: new Fill({
          color: styleData.color,
        }),
        stroke: new Stroke({
          color: styleData.strokeColor,
        }),
      }),
    });
      features.map((f) => f.setStyle((feature)=>{
        style.getText().setText(feature.get(styleData.attribute).toString());
        return style;
      },));
    }, 100);
    setTimeout(() => {
      clearInterval(y);
    }, 100);
      break;
    default:
      console.log("error");
      break;
  }
};
