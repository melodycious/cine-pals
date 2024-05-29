import React, { useState, useContext, useEffect } from "react";
import { ImInfo } from "react-icons/im";
import { Context } from "../store/appContext";
import { PiFilmSlateLight, PiTelevisionSimpleBold } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import "./list.css";
import "animate.css";
import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";

const List = () => {
  const { store, actions } = useContext(Context);

  const [contadores, setContadores] = useState({});
  const [animationTriggers, setAnimationTriggers] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = (list_id, id) => {
    actions.getEliminarPelicula(list_id, id);
    console.log("borrar");
  };

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
    actions.getTraerPeliculas(id);
    actions.getTraerSeries(id);
    actions.getTraerTitulo();
  }, []);

  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const size = "w500";

  return (
    <div className="container_list">
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
          >
            Películas <PiFilmSlateLight style={{ height: "35px", width: "35px" }} />
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
            <h2>{store.name}</h2>
            <div className="row">
              {store.pelis?.map((pelicula) => (
                <div key={pelicula.id} className="card">
                  <img
                    src={`${baseImageUrl}${size}${pelicula.poster_path}`}
                    alt="Film Poster"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{pelicula.title}</h5>
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
                          animationTriggers[pelicula.id]
                            ? "animate__bounce"
                            : ""
                        }`}
                      >
                        {contadores[pelicula.id] || 0}
                      </span>
                      <div>
                        <AiOutlineDelete
                          onClick={() => handleDelete(id, pelicula.id)}
                          className="garbage"
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

        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
          tabIndex="0"
        >
          <div className="container-fluid">
            <h2>{store.name}</h2>
            <div className="row">
              {store.series?.map((serie) => (
                <div key={serie.id} className="card">
                  <img
                    src={`${baseImageUrl}${size}${serie.poster_path}`}
                    className="card-img-top"
                    alt="Film Poster"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{serie.name}</h5>
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
                        <AiOutlineDelete
                          onClick={() => handleDelete(serie.id)}
                          className="garbage"
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

