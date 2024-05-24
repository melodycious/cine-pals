import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import './movie.css'

const Movie = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.getMovie(id); // Call the action to fetch movie data
  }, [id]);

  useEffect(() => {
    console.log(store.movie); // Log the movie data from the store
  }, [store.movie]);

  // Renderización condicional
  if (!store.movie || Object.keys(store.movie).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container1">

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
            <h4 className="card-title border border-top-0">&#8212;  {store.movie.title}  &#8212;</h4>
            <p className="card-text">
              overview: {store.movie.overview}
            </p>

            <br />
            <div className="container2">
            <span>🔸</span>
              <span>
                <p><strong>Genero:</strong> {store.movie.genres.map(genre => genre.name).join(', ') }</p>
              </span>
              <span>🔸</span>
              <span>
                <p><strong>Duracion:</strong> {store.movie.runtime}</p>
              </span>
              <span>🔸</span>
              <span>
                <p><strong>Fecha de Estreno:</strong> {store.movie.release_date}</p>
              </span>
            </div>
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
  );
};

export default Movie;
