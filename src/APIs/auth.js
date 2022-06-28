import client from "./client";
import { toast } from "react-toastify";

const resource = "/Authentications";

export const RegisterUser = async (user, email, pwd) => {
  try {
    const response = await client.post(resource + "/register", {
      username: user,
      email: email,
      password: pwd,
    });
    alertSuccess("New User has been created")
    return response;
  } catch (err) {
    if (!err?.response) {
      alertError("server Error");
    } else alertError(err.response.data.message);
  }
};

export const LoginUser = async (user, pwd) => {
  try {
    const response = await client.post(resource + "/login", {
      username: user,
      password: pwd,
    });
    alertSuccess("You are Logged In")
    return response;
  } catch (err) {
    if (!err?.response) {
      alertError("server Error");
    } else {
        alertError("Username or Password is wrong")
    };
  }
};

const alertError = (message, position = "top-center") => {
  toast.error(message, {
    position: position,
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

const alertSuccess = (message, position = "top-center") => {
    toast.success(message, {
      position: position,
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };