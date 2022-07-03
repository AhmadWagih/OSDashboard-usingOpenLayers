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

  // add Features from backend to map 
  const LoadMapData = useCallback(( map,geojsonElm, style) => {
    let {features} = drawGeoJson(map, geojsonElm, style);
    let attributes = features[0].getKeys();
    attributes.shift();
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
      newWidgets = { ...widgets, [widgetName]: modifiedWidget };
    }
    // in case of Indicator, add some aggregation for it and edit format
    switch (widgetName) {
      case "indicator":
      state.aggvalue = aggregate(state.attribute, state.agg);
      state.aggvalue = format(state.aggvalue, state.format);
        break;
      case "chart":
        if (state.type!=="Table") {
          let Xvalues = data.filter(field=>Object.keys(field)[0]===state.attributeX)[0][state.attributeX]
          let Xunique = [...new Set(Xvalues)]
          let Yvalues = data.filter(field=>Object.keys(field)[0]===state.attributeY)[0][state.attributeY]
          let chartArr=[]
          for (let i = 0; i < Xunique.length; i++) {
            const xun = Xunique[i];
            const yarr=[];
            for (let j = 0; j < Xvalues.length; j++) {
              const xval = Xvalues[j];
              const yval = +Yvalues[j];
              if (xun===xval) {
                yarr.push(yval)
              }
            }
            chartArr.push([xun,aggregate(null,state.agg,yarr)])
          }
          state = {...state,chartArr}
        }else{
          let newData = state.opts.map(opt=>(
            data.filter(field=>Object.keys(field)[0]===opt)[0][opt]
          ))
          state.data=[]
          for (let i = 0; i < newData[0].length; i++) {
            let arrRow=[]
            for (let j = 0; j < newData.length; j++) {
              arrRow.push(newData[j][i])
            }
            state.data.push(arrRow)
          }
          console.log(state.data);
        }
        break;
      default:
        console.log("error");
        break;
    }
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
  const aggregate = (att, agg,arr) => {
    if (att) {
      for (const elm of data) {
        if (Object.keys(elm)[0] === att) {
          arr = elm[att];
        }
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
