import React from "react";

import "./projectInfo.styles.css";

const ProjectInfo = ({ nextQuestion }) => {
	return (
		<div id="project_info_container" className="contact_screen">
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/tree_woman.svg").default} id="_img_tree_woman" alt="" />
			) : (
				``
			)}
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/tree_man.svg").default} id="_img_tree_man" alt="" />
			) : (
				``
			)}
			<div className="screen_content">
				<h1 className="form_screen_title">
					Agora acrescente informação que possa ajudar-nos a perceber melhor o seu projeto
				</h1>
				<p className="user_needs_console_text" id="animated_text">
					Necessito de serviços para <span className="animated_text_option">Desenvolvimento</span>
				</p>
				<div id="_project_info_content">
					<div className="_item_info">
						<h3 className="_main_text">Nome para o seu projeto</h3>
						<input
							type="text"
							name=""
							id="in_project_name"
							className="form_field"
							placeholder="Esse nome será o que usaremos para identificar o seu projeto na plataforma"
						/>
					</div>
					<div className="_item_info">
						<h3 className="_main_text">Funções e especificações técnicas</h3>
						<textarea
							name=""
							className="form_field"
							id="txt_area_project_requirements"
							placeholder="Indique-nos todos os detalhes, qual a função especifica ou requisito técnico que possa ajudar-nos a perceber melhor o seu projeto."
						></textarea>
					</div>
				</div>
				<div id="_next_button_container">
					<button id="project_info_next_button" className="contact_button" onClick={() => nextQuestion()}>
						Continuar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectInfo;
