import React from "react";

import "./question.styles.css";

import QuestionHeader from "../QuestionHeader/";

const Question = ({ id, title, answers, images, answerQuestion, totalQuestion, previousQuestion }) => {
	return (
		<section className="question hide_element" id={`question_${id}`}>
			<QuestionHeader currentQuestion={id} totalQuestion={totalQuestion} previousQuestion={previousQuestion} />
			<div className="question_body mobile_container">
				<span className="question_title">{title}</span>
				<div className="question_answers_container">
					{answers.map((currentAnswer, i) => (
						<div
							key={i}
							className={`answer question_${id}_answer`}
							onClick={answerQuestion}
							answer-id={i + 1}
							question-id={id}
						>
							<img src={images[i].default} className="question_image" alt={`answer_${id}_image_${i + 1}`} />
							<span className="answer_text">{currentAnswer}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Question;
