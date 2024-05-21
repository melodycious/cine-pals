import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ImInfo } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import "./listaserie.css";

import PropTypes from "prop-types";

const Listaserie = () => {
  
  const { store, actions } = useContext(Context);

  const [contadores, setContadores] = useState({});
  const [animationTriggers, setAnimationTriggers] = useState({});

  const navigate = useNavigate();

  const handleAnimation = (pelicula) => {
    setAnimationTriggers({
      ...animationTriggers,
      [pelicula]: true,
    });

    setTimeout(() => {
      setAnimationTriggers({
        ...animationTriggers,
        [pelicula]: false,
      });
    }, 1000);
  };

  const restar = (pelicula) => {
    setContadores((prev) => {
      const currentCount = prev[pelicula] || 0;
      if (currentCount > 0) {
        return {
          ...prev,
          [pelicula]: currentCount - 1,
        };
      } else {
        return prev;
      }
    });
    handleAnimation(pelicula);
  };

  const sumar = (pelicula) => {
    setContadores((prev) => {
      const currentCount = prev[pelicula] || 0;
      if (currentCount < 10) {
        return {
          ...prev,
          [pelicula]: currentCount + 1,
        };
      } else {
        return prev;
      }
    });
    handleAnimation(pelicula);
  };

useEffect(() => {
    actions.getSeries();
    actions.getTitulo();
  }, []);
 
 
return (
  <div className="container-fluid">
    <h2>{store.titulo.name}</h2>
    <div className="row">
      {store.series.map((serie, index) => (
        <div key={index} className="card" style={{ width: "18rem" }}>
          <img src="" className="card-img-top" alt="Film Poster"></img>
          <div className="card-body">
            <h5 className="card-title">{serie.name}</h5>
            <p className="card-text"></p>
            <div className="form_check">
              <div className="container_button">
                <button onClick={() => restar(serie)} className="contador">
                  -
                </button>
                <button onClick={() => sumar(serie)} className="contador">
                  +
                </button>
              </div>

              <span
                className={`animate__animated ${
                  animationTriggers[serie] ? "animate__bounce" : ""
                }`}
              >
                {contadores[serie] || 0}
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

                <ImInfo onClick={() => navigate("/movie")} className="flecha" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

);
};


export default Listaserie;
