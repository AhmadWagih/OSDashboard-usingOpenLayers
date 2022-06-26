import React, { useState } from "react"; //imrc
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./Common/navbar";
import NotFound from "./Common/notFound";
import Login from "./Common/login";
import AddData from "./AddDataComponents/AddData";
import NotLoggedIn from "./Common/notLoggedIn";
import Symbology from "./symbology";
import AddDataContextProvider from "../contexts/addData";
import DashBoardModule from "./dashBoardModule";
import Home from "./Common/home";
import LoginO from './Common/LoginO';
import Register from './Common/Register';



const App = () => {
  const [logging, setLogging] = useState({
    loggedIn: false,
  });

  const userLogIn = () => {
    //call backend
    setLogging({ ...logging, loggedIn: true });
  };

  return (
    <AddDataContextProvider>
      <Navbar loggedIn={logging.loggedIn} />
      <Routes>
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/login" element={<LoginO userLogIn={userLogIn} />} />
        <Route path="/register" element={<Register userLogIn={userLogIn} />} />
        <Route path="/notLoggedIn" element={<NotLoggedIn />} />
        <Route exact path="/addData/*" element={<AddData />} />
        <Route path="/symbology/*" element={<Symbology />} />
        <Route path="/dashboard" element={<DashBoardModule />} />
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <Home/>
          }
        />
        <Route element={<Navigate to="/notfound" />} />
      </Routes>
    </AddDataContextProvider>
  );
};

export default App;
