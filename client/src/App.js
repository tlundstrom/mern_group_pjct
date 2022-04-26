import React from "react";
import "./App.css";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthApp from "./views/AuthApp";
import UnauthApp from "./views/UnauthApp";

const App = () => {
	const { auth } = useContext(UserContext);

	return auth ? <AuthApp /> : <UnauthApp />;
};

export default App;
