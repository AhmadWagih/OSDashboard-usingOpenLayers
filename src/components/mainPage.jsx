import React, { useState, useCallback, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import LeftPanel from "./leftPanel";
import AddData from "./addData";
import Draw from "./draw";
import JsonFile from "./jsonFile";
import MyMap from "./Map";
import GeoServer from "./GeoServer";
import Csv from "./Csv";

//#region
import VectorLayer from "ol/layer/vector";
import GeoJSON from "ol/format/geojson";
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
import loadingstrategy from "ol/loadingstrategy";

//#endregion

const MainPage = (props) => {
  const [mapState, setMapState] = useState({
    data: null,
    layers: null,
    drawSource: null,
    drawInteraction: null,
    keys: null,
  });

  const finalView = (data, CoordSys, longKey, latKey, attributes) => {
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
      // console.log(feature.get("pop"));
      features.push(feature);
    });
    featuresDraw(features);
  };

  const featuresDraw = (features) => {
    mapState.dataSource = new VectorSource({
      features,
    });
    const olLayer = new VectorLayer({
      source: mapState.dataSource,
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
    mapState.map.addLayer(olLayer);
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
      mapState.map.addLayer(wfslayer);
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
  const save = () => {
    let GEOJSON_PARSER = new GeoJSON();
    let vectorLayerAsJson = GEOJSON_PARSER.writeFeatures(
      mapState.dataSource.getFeatures()
    );
    console.log(vectorLayerAsJson);
  };

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

  const CsvImport = () => {
    console.log("csvFile");
  };
  useEffect(() => {
    toast.success("you are Logged In", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="progress m-2">
        <div
          className="progress-bar progress-bar-striped bg-warning progress-bar-animated"
          style={{ width: "50%" }}
          role="progressbar"
          aria-valuenow="10"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div className="container m-2 p-2" style={{ maxWidth: "1400px" }}>
        <div className="row">
          <div className="col-2 p-0">
            <LeftPanel />
          </div>
          <div className="col-4" id="2ndCol">
            <Routes>
              <Route
                path="/addData/draw"
                element={
                  <Draw
                    addLayerForm={addLayerForm}
                    save={save}
                  />
                }
              />
              <Route
                path="/addData/json"
                element={
                  <JsonFile
                    featuresDraw={featuresDraw}
                    save={save}
                    finalView={finalView}
                  />
                }
              />
              <Route
                path="/addData/geoserver"
                element={
                  <GeoServer
                    wfsGeoserver={wfsGeoserver}
                    save={save}
                  />
                }
              />
              <Route
                path="/addData/csv"
                element={
                  <Csv CsvImport={CsvImport} save={save} />
                }
              />
              <Route exact path="/addData" element={<AddData/>} />
            </Routes>
          </div>
          <MyMap/>
        </div>
      </div>
    </>
  );
};

export default MainPage;
