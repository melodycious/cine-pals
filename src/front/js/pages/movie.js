import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import './movie.css';
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";

const Movie = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.getMovie(id); // Call the action to fetch movie data
  }, [id]);

  useEffect(() => {
    console.log(store.movie); // Log the movie data from the store
  }, [store.movie]);

  if (!store.movie || Object.keys(store.movie).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="container1">
      <div className="container2">
        <span>
          <h6> GENERO: {store.movie.genres.map(genre => genre.name).join(', ') }</h6>
        </span>
        <span>🔸</span>
        <span>
          <h6>TIEMPO DURACION: {store.movie.runtime}</h6>
        </span>
        <span>🔸</span>
        <span>
          <h6>DIA DE ESTRENO: {store.movie.release_date}</h6>
        </span>
      </div>

      <div className="row g-0">
        <div className="col-md-4">
          <img 
            src={`https://image.tmdb.org/t/p/w500${store.movie.poster_path}`} 
            className="img-fluid rounded" 
            alt="Poster" 
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title border border-top-0">title: {store.movie.title}</h4>
            <p className="card-text">
              overview: {store.movie.overview}
            </p>

            <br />
            <br />

            <div className="btn-group">
              <button id="openModalBtn" className="btn btn-info rounded">ADD TO ONE OF MY LIST</button>
              <br />
              <Link to="./profile">
                <button className="btn btn-info btn-sm">
                  Back to search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Movie;
