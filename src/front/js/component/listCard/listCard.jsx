import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext.js";

const ListCard = (props) => {
  const movieCount = props.movies ? props.movies.length : 0;
  const seriesCount = props.series ? props.series.length : 0;
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const handleEditarLista = () => {
    actions.getEditarLista(props.id, name);
    if (email) {
      actions.getAñadirParticipante(props.id, email);
    }
  };

  const handleDeleteList = () => {
    actions.getEliminarLista(props.id);
  };

  return (
    
      <div className="col">
        <div className="card h-100 text-center">
          <div className="card-body">
          <a href={`/list/${props.id}`} className="card-title mt-2 text-decoration-none">
            {props.name}
          </a>
            <p className="card-text">
              Películas ({movieCount}) <br></br> Series ({seriesCount})
            </p>
            <div className="d-grid gap-2 d-md-block">
            <button type="button" className="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModal1">
              Editar
            </button>
            <button className="deleteButton btn btn-primary btn-sm m-1" type="button" onClick={handleDeleteList}>
              Eliminar
            </button>
            </div>
                  
          </div> 
        </div>
        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Lista</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                        <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Nombre de la lista</label>
                                        <input type="text" className="form-control" id="text" placeholder="Lista de la familia"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Participantes</label>
                                        <input type="email" className="form-control" id="email" placeholder="elemaildetuhermana@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>
                                        <div id="emailHelp" className="form-text">¿Quieres compartir la lista con alguien más? Introduce su email.</div>
                                    </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditarLista}>Guardar cambios</button>
                            </div>
                      </div>
                    </div>
                  </div>
      </div>
    
  );
};

ListCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  movies: PropTypes.array,
  series: PropTypes.array,
};

export default ListCard;