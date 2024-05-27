import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import gifcinepals3 from "../../img/gifcinepals3.gif";
import "../../styles/home.css";
import { BoxArrowInRight, StarFill, ShareFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Searcher from '../component/search/searcher.jsx';

export const Home = () => {
 
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getMoviesLanding();
    console.log(store.token)
  }, []);

  const lastMovies = store.latestMovies;

  return (
    <div className="container text-center">
    <div className="row landingback">
      <div className="col mt-4 mb-4">
        <h1>Comparte tus pelis y series</h1>
        <h5>
          Crea tus listas de películas y series favoritas e invita a tus amigos para que puedan compartir contigo las suyas.
        </h5>
        <Link to="/login">
        <button className="btn btn-primary mt-4">Unirme</button>
        </Link>
      </div>
      <div className="col mt-4 mb-4">
        <img width="450px" src={gifcinepals3} alt="Cinepals" />
      </div>
      <h2 className="mt-4">¿Cómo funciona CinePals?</h2>
      <div className="container mt-3 mb-4">
        <div className="row">
          <div className="col-sm">
            <p><BoxArrowInRight size={40} /></p>
            <h5>Únete y busca todas tus pelis y series favoritas</h5>
          </div>
          <div className="col-sm">
            <p><StarFill size={40} /></p>
            <h5>Crea tus listas, puedes crear todas las que quieras</h5>
          </div>
          <div className="col-sm">
            <p><ShareFill size={40} /></p>
            <h5>Comparte tu lista para que puedan añadir más pelis y series</h5>
          </div>
        </div>
      </div>
      <h2 className="mt-4">Todas tus series y pelis, en un solo lugar</h2>
    
    <div className="d-flex flex-wrap justify-content-center">
      {lastMovies.slice(0, 5).map((item, index) => {
        return (
          <Link to={`/movie/${item.id}`} key={index} className="m-2">
            <div className="card" style={{ width: '12rem' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                className="card-img-top"
                alt={item.title}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
    <div>
                    <h1>Buscar Películas y Series</h1>
                    <Searcher />
                  </div>
    </div>
  </div>
);
};

