import React, { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import QuestionsResume from "./QuestionsResume";

import "./results.styles.css";

import { currencyFormatter } from "../../utils";

const Results = ({ resultsSection, questions, userAnswersPrices, goToQuestion, goHome, setRenderContactContainer }) => {
	const $resultBody = useRef(null);
	const $resultHeader = useRef(null);

	return (
		<section ref={resultsSection} id="section_result" className="hide_element">
			<div ref={$resultHeader} className="header" id="result_header">
				<button className="_btn_previous" onClick={goHome}>
					<span>←</span> Recomeçar
				</button>
			</div>
			<div ref={$resultBody} id="result_body" className="mobile_container">
				<span id="result_section_label">Muito bem... já terminamos!</span>
				<div id="container_sharing_options">
					<span id="container_sharing_label">Compartilhe se desejar!</span>
					<div id="container_sharing_buttons">
						<button className="share_button" id="btn_share__facebook">
							<FontAwesomeIcon className="social_brand" icon={faFacebookF} color="#fff" />
							<span className="share_button_label">Share</span>
						</button>
						<button className="share_button" id="btn_share__linkedin">
							<FontAwesomeIcon className="social_brand" icon={faLinkedinIn} color="#fff" />
							<span className="share_button_label">Share</span>
						</button>
						<button className="share_button" id="btn_share__google_plus">
							<FontAwesomeIcon className="social_brand" icon={faGoogle} color="#fff" />
							<span className="share_button_label">Google +</span>
						</button>
						<button className="share_button" id="btn_share__twitter">
							<FontAwesomeIcon className="social_brand" icon={faTwitter} color="#fff" />
							<span className="share_button_label">Tweet</span>
						</button>
					</div>
				</div>
				<h2 id="estimative_cost_label">O custo estimado da sua APP é de</h2>
				<h1 id="final_price" className="blue_highlight">
					{currencyFormatter.format(userAnswersPrices.reduce((a, b) => a + b, 0))}
				</h1>

				<QuestionsResume
					resultBody={$resultBody}
					resultHeader={$resultHeader}
					questions={questions}
					goToQuestion={goToQuestion}
				/>

				<p id="projects_announcement">
					Em Yeeply selecionamos os melhores{" "}
					<span style={{ fontFamily: "GothamRoundedBold" }}>programadores de APP’s e de WEB’s</span> para o seu projeto.
					Publique o seu projeto em Yeeply ou veja alguns dos{" "}
					<a
						id="our_projects"
						href="https://pt.yeeply.com/clientes?utm_source=CCMA-BR&utm_medium=stories&utm_campaign=microsites"
					>
						nossos projetos
					</a>{" "}
					exitosos.
				</p>

				<button className="highlight_button" onClick={() => setRenderContactContainer(true)}>
					Crie o seu projeto
				</button>
			</div>
		</section>
	);
};

export default Results;
