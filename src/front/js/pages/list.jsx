import React, { useState, useContext, useEffect } from "react";
import { ImInfo } from "react-icons/im";
import { Context } from "../store/appContext";
import { PiFilmSlateLight } from "react-icons/pi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./list.css";
import "animate.css";
import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";


const List = () => {
  const { store, actions } = useContext(Context);

  const [contadores, setContadores] = useState({});
  const [animationTriggers, setAnimationTriggers] = useState({});

  const navigate = useNavigate();

  const handleAnimation = (id) => {
    setAnimationTriggers((prev) => ({
      ...prev,
      [id]: true,
    }));

    setTimeout(() => {
      setAnimationTriggers((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 1000);
  };

  const restar = (id) => {
    setContadores((prev) => {
      const currentCount = prev[id] || 0;
      if (currentCount > 0) {
        return {
          ...prev,
          [id]: currentCount - 1,
        };
      } else {
        return prev;
      }
    });
    handleAnimation(id);
  };

  const sumar = (id) => {
    setContadores((prev) => {
      const currentCount = prev[id] || 0;
      if (currentCount < 10) {
        return {
          ...prev,
          [id]: currentCount + 1,
        };
      } else {
        return prev;
      }
    });
    handleAnimation(id);
  };

  useEffect(() => {
    actions.getTraerPeliulas();
    actions.getTraerSeries();
  }, []);

  console.log(store.pelis)
  console.log(store.series)
  return (
    <div className="container_list">
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "10%",
        }}
        className="nav nav-pills mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            style={{ display: "flex", justifyContent: "center", marginLeft: "20%" }}
            className="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Films{" "}
            <PiFilmSlateLight style={{ height: "35px", width: "35px" }} />
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            style={{ display: "flex", justifyContent: "center", marginLeft: "40%" }}
            className="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Series <PiTelevisionSimpleBold />
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
          <div className="container-fluid">
            <h2>Nombre de la lista de Peliculas</h2>
            <div className="row">
              {store.pelis?.map((pelicula) => (
                <div key={pelicula.id} className="card" style={{ width: "18rem" }}>
                  <img
                    style={{ marginTop: "10px" }}
                    src={pelicula.poster_path}
                    alt="Film Poster"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{pelicula.title}</h5>
                    <p className="card-text"></p>
                    <div className="form_check">
                      <div className="container_button">
                        <button
                          onClick={() => restar(pelicula.id)}
                          className="contador"
                        >
                          -
                        </button>
                        <button
                          onClick={() => sumar(pelicula.id)}
                          className="contador"
                        >
                          +
                        </button>
                      </div>

                      <span
                        className={`animate__animated ${
                          animationTriggers[pelicula.id] ? "animate__bounce" : ""
                        }`}
                      >
                        {contadores[pelicula.id] || 0}{" "}
                        {/* Aquí se muestra el contador */}
                      </span>
                      <div>
                      <AiOutlineDelete className="garbage" />

                        <ImInfo
                          onClick={() => navigate("/movie")}
                          className="flecha"
                        />{" "}
                        {/* te lleva a movies, pagina de lucia */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
          tabIndex="0"
        >
          <div className="container-fluid">
            <h2>Nombre de la lista de Series</h2>
            <div className="row">
              {store.series?.map((serie) => (
                <div key={serie.id} className="card" style={{ width: "18rem" }}>
                  <img
                    src={serie.poster_path}
                    className="card-img-top"
                    alt="Film Poster"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{serie.name}</h5>
                    <p className="card-text"></p>
                    <div className="form_check">
                      <div className="container_button">
                        <button
                          onClick={() => restar(serie.id)}
                          className="contador"
                        >
                          -
                        </button>
                        <button
                          onClick={() => sumar(serie.id)}
                          className="contador"
                        >
                          +
                        </button>
                      </div>

                      <span
                        className={`animate__animated ${
                          animationTriggers[serie.id] ? "animate__bounce" : ""
                        }`}
                      >
                        {contadores[serie.id] || 0}
                      </span>
                      <div>
                        <input
                          style={{
                            margin: "11px 60px 0 0",
                            height: "20px",
                            width: "20px",
                          }}
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value=""
                          aria-label="..."
                        />

                        <ImInfo
                          onClick={() => navigate("/movie")}
                          className="flecha"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  name: PropTypes.string,
};

export default List;
