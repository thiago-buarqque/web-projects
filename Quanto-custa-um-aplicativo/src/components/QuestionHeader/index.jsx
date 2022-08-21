import React from "react";

import "./header.styles.css";

const QuestionHeader = ({ currentQuestion, totalQuestion, previousQuestion }) => {
	return (
		<div className="header">
			<button
				onClick={previousQuestion}
				className={`_btn_previous${currentQuestion === 1 ? ` hide_previous_question` : ``}`}
			>
				<span>←</span> Anterior
			</button>

			<span className="current_question">
				{currentQuestion}/{totalQuestion}
			</span>
			<span className="app_price"></span>
		</div>
	);
};

export default QuestionHeader;
