import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import logo from "../../../img/logo-sin-fondo.png";
import { Context } from "../../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const { actions } = useContext(Context);

	const handleLogOut = () => {
		const token = localStorage.getItem("token");
		actions.getLogout(navigate, token);
	};

	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid d-flex justify-content-between">
				<Link to="/">
					<img src={logo} alt="Logo" width="100" height="90" className="d-inline-block align-text-top"/>
				</Link>
				<form className="d-flex flex-grow-1 justify-content-end">
					<a className="btn btn-outline-success me-2" type="button" href="/profile/:id">Mis Listas</a>
					<button className="btn btn-outline-success me-2" type="button" onClick={handleLogOut}>Cerrar sesión</button>
				</form>
			</div>
		</nav>
	);
};