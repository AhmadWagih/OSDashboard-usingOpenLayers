import { useState, createContext, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { drawGeoJson } from "./../helper/addMapHelper";

export const DashBoardContext = createContext();

const DashBoardContextProvider = ({ children }) => {
  const [attributes, setAttributes] = useState(null);
  const [data, setData] = useState(null);
  const [widgets, setWidgets] = useState({
    indicator: [],
    list: [],
    table: [],
    chart: [],
  });

  // add Features from backend to map to Map
  const LoadMapData = useCallback(( map,geojsonElm, style) => {
    let features = drawGeoJson(map, geojsonElm, style);
    console.log(features[0]);
    let attributes = features[0].getKeys();
    setAttributes(attributes);
    let data = attributes.map((att) => {
      return { [att]: features.map((elm) => elm.get(att)) };
    });
    setData(data);
  }, []);

  // add a new widget to dashboard
  const createWidget = (widgetName, state) => {
    let newWidgets;
    if (!state.id) {
      state.id = uuid();
      newWidgets = { ...widgets };
    } else {
      let modifiedWidget = widgets[widgetName].filter(
        (widget) => widget.id !== state.id
      );
      console.log(modifiedWidget);
      newWidgets = { ...widgets, [widgetName]: modifiedWidget };
    }
    // in case of Indicator, add some aggregation for it and edit format
    if (widgetName === "indicator") {
      state.attribute = aggregate(state.attribute, state.agg);
      state.attribute = format(state.attribute, state.format);
    }
    console.log(state);
    newWidgets[widgetName].push(state);
    setWidgets(newWidgets);
  };

  // to remove widget
  const deleteWidget = (widgetName, id) => {
    // clone and remove widget
    const newWidgets = { ...widgets };
    // remove widget
    const filteredWidgets = newWidgets[widgetName].filter(
      (widget) => widget.id !== id
    );
    // setState
    setWidgets({ ...newWidgets, [widgetName]: filteredWidgets });
  };

  // calculate sum mean min max from the attribute choosen
  const aggregate = (att, agg) => {
    let arr;
    for (const elm of data) {
      if (Object.keys(elm)[0] === att) {
        console.log(elm);
        arr = elm[att];
      }
    }
    switch (agg) {
      case "sum":
        return arr.reduce((acc, val) => {
          return acc + val;
        }, 0);
      case "mean":
        return Math.round(arr.reduce((acc, val) => acc + val, 0) / arr.length);
      case "max":
        return Math.max.apply(null, arr);
      case "min":
        return Math.min.apply(null, arr);
      case "count":
        return arr.length;
      default:
        return arr.reduce((acc, val) => {
          return acc + val;
        }, 0);
    }
  };

  // edit the format of the field
  const format = (att, format) => {
    switch (format) {
      case "dollar":
        return att
          .toLocaleString("en-US", { style: "currency", currency: "USD" })
          .split(".")[0];
      case "comma":
        return att.toLocaleString("en-US").split(".")[0];
      case "egPound":
        return "LE" + att.toLocaleString("en-US").split(".")[0];
      case "K":
        return (att / 1000).toLocaleString("en-US").split(".")[0] + " K";
      case "M":
        return (att / 1000000).toLocaleString("en-US").split(".")[0] + " M";
      default:
        return att > 1 ? att : att * 100 + "%";
    }
  };

  return (
    <DashBoardContext.Provider
      value={{ attributes, widgets, createWidget, deleteWidget ,LoadMapData }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;
