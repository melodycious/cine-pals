import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import getState from "../store/flux";

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    actions.getLogin(loginEmail, loginPassword);
  };

  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getLogin();
  }, []);

 /*    useEffect(() => {
    if (store.token !== null) {
      navigate("/private");
    }
  }, [store.token, navigate]); */


  
  return (
    <div className="text-center mt-5">
      <h1>login</h1>
      <p> You need to login to access the content</p>

      <form>
        <div className="container">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={store.email}
              onChange={(e) => setLoginEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={store.password}
              onChange={(e) => setLoginPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>
      </form>

      <button
        onClick={() => {
          handleLogin();
        
        }}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Login;