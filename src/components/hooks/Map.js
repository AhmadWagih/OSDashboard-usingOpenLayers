import { useState, useCallback } from "react";

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

//#endregion

export const MapHook = () => {

  const [mapData, setMapData] = useState({
    map: null,
    baseMapsGroup: null,
    layers: null,
    drawSource: null,
    drawInteraction: null,
  });

  const [drawControls, setDrawControls] = useState({
    isDrawing: false,
    isMeasuring: false,
    type: "point",
    drawAppear: false,
  });

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
      visible: false,
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
      visible: true,
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
    setMapData((Data)=>({ ...Data, map, baseMapsGroup }));
  }, [setMapData]);

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

  const addDrawInteraction =useCallback( (type) => {
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
    setMapData((data)=>({...data,drawInteraction}))
  },[setMapData,mapData.drawSource])


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
    console.log(mapData);
    mapData.map.addLayer(drawLayer);
  },[mapData.map]);

  const changeType = useCallback( (e) => {
    let drawInteraction = mapData.drawInteraction;
    mapData.map.removeInteraction(drawInteraction);
    mapData.drawControls.type = e.target.value;
    addDrawInteraction(drawControls.type);
    if (drawControls.isDrawing) {
        mapData.map.addInteraction(drawInteraction);
    }
  },[mapData,addDrawInteraction,drawControls])

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
      if (drawControls.isMeasuring) {
        // measure();
      }
    }
    setMapData((data)=>({...data,drawSource}))
    setDrawControls((cont)=>({...cont,isMeasuring:!drawControls.isMeasuring}))
  },[setDrawControls,drawControls,mapData]);

  
  return {
    mapData,
    addDrawLayer,
    changeType,
    drawing,
    addDrawInteraction,
    addMap,
    changeBaseMap,
  };
};
