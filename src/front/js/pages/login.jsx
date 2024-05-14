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

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Login</h1>  

                    <form>
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
                        <button
        onClick={() => {
          handleLogin();
         /*  navigate("/"); */
        }}
      >
        LOGIN
      </button>
                    </form>




                </div>
            </div>
        </div>
    );

};

export default Login;