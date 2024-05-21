import React, { useEffect, useContext, useState } from "react";
import "../../styles/profile.css";
import cinePals from "../../img/cinePals.jpg";
import ListCard from "../component/listCard/listCard.jsx";
import { Context } from "../store/appContext.js";

const Profile = (props) => {
      const { store, actions } = useContext(Context);
      const [editMode, setEditMode] = useState(false);

      const [name, setName] = useState("");
      const [createList, setCreateList] = useState(false);

      const [editedProfile, setEditedProfile] = useState({
        nombre: store.usuario.nombre,
        email: store.usuario.email,
        password: ""
      });

      useEffect(() => {
        actions.getInfoUser();
      }, []);

      const toggleEditMode = () => {
        setEditMode(!editMode);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({
          ...editedProfile,
          [name]: value
        });
      };

      const handleCreateList = () => {
        actions.getCrearLista(name);
      };


      const handleSaveChanges = () => {
        // Aquí enviar los datos editados a la API
        console.log("Profile edited:", editedProfile);
        toggleEditMode();
      };

      useEffect(() => {
          actions.getCrearLista();
      },[]);


      return (
        <>
          <div className="d-inline m-1 p-2">
            <button className="btn btn-outline-primary m-2 profileButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
              Mi perfil
            </button>
            <button button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              + Nueva Lista
            </button>
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva Lista</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label for="text" className="form-label" >Nombre de la lista</label>
                            <input type="text" className="form-control" id="text" aria-describedby="emailHelp" placeholder="Lista de la familia"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                         {/*  <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Participantes</label>
                            <input type="email" className="form-control" id="email" placeholder="elemaildetuhermana@gmail.com"/>
                            <div id="emailHelp" className="form-text">¿Quieres compartir la lista con alguien más. Introduce su email.</div>
                          </div> */}
                        </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                          <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreateList}>Guardar cambios</button>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
          <div className="sideBar m-3">
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div className="offcanvas-header">
                <h2 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Mi perfil</h2>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body m-3">
                <img className="img-fluid rounded-circle" src={cinePals} alt="User Profile" />
                {editMode ? (
                  <>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre de usuario</label>
                      <input type="text" className="form-control" id="nombre" name="nombre" value={editedProfile.nombre} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" name="email" value={editedProfile.email} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Nueva contraseña</label>
                      <input type="password" className="form-control" id="password" name="password" value={editedProfile.password} onChange={handleInputChange} />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="m-2">{store.usuario.nombre}</h3>
                    <h4 className="m-2">{store.usuario.email}</h4>
                  </>
                )}
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-primary" type="button" onClick={toggleEditMode}>
                    {editMode ? "Cancelar" : "Editar Perfil"}
                  </button>
                  {editMode && (
                  <button className="btn btn-primary" type="button" onClick={handleSaveChanges}>
                      Guardar
                  </button>
                    )}
                  <button className="deleteButton btn btn-primary" type="button">
                    Eliminar perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container center">
            <h1 className="text-center">Mis Listas</h1>
            <div className="divisor"></div>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4 m-2 p-1 align-items-center justify-content-md-center">
            {store.usuario.lists === null || store.usuario.lists?.length === 0 ? (
              <p className="empty">Aún no has añadido ninguna lista</p>
            ) : (
              store.usuario.lists?.map((list, index) => {
                return (
                  <ListCard
                    id={list.id}
                    key={index}
                    name={list.name}
                    movies={list.movies}
                    series={list.series}
                  />
                );
              })
            )}
            
          </div>
        </>
      );
    };

export default Profile;
