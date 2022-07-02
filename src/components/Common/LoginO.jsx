import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../APIs/auth";
// import AuthContext from '../context/AuthProvider';
// // import axios from 'axios';
// // const LOGIN_URL ='/auth';
import { ToastContainer } from "react-toastify";

import "../../styles/Login.css";
import classes from "../../styles/index.module.css";

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
      <ToastContainer />
      <section style={{margin:"auto"}}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <div className={classes.container}>
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div id="first">
                <div className="formstyle  ">
                  <div className="logo mb-3">
                    <div className="col-md-12 text-center">
                      <h1 className={classes.headerform}>Login</h1>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username" className="Uform">
                        Username:
                      </label>
                      <input
                        className="form-control general"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="Uform general">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        className="form-control"
                        required
                      />
                    </div>

                    {/* <div className="form-group">
                      <p className="text-center Uform">
                        By signing up you accept our
                        <Link to="/register" id="term">
                          Terms Of Use
                        </Link>
                      </p>
                    </div> */}

                    <div className="col-md-12 text-center ">
                      <button
                        type="submit"
                        // className=" btn btn-block btnstyle btn-primary tx-tfm general m-2"
                        className={classes.btn}
                      >
                        Login
                      </button>
                    </div>

                    <div className="col-md-12 ">
                      <div className="orstyle">
                        <hr className="orline" />
                        <span className="span-or">or</span>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <p className="text-center">
                        <Link to="/register" className="google btn btnstyle">
                          <i className="fa-brands fa-google-plus-g"></i> Signup
                          using Google
                        </Link>
                      </p>
                    </div>

                    <div className="form-group">
                      <p className="Uform text-center">
                        Don't have account?
                        <br />
                        <span className={classes.line}>
                          {/*put router link here*/}
                          <Link className={classes.btn} to="/register" id="signup">
                            Sign up here
                          </Link>
                        </span>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginO;
