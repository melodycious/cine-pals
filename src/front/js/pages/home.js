import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Login from "./login.jsx";

export const Home = () => {
	
	return (
		<div>
			<Login />
		</div>
	);
};
