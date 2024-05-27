import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import './movie.css';
import './modal.css';
import { addMovieToList } from '../store/flux.js';

const Movie = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    actions.getMovie(id); // Call the action to fetch movie data
  }, [id]);

  useEffect(() => {
    console.log(store.movie); // Log the movie data from the store
  }, [store.movie]);

  const handleAddToList = (listId) => {
    // Add functionality to add the movie to the selected list
    actions.addMovieToList(listId, store.movie.title);
    console.log(`Adding movie to list ${listId}`);
    setShowModal(false); // Close modal after adding to list
  };

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
              <button id="openModalBtn" className="btn btn-info rounded" onClick={() => setShowModal(true)}>Guardar en mi listas, ya!</button>
              <br />
              <Link to="/">
                <button className="btn btn-info btn-sm">
                  Recomendaciones de la semana!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Selecciona una Lista</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul>
                <li onClick={() => handleAddToList(1)}>Equipo de bolos</li>
                <li onClick={() => handleAddToList(2)}>Para reir</li>
                <li onClick={() => handleAddToList(3)}>tengo que ver</li>
                {/* Add more list options as needed */}
              </ul>
              {/* <ul>
                {store.userLists.map(list => (
                  <li key={list.id} onClick={() => handleAddToList(list.id)}>{list.name}</li>
                ))}
              </ul> */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

