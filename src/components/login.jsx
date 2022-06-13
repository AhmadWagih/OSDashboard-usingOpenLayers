import React, { useCallback, useState } from "react";
import { useLocation } from 'react-router-dom';

const LogIn = (props) => {
  const [user,setUser]=useState({
    userName: "",
    password: "",
    error: {},
  })
  const location = useLocation();
  const validate = () => {
    const error = {};
    if (user.userName.trim() === "") {
      error.userName = "User name is required";
    }
    if (user.password.trim() === "") {
      error.password = "password is required";
    }
    return error;
  };

  const handleForm = useCallback((e) => {
    e.preventDefault();
    let error = validate();
    setUser({...user,error});
    if (Object.keys(error).length) return;
    props.userLogIn();
    //talk to backend
    console.log("submit");
    location.pathname="/addData";
  },[validate])

  const handleChange =useCallback( (e) => {
    const {value,name} = e.target;
    setUser((u) => ({ ...u, [name]: value }))
  },[])


  return ( 
  <>
    <div id="login-form">
      <img className="img-150" src={require("../imgs/user.png")} alt="" />

      <form onSubmit={handleForm}>
        <label className="d-block form-label" htmlFor="userName">
          Username
        </label>
        <input
        className="text-input form-login-input"
          onChange={handleChange}
          type="text"
          name="userName"
          id="userName"
        />
        <label className="d-block form-label " htmlFor="password">
          Password
        </label>
        <input
        className="text-input form-login-input"
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
        />
        <a href="forgetpassword.html" id="forget">
          Forget Password
        </a>
        <input type="submit" className="button-form" value="LOGIN" />
      </form>
    </div>
  </> );
}
 
export default LogIn;


