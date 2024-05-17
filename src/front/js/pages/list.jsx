import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import getState from "../store/flux";

const List = () => {
  return (
    <div className="container_list">
    <div>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
           /*  style={{
              marginBottom: "1rem",
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
              :hover: {
                color: "black",
                backgroundColor: "white",
              },
            }} */
          >
            Series
          </button>
          
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            style={{
              marginBottom: "1rem",
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
            }}
          >
            Pelicuas
          </button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          tabIndex="0"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
          tabIndex="0"
        >
          ...
        </div>
      </div>
    </div>
  </div>
  );
};

export default List;
