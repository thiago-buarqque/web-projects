import React from "react";

import ImgIntro from "../../images/intro.png";

import "./home.styles.css";

const Home = ({ _ref, nextQuestion }) => {
	return (
		<main ref={_ref} className="mobile_container">
			<img id="home_img" src={ImgIntro} alt="mobile aplication design" />
			<h1 id="home_main_text" className="title">
				Quanto custa criar um <span className="blue_highlight">aplicativo</span>?
			</h1>
			<p id="home_description">
				Calcule rapidamente o custo para poder criar a sua APP respondendo a estas simples perguntas.
			</p>
			<button id="btn_start" className="highlight_button" onClick={nextQuestion}>
				INICIO
			</button>
		</main>
	);
};

export default Home;
