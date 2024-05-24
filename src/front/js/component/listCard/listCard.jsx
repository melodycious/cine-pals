import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext.js";

const ListCard = (props) => {
  const movieCount = props.movies ? props.movies.length : 0;
  const seriesCount = props.series ? props.series.length : 0;
  const { store, actions } = useContext(Context);


  const handleDeleteList = () => {
    actions.getEliminarLista();
  };

  return (
    <Link to={`/users/${props.id}`} >
      <div className="col">
        <div className="card h-100 text-center">
          <div className="card-body">
            <h4 className="card-title mt-2">{props.name}</h4>
            <p className="card-text">
              Películas ({movieCount}) <br></br> Series ({seriesCount})
            </p>
            <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Editar
            </button>
            <button className="deleteButton btn btn-primary btn-sm" type="button" onClick={handleDeleteList}>
              Eliminar
            </button>
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Lista</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label type="text" className="form-label">Nombre de la lista</label>
                            <input type="text" className="form-control" id="text" aria-describedby="emailHelp" placeholder="Lista de la familia"/>
                          </div>
                          <div className="mb-3">
                            <label type="exampleInputPassword1" className="form-label">Participantes</label>
                            <input type="email" className="form-control" id="email" placeholder="elemaildetuhermana@gmail.com"/>
                            <div id="emailHelp" className="form-text">¿Quieres compartir la lista con alguien más. Introduce su email.</div>
                          </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                          <button type="button" className="btn btn-primary">Guardar cambios</button>
                        </div>
                      </div>
                    </div>
                  </div>
          </div> 
        </div>
      </div>
    </Link>
  );
};

ListCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  movies: PropTypes.array,
  series: PropTypes.array,
};

export default ListCard;