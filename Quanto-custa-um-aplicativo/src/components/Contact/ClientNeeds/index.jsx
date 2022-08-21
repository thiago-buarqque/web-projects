import React, { useCallback, useEffect, useRef } from "react";

import "./clientNeeds.styles.css";

const QUESTIONS = [
	{
		title: "Selecione a atividade principal do seu projeto",
		options: ["Desenvolvimento", "Design", "Marketing"],
		currentOption: null,
	},
	{
		title: "Diga-nos que tipo de serviços necessita",
		options: ["Design Gráfico", "Design Thinking", "Copywriting", "UX/UI", "User Testing", "Outros"],
		currentOption: null,
	},
];

const ClientNeeds = ({ currentQuestion, nextQuestion, previousQuestion }) => {
	const questions = useRef(QUESTIONS);
	const clientNeedsContent = useRef(null);
	const questionsContainer = useRef(null);

	const answerQuestion = () => {
		if (currentQuestion + 1 >= questions.current.length) nextQuestion();
		else {
			let aux = currentQuestion;
			nextClientNeed();
			fadeOutClientNeed(aux + 1);
			nextQuestion();
			setTimeout(() => fadeInClientNeed(aux + 2), 600);
		}
	};

	const nextClientNeed = () => {
		let styleClientNeeds = window.getComputedStyle(clientNeedsContent.current);
		let widthClientNeeds = Number(styleClientNeeds.getPropertyValue("width").split("px")[0]);

		questionsContainer.current.style.transform = `translateX(-${widthClientNeeds * 2}px)`;
	};

	const fadeInClientNeed = (id) => {
		let question = document.querySelector(`#client_need_question_${id}`);
		if (question) {
			if (question.classList.contains("fade_out")) question.classList.remove("fade_out");
			question.classList.add("fade_in");
		}
	};

	const fadeOutClientNeed = (id) => {
		let question = document.querySelector(`#client_need_question_${id}`);
		if (question) {
			if (question.classList.contains("fade_in")) question.classList.remove("fade_in");
			question.classList.add("fade_out");
		}
	};

	const previousClientNeed = useCallback(() => {
		questionsContainer.current.style.transform = `translate(0px)`;
		fadeOutClientNeed(2);
		fadeInClientNeed(1);
	}, []);

	useEffect(() => {
		if (currentQuestion === 0) previousClientNeed();
	}, [currentQuestion, previousClientNeed]);

	return (
		<div id="client_needs" className="contact_screen">
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/woman.svg").default} id="_img_woman" alt="woman" />
			) : (
				``
			)}
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/phone_man.svg").default} id="_img_phone_man" alt="man" />
			) : (
				``
			)}
			<div ref={clientNeedsContent} className="screen_content">
				<h1 className="form_screen_title">
					Primeiro, diga-nos o que necessita para que o possamos ajudar no seu projeto{" "}
				</h1>
				<div id="__top_container">
					<div id="__animated_text_container">
						<p className="user_needs_console_text" id="animated_text">
							Necessito de serviços para <span className="animated_text_option">Desenvolvimento</span>
						</p>
					</div>
				</div>
				<div ref={questionsContainer} id="_questions">
					{questions.current.map((question, i) => (
						<div
							className={`client_needs_question${i > 0 ? " fade_out" : ``}`}
							key={i}
							id={`client_need_question_${i + 1}`}
						>
							<span className="_main_text">{question.title}</span>
							<div className="__options">
								{question.options.map((option, j) => (
									<button
										key={j}
										className={`__option contact_button`}
										onClick={answerQuestion}
										option-data={option}
										referred-question={i + 1}
									>
										{option}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ClientNeeds;
