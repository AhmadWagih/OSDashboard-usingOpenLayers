import React, { useState, useEffect } from "react"; //imrc
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./navbar";
import Home from "./home";
import NotFound from "./notFound";
import Login from "./login";
import MainPage from "./mainPage";
import NotLoggedIn from "./notLoggedIn";
import Dashboard from "./dashboard";
import Symbology from "./symbology";

const App = () => {
  const [logging, setLogging] = useState({
    loggedIn: false,
  });
  // useEffect(()=>{
  //   const data  = axios.get("http://localhost:3000/products").then(result=> result.data);
  //   this.setLogging({ products: data });
  // },[])
  const userLogIn = () => {
    //call backend
    setLogging({ ...logging, loggedIn: true });
  };
  return (
    <>
      <Navbar loggedIn={logging.loggedIn} />
      <Routes>
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/login" element={<Login userLogIn={userLogIn} />} />
        <Route path="/notLoggedIn" element={<NotLoggedIn />} />
        <Route exact path="/*" element={<MainPage />} />
        <Route path="/symbology" element={<Symbology />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <Navigate to={logging.loggedIn ? "/mainpage" : "/notLoggedIn"} />
          }
        />
        <Route element={<Navigate to="/notfound" />} />
      </Routes>
    </>
  );
};

export default App;
