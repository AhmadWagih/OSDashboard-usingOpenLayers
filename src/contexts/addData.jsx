import { createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

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
import olDraw from "ol/interaction/draw";
import VectorSource from "ol/source/vector";
import Modify from "ol/interaction/modify";
import Snap from "ol/interaction/snap";
import Feature from "ol/feature";
import Point from "ol/geom/point";
import proj from "ol/proj";
import GeoJSON from "ol/format/geojson";
import loadingstrategy from "ol/loadingstrategy";
//#endregion

export const AddDataContext = createContext();

const AddDataContextProvider = ({ children }) => {
  const [mapData, setMapData] = useState({
    map: null,
    baseMapsGroup: null,
    layers: null,
    drawSource: null,
    drawInteraction: null,
    dataSource: null,
    mapIsLoaded: false,
  });
  
  const [drawControls, setDrawControls] = useState({
    isDrawing: false,
    isMeasuring: false,
    type: "point",
    drawAppear: false,
  });
  
  //#region functions
  const addMap = useCallback(() => {
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
      target: "map",
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
    setMapData({ ...mapData, map, baseMapsGroup, mapIsLoaded: true });
  }, [setMapData, mapData]);

  const addLayerForm = () => {
    let overlaycontainer = document.getElementsByClassName(
      "ol-overlaycontainer-stopevent"
    )[0];
    let form = document.getElementsByClassName("ol-attribution ol-control")[0];
    form.classList.remove("hidden");
    overlaycontainer.appendChild(form);

    let addFieldButton = document.getElementById("addField");
    addFieldButton.addEventListener("click", () => {
      let newdiv = document.createElement("div");
      newdiv.innerHTML = `
      <input type="text" class="text-input" />
      <select id="feildId" name="feild1">
        <option value="int">int</option>
        <option value="string">string</option>
        <option value="double">double</option>
      </select>`;
      document.getElementsByClassName("containerTable")[0].appendChild(newdiv);
    });
    document.getElementById("cancel").addEventListener("click", () => {
      form.classList.add("hidden");
    });
  };

  const changeBaseMap = useCallback(
    (e) => {
      console.log(mapData);
      mapData.baseMapsGroup.getLayers().forEach((basemap) => {
        if (basemap.get("title") === e.target.id) {
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
    },
    [mapData]
  );

  const addDrawInteraction = useCallback(
    (type) => {
      let drawInteraction = new olDraw({
        source: mapData.drawSource,
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
      setMapData((data) => ({ ...data, drawInteraction }));
    },
    [setMapData, mapData.drawSource]
  );

  const addDrawLayer = useCallback(() => {
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
    mapData.map.addLayer(drawLayer);
  }, [mapData]);

  const changeType = useCallback(
    (e) => {
      let drawInteraction = mapData.drawInteraction;
      mapData.map.removeInteraction(drawInteraction);
      mapData.drawControls.type = e.target.value;
      addDrawInteraction(drawControls.type);
      if (drawControls.isDrawing) {
        mapData.map.addInteraction(drawInteraction);
      }
    },
    [mapData, addDrawInteraction, drawControls]
  );

  const drawing = useCallback(() => {
    let drawSource = new VectorSource();
    let drawactive = drawControls.isDrawing;
    let drawInteraction = mapData.drawInteraction;
    let map = mapData.map;
    if (!drawactive) {
      map.addInteraction(drawInteraction);
      map.addInteraction(new Snap({ source: drawSource }));
      map.addInteraction(new Modify({ source: drawSource }));
    } else {
      map.removeInteraction(drawInteraction);
      map.removeInteraction(new Modify({ source: drawSource }));
    }
    setMapData((data) => ({ ...data, drawSource, map, drawInteraction }));
    setDrawControls((cont) => ({
      ...cont,
      isMeasuring: !drawControls.isMeasuring,
    }));
  }, [setDrawControls, drawControls, mapData]);

  const featuresDraw = useCallback(
    (features) => {
      mapData.dataSource = new VectorSource({
        features,
      });
      const olLayer = new VectorLayer({
        source: mapData.dataSource,
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
      console.log(mapData.map);
      mapData.map.addLayer(olLayer);
    },
    [mapData]
  );

  const finalView = useCallback(
    (data, CoordSys, longKey, latKey, attributes) => {
      let features = [];
      console.log(attributes);
      let attNames = attributes.map((elm) => elm.name);
      let attKeys = attributes.map((elm) => elm.key);
      console.log(attNames);
      console.log(attKeys);
      data.forEach((dataElm) => {
        let nestedKeys = longKey.split(" / ");
        let long, lat;
        if (nestedKeys.length === 1) {
          long = +dataElm.key;
        } else if (nestedKeys.length === 2) {
          long = +dataElm[nestedKeys[0]][nestedKeys[1]];
        } else {
          long = +dataElm[nestedKeys[0]][nestedKeys[1]][nestedKeys[2]];
        }
        nestedKeys = latKey.split(" / ");
        if (nestedKeys.length === 1) {
          lat = +dataElm.key;
        } else if (nestedKeys.length === 2) {
          lat = +dataElm[nestedKeys[0]][nestedKeys[1]];
        } else {
          lat = +dataElm[nestedKeys[0]][nestedKeys[1]][nestedKeys[2]];
        }
        let coord = [long, lat];
        let feature = new Feature({
          geometry: new Point(
            proj.transform(coord, CoordSys ? CoordSys : "EPSG4236", "EPSG:3857")
          ),
        });
        for (let i = 0; i < attNames.length; i++) {
          const name = attNames[i];
          const key = attKeys[i];
          let nestedKeys = key.split(" / ");
          if (nestedKeys.length === 1) {
            feature.set(name, dataElm[key]);
          } else if (nestedKeys.length === 2) {
            feature.set(name, dataElm[nestedKeys[0]][nestedKeys[1]]);
          } else {
            feature.set(
              name,
              dataElm[nestedKeys[0]][nestedKeys[1]][nestedKeys[2]]
            );
          }
        }
        features.push(feature);
      });
      featuresDraw(features);
    },
    [featuresDraw]
  );

  const CsvImport = () => {
    console.log("csvFile");
  };

  const save = () => {
    let GEOJSON_PARSER = new GeoJSON();
    let vectorLayerAsJson = GEOJSON_PARSER.writeFeatures(
      mapData.dataSource.getFeatures()
    );
    console.log(vectorLayerAsJson);
  };

  const wfsGeoserver = (wfsurl) => {
    try {
      let wfslayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: function (extent) {
            console.log(extent);
            return (
              "https://ahocevar.com/geoserver/wfs?service=WFS&" +
              "version=1.1.0&request=GetFeature&typename=osm:water_areas&" +
              "outputFormat=application/json&srsname=EPSG:3857&" +
              "bbox=" +
              extent.join(",") +
              ",EPSG:3857"
            );
          },
          strategy: loadingstrategy.bbox,
        }),
      });
      mapData.map.addLayer(wfslayer);
    } catch (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //#endregion

  return (
    <AddDataContext.Provider
      value={{
        mapData,
        addLayerForm,
        addDrawLayer,
        changeType,
        drawing,
        addDrawInteraction,
        changeBaseMap,
        finalView,
        save,
        wfsGeoserver,
        CsvImport,
        addMap
      }}
    >
      {children}
    </AddDataContext.Provider>
  );
};

export default AddDataContextProvider;
