import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import './movie.css';
import './modal.css';
import { addMovieToList } from '../store/flux.js';
import ListCard from '../component/listCard/listCard.jsx';

const Movie = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    actions.getMovie(id); // Call the action to fetch movie data
  }, [id]);

  useEffect(() => {
    actions.getTraerTodasLasListas();
  }, [store.movie]);

  const handleAddToList = (list_id) => {
    console.log("movie", store.movie.title);
    actions.addMovieToList(list_id, store.movie.title, store.movie.overview, store.movie.poster_path, store.movie.release_date, store.movie.tagline, store.movie.runtime);
    console.log(store.listas);
    console.log(`Adding movie to list ${list_id}`);
    /* setShowModal(false); */ 
  };
  console.log("contenido de listas", store.usuario)

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
          <div className="ContainerSerie">
            <h4 className="card-title border border-top-0">🔹 {store.movie.title}🔹</h4>
            <p className="card-text">
               {store.movie.overview}
            </p>

            <br />
            <div className="container2">
                <p className="card-text"><strong>🔹Genero:</strong> {store.movie.genres.map(genre => genre.name).join(', ') }</p>
              
                <p className="card-text"><strong>🔹Duracion:</strong> {store.movie.runtime}</p>
              
                <p className="card-text"><strong>🔹Fecha de Estreno:</strong> {store.movie.release_date}</p>
            </div>
            <br />

            <div className="btn-group">
              <button id="openModalBtn" className="btn btn-info rounded" onClick={() => setShowModal(true)}>Guardar en mis listas!</button>
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
               {/* <ul>
                <li onClick={() => handleAddToList(1)}>Equipo de bolos</li>
                <li onClick={() => handleAddToList(2)}>Para reir</li>
                <li onClick={() => handleAddToList(3)}>tengo que ver</li>
              </ul>  */}
              <ul>
              {store.listas === null || store.listas?.length === 0 ? (
                    <p className="empty">Aún no has añadido ninguna lista</p>
                ) : (
                    store.listas?.map((list, index) => (
                      <li key={index} onClick={() => handleAddToList(list.id)}>{list.name}</li>
                    ))
                )}
              </ul>
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

