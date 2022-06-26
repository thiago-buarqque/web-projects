import React from "react";

import "./finalScreen.styles.css";

const FinalScreen = ({ hideContactContainer }) => {
	return (
		<div id="final_screen_container" className="contact_screen">
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/man_woman.svg").default} id="img_man_woman" alt="" />
			) : (
				``
			)}
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/tree.svg").default} id="img_tree" alt="" />
			) : (
				``
			)}
			<div className="screen_content">
				<h1 className="form_screen_title">Estupendo! Estamos já a trabalhar no seu projeto. E a partir de agora...</h1>

				<div id="steps">
					<div className="step">
						<div className="step_index">
							<span>1</span>
						</div>
						<p className="step_label">
							Acabamos de lhe enviar um correio eletrónico com as instruções de{" "}
							<span>para ativá-lo como utilizador da nossa plataforma</span> para poder fazer um seguimento de como
							funciona o seu projeto, contactar com a nossa equipa e acrescentar qualquer informação que considere
							oportuna.
						</p>
					</div>
					<div className="step">
						<div className="step_index">
							<span>2</span>
						</div>
						<p className="step_label">
							A nossa equipa de consultores <span>entrará em contacto consigo</span> para o conhecer validar a
							informação que nos proporcionou e explicarmos os próximos passos.
						</p>
					</div>
					<div className="step">
						<div className="step_index">
							<span>3</span>
						</div>
						<p className="step_label">
							Após avaliarmos o seu projeto, <span>designaremos a equipa de profissionais</span> que melhor se ajustem
							às suas necessidades e possa começar a trabalhar com eles.
						</p>
					</div>
					<div id="continue_btn_container">
						<button id="btn_continue" className="contact_button" onClick={hideContactContainer}>
							Continuar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FinalScreen;
