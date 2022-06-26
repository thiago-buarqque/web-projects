import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Routes from "./Routes";

import "./_normalize.css";
import "./_variables.css";
import "./index.css";
import "./App.css";

export const ANIMATION_DURATION = 1000;

const App: React.FC = () => {
	return (
		<Router>
			<div className="App">
				<Header />
				<Routes />
				<Footer />
			</div>
		</Router>
	);
};

export default App;
