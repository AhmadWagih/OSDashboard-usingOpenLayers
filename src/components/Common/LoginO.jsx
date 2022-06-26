import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../APIs/auth";
// import AuthContext from '../context/AuthProvider';
// // import axios from 'axios';
// // const LOGIN_URL ='/auth';
import classes from "./index.module.css";
import { ToastContainer } from 'react-toastify';

const LoginO = () => {
  // const {setAuth} = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const Navigate = useNavigate();
  // const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await LoginUser(user, pwd);
    console.log(JSON.stringify(response?.data));
    if (response) {
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      //  setAuth(user,pwd,roles,accessToken)
      setUser("");
      setPwd("");
      Navigate("/home");
    }
  };

  return (
    <>
    <ToastContainer/>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className={classes.headerform}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <br />
          <button>Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className={classes.line}>
            {/*put router link here*/}
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default LoginO;
