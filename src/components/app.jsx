import React, { useState } from "react"; //imrc
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./Common/navbar";
import NotFound from "./Common/notFound";
import Login from "./Common/login";
import AddData from "./AddDataComponents/AddData";
import NotLoggedIn from "./Common/notLoggedIn";
import Dashboard from "./dashboard";
import Symbology from "./symbology";
import AddDataContextProvider from "../contexts/addData";

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
    <AddDataContextProvider>
      <Navbar loggedIn={logging.loggedIn} />
      <Routes>
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/login" element={<Login userLogIn={userLogIn} />} />
        <Route path="/notLoggedIn" element={<NotLoggedIn />} />
        <Route exact path="/*" element={<AddData />} />
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
    </AddDataContextProvider>
  );
};

export default App;
