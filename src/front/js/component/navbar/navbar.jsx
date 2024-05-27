import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import logo from "../../../img/logo-sin-fondo.png";
import { Context } from "../../store/appContext";
import Searcher from "../search/searcher.jsx";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	const handleLogOut = () => {
		const token = localStorage.getItem("token");
		actions.getLogout(navigate, token);
	};

	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid d-flex justify-content-between align-items-center">
				<Link to="/">
					<img src={logo} alt="Logo" width="100" height="90" className="d-inline-block align-text-top"/>
				</Link>
				{
					!store.token || store.token == undefined ? (
						<Link to="/login">
							<button className="btn btn-primary">Iniciar Sesión</button>
						</Link>
					) : (
						<div className="d-flex flex-grow-1 justify-content-between align-items-center">
							<form className="d-flex flex-grow-1 justify-content-center">
								<Searcher />
							</form>
							<div className="d-flex align-items-center">
								<Link to="/profile" className="btn btn-outline-success me-2">Mis Listas</Link>
								<button className="btn btn-outline-success me-2" type="button" onClick={handleLogOut}>Cerrar sesión</button>
							</div>
						</div>
					)
				}
			</div>
		</nav>
	);
};
