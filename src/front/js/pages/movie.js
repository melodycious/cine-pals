import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import './movie.css';
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";

const Movie = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.getMovie(); // Call the action to fetch movie data
  }, [actions]);

  useEffect(() => {
    console.log(store.movie); // Log the movie data from the store
  }, [store.movie]);


  return (
    <>
      <div className="container1">
        <div className="container2">
          <span><h6>genres: {movie.genres}</h6></span>
          <span>🔸</span>
          <span><h6>runtime: {movie.runtime}</h6></span>
          <span>🔸</span>
          <span><h6>release_date: {movie.release_date}</h6></span>
        </div>

        <div className="row g-0">
          <div className="col-md-4">
            <img 
              src={movie.poster_path} 
              className="img-fluid rounded" 
              alt="Poster" 
            />
            {movie.poster_path}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title border border-top-0">title: {movie.title}</h4>
              <p className="card-text">
                overview: {movie.overview}
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>

              <br/>
              <br/>

              <div className="btn-group">
                <button className="btn btn-info rounded">ADD TO ONE OF MY LIST</button>
                <br/>
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
