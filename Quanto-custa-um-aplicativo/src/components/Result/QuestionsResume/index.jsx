import React, { useRef } from "react";

import "./questionsResume.styles.css";

import { growElementHeight } from "../../../utils";

const QuestionsResume = ({ resultBody, resultHeader, questions, goToQuestion }) => {
	const $answeredQuestions = useRef(null);
	const isResumeOpened = useRef(false);

	const handleEditAnswersClick = () => {
		if (!isResumeOpened.current) {
			isResumeOpened.current = true;
			growElementHeight($answeredQuestions.current);

			let headerStyle = window.getComputedStyle(resultHeader.current);
			let headerHeight = headerStyle.getPropertyValue("height").split("px")[0];
			resultBody.current.style.marginTop = `${headerHeight}px`;
		} else {
			isResumeOpened.current = false;
			$answeredQuestions.current.style.height = "0px";
		}
	};

	const changeAnswer = (e) => {
		let questionId = e.target.getAttribute("question-id");
		questionId = Number(questionId);
		goToQuestion(questionId, undefined, true);
	};

	return (
		<div id="container_edit_questions">
			<button id="edit_answers_label" onClick={handleEditAnswersClick}>
				Editar respostas
			</button>
			<div ref={$answeredQuestions} id="_answered_questions">
				{questions.map((question, i) => {
					return (
						<div key={i} className="_question">
							<div className="_img_container">
								<img src={question.images[question.currentAnswer || 0].default} alt="answer_image" />
							</div>
							<div className="_answer">
								<span className="_title">{question.title}</span>
								<span className="_current_answer">
									{question.answers[question.currentAnswer] || "Não respondida"}{" "}
									<button className="_btn_change_answer" onClick={changeAnswer} question-id={i + 1}>
										Alterar
									</button>
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionsResume;
