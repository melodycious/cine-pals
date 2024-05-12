import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export const Navbar = () => {
	return (


		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid d-flex justify-content-between">
				<Link to="/">
					<img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
				</Link>
				<form className="d-flex flex-grow-1 justify-content-end">
					<a className="btn btn-outline-success me-2" type="button" href="/profile">My Lists</a>
					<a className="btn btn-outline-success me-2" type="button" href="/">Log out</a>
				</form>
			</div>
		</nav>
	);
};
