import client from "./client";
import { toast } from "react-toastify";
const resource = "/Dashboards/"

export const getAllDashboards = async () => {
  try {
    const { data } = await client.get(resource);
    if (typeof data === "string") {
      return [];
    }
    return data.$values.map((elm) => ({
      id: elm.id,
      name: elm.layerName,
      createdOn: elm.createdOn,
    }));
  } catch (error) {
    alertError(error, "bottom-center");
  }
};

export const getDashboardById = async (id) => {
  try {
    const { data } = await client.get(resource + id);
    if (typeof data === "string") {
      alertError(data, "bottom-center");
      return {};
    }
    return {
      id: data.id,
      name: data.layerName,
      createdOn: data.createdOn,
      geoJson: data.geoJson,
    };
  } catch (error) {
    alertError(error, "bottom-center");
  }
};

export const addNewDashboard = async (name, geoJson) => {
  try {
    const { data } = await client.post(resource, { layerName: name, geoJson });
    alertSuccess(data);
  } catch (error) {
    alertError(error);
  }
};

export const EditDashboard = async (id, name, geoJson) => {
  try {
    const { data } = await client.post(resource + id, { layerName: name, geoJson });
    if (data.Contains("no Layer with id:")) {
        alertError(data, "bottom-center")
    } else {
      alertSuccess(data, "bottom-center");
    }
  } catch (error) {
    alertError(error, "bottom-center");
  }
};

export const DeleteDashboard = async (id) => {
  try {
    const { data } = await client.delete(resource + id);
    alertSuccess(data, "bottom-center");
  } catch (error) {
    alertError(error, "bottom-center");
  }
};

const alertError = (message, position = "bottom-left") => {
  toast.error(message, {
    position: position,
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
const alertSuccess = (message, position = "bottom-left") => {
  toast.success(message, {
    position: position,
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
