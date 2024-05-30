import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { Link } from 'react-router-dom';
import './modal.css';
import './movie.css';
import { addSerieToList } from '../store/flux.js';


const SerieDetail = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    actions.getSerie(id); // Call the action to fetch movie data
  }, [id]);

  useEffect(() => {
    actions.getTraerTodasLasListas();
  }, [store.serie]);

  const handleAddToList = (list_id) => {
    console.log("serie", store.serie.name);
    actions.addSerieToList(list_id, store.serie.name, store.serie.overview, store.serie.poster_path, store.serie.first_air_date);
    console.log(store.listas);
    console.log(`Adding serie to list ${list_id}`);
    /* setShowModal(false); */ 
  };
  console.log("contenido de listas", store.usuario)

  // Renderización condicional
  if (!store.serie || Object.keys(store.serie).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container1">
      <div className="row g-0">
      <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${store.serie.poster_path}`}
            className="img-fluid rounded"
            alt="Poster"
          />
        </div>
        <div className="col-md-8">
          <div className='ContainerSerie'>
          <h4 className='card-title border border-top-0'>🔹{store.serie.name}🔹</h4>
          <p className="card-text">{store.serie.overview}</p>
          <br/>
          <div className='container2'>
          <p className="card-text"><strong>🔹Número de temporadas: </strong>{store.serie.number_of_seasons}</p>
          <p className="card-text"><strong>🔹Numero de Episodios:</strong>{store.serie.number_of_episodes}</p>
          <p className="card-text"><strong>🔹Fecha de Estreno:</strong>{store.serie.first_air_date}</p>
          </div>
          <br/>
          
          <div className="btn-group">
            <button id="openModalBtn" className="btn btn-info rounded" onClick={() => setShowModal(true)}>Guardar en mis listas!</button>
            <br />
            <Link to="/">
              <button className="btn btn-info btn-sm">
                Recomendaciones de la semana!
              </button>
            </Link>
          </div>
        {/* </div> */}
        </div>
        </div>
        <div className='col-md-12'>
        </div>
      </div>
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
export default SerieDetail;