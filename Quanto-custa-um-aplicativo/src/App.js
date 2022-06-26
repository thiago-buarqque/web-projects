import { useState, useRef, useEffect } from "react";
import "./App.css";

import Home from "./components/Home";
import Question from "./components/Question";
import Results from "./components/Result";
import Contact from "./components/Contact";

import { questions as _questions } from "./questions";

import { fadeInElement, fadeOutElement, currencyFormatter } from "./utils.js";

const setRootHeight = () => (document.getElementById("root").style.height = window.innerHeight + "px");
(() => {
	window.addEventListener("resize", setRootHeight);
	document.getElementById("root").style.height = window.innerHeight + "px";
})();

const App = () => {
	const currentQuestion = useRef(0);
	const homeSection = useRef(null);
	const resultsSection = useRef(null);
	const areQuestionsImagesLoaded = useRef(false);
	const questionsContainers = useRef([]);
	const timeLastAnswerQuestion = useRef(new Date());
	const jumpToResult = useRef(false);

	const [questions, setQuestions] = useState(_questions);
	const [userAnswersPrices, setQuestionsPrices] = useState([]);
	const [renderContactContainer, setRenderContactContainer] = useState(false);

	const QUESTION_CHANGING_TRANSITION_DELAY = 1200;

	const QUESTION_FADE_IN_OUT_DELAY = 200;
	const goToQuestion = (questionId, answerId, _jumpToResult) => {
		currentQuestion.current = questionId;

		let questionToBeChanged = currentQuestion.current - 1;
		if (_jumpToResult) {
			jumpToResult.current = _jumpToResult;
			questionToBeChanged = questionId;
			fadeOutElement(resultsSection.current);
		}

		if (currentQuestion.current === 1 && !_jumpToResult) fadeOutElement(homeSection.current);
		else if (currentQuestion.current > 1 && currentQuestion.current <= questions.length) {
			fadeOutElement(questionsContainers.current[currentQuestion.current - 2]);
		}
		setTimeout(() => {
			if (currentQuestion.current > 1 && answerId) updateCurrentPrice(answerId, questionToBeChanged);
			fadeInElement(questionsContainers.current[currentQuestion.current - 1]);
		}, QUESTION_FADE_IN_OUT_DELAY);
	};

	const previousQuestion = () => {
		if (currentQuestion.current - 1 < 0) return;

		currentQuestion.current -= 1;
		fadeOutElement(questionsContainers.current[currentQuestion.current]);
		setTimeout(() => {
			fadeInElement(questionsContainers.current[currentQuestion.current - 1]);
		}, QUESTION_FADE_IN_OUT_DELAY);
	};

	const updateQuestionAnswer = (answerId, questionId) => {
		let aux = [...questions];
		aux[questionId - 1].currentAnswer = Number(answerId - 1);
		setQuestions(aux);
	};

	const setFinalPriceToAllQuestions = (totalPrice) => {
		let allQuestionsSpanPrice = document.querySelectorAll(`.question > .header > span.app_price`);
		let formattedPrice = currencyFormatter.format(totalPrice);
		[...allQuestionsSpanPrice].forEach((spanPrice) => (spanPrice.innerHTML = formattedPrice));
	};

	const updateQuestionsVisualPrices = (auxCurrentPrice) => {
		let formattedPrice;
		let totalPrice = auxCurrentPrice.reduce((a, b, i) => {
			let headerTotalPrice;
			if (i + 2 > questions.length) return a + b;

			if (auxCurrentPrice.length < questions.length) {
				headerTotalPrice = document.querySelector(`#question_${i + 2} > .header > span.app_price`);
				if (i === 0) formattedPrice = currencyFormatter.format(b);
				else formattedPrice = currencyFormatter.format(a + b);

				headerTotalPrice.innerHTML = formattedPrice;
			}
			return a + b;
		}, 0);
		if (auxCurrentPrice.length === questions.length) setFinalPriceToAllQuestions(totalPrice);

		setQuestionsPrices(auxCurrentPrice);
	};

	const updateCurrentPrice = async (answerId, questionToUpdatePrice) => {
		let auxCurrentPrice = [...userAnswersPrices];
		let answerPrice = questions[questionToUpdatePrice - 1].prices[answerId - 1];
		auxCurrentPrice[questionToUpdatePrice - 1] = answerPrice;

		updateQuestionsVisualPrices(auxCurrentPrice);
	};

	const showResults = (answerId) => {
		if (jumpToResult.current) {
			jumpToResult.current = false;
		}
		fadeOutElement(questionsContainers.current[currentQuestion.current - 1]);
		setTimeout(() => {
			updateCurrentPrice(answerId, currentQuestion.current);
			fadeInElement(resultsSection.current);
		}, QUESTION_FADE_IN_OUT_DELAY);
	};

	const ANSWER_SELECTION_DELAY = 1000;
	const answerQuestion = (e) => {
		if (Date.parse(new Date()) - Date.parse(timeLastAnswerQuestion.current) < QUESTION_CHANGING_TRANSITION_DELAY)
			return;
		else timeLastAnswerQuestion.current = new Date();

		const targetClass = e.target.getAttribute("class");
		const questionAnswers = [...document.getElementsByClassName(targetClass)];
		questionAnswers.forEach((answer) => answer.classList.remove("current_answer"));
		e.target.classList.add("current_answer");

		const answerId = e.target.getAttribute("answer-id");
		const questionId = e.target.getAttribute("question-id");

		updateQuestionAnswer(answerId, questionId);
		if (currentQuestion.current + 1 > questions.length || jumpToResult.current) {
			setTimeout(() => showResults(answerId), ANSWER_SELECTION_DELAY);
		} else {
			let nextQuestion = currentQuestion.current + 1;
			setTimeout(() => goToQuestion(nextQuestion, answerId), ANSWER_SELECTION_DELAY);
		}
	};

	const restoreAppInitialState = async () => {
		const questionAnswers = [...document.getElementsByClassName("answer")];
		questionAnswers.forEach((answer) => answer.classList.remove("current_answer"));

		let questionsHeaderTotalPrice = [...document.querySelectorAll(`.question > .header > span.app_price`)];
		questionsHeaderTotalPrice.forEach((spanPrice) => (spanPrice.innerHTML = ""));

		setQuestionsPrices([]);
	};

	const loadQuestionsImages = () => {
		areQuestionsImagesLoaded.current = true;
		let aux = [...questions];
		aux.forEach((question) => {
			question.images.forEach((img, i) => (question.images[i] = require(`./images/answers/${img}.png`)));
		});
		setQuestions(aux);
	};

	const goHome = () => {
		fadeOutElement(resultsSection.current);
		restoreAppInitialState();
		fadeInElement(homeSection.current);
	};

	if (!areQuestionsImagesLoaded.current) loadQuestionsImages();

	useEffect(() => {
		questionsContainers.current = [...document.getElementsByClassName("question")];
	}, []);

	return (
		<>
			<Home _ref={homeSection} nextQuestion={() => goToQuestion(1)} />

			{questions.map((question, i) => {
				return (
					<Question
						key={i}
						id={question.id}
						title={question.title}
						answers={question.answers}
						images={question.images}
						answerQuestion={answerQuestion}
						previousQuestion={previousQuestion}
						totalQuestion={questions.length}
					/>
				);
			})}
			<Results
				resultsSection={resultsSection}
				questions={questions}
				userAnswersPrices={userAnswersPrices}
				goToQuestion={goToQuestion}
				goHome={goHome}
				setRenderContactContainer={setRenderContactContainer}
			/>

			<Contact renderContactContainer={renderContactContainer} setRenderContactContainer={setRenderContactContainer} />

			<div id="footer">
				<p>Patrocinado pela </p>
				<svg className="yeeply-logo" viewBox="18.408 244.466 669.643 221.068" xmlns="http://www.w3.org/2000/svg">
					<g fillRule="evenodd" clipRule="evenodd" fill="#FFF">
						<path d="M101.73 301.52c-1.48 6.013-3.18 12.55-5.028 19.568-1.848 7.06-3.812 14.153-5.81 21.322-1.998 7.202-4.07 14.187-6.135 20.98-2.072 6.802-4.07 12.965-5.993 18.536-2.072-5.57-4.287-11.734-6.584-18.535-2.33-6.794-4.62-13.78-6.842-20.98-2.215-7.17-4.362-14.262-6.36-21.322-1.998-7.02-3.737-13.555-5.218-19.568H18.408c6.584 23.842 13.644 45.347 21.117 64.474 7.467 19.167 14.975 36.398 22.45 51.774-2.148 6.02-4.737 10.695-7.767 14.153-3.07 3.378-7.433 5.09-13.093 5.09-2.847 0-5.55-.265-8.1-.672-2.588-.482-5.476-1.34-8.73-2.528l-5.877 26.927c2.88 1.19 6.543 2.303 11.02 3.31 4.438.964 9.323 1.487 14.643 1.487 6.367 0 11.912-.748 16.682-2.195 4.77-1.49 9.064-3.786 12.835-6.945 3.77-3.194 7.284-7.21 10.464-12.033 3.18-4.906 6.36-10.81 9.547-17.72 8.282-19.202 15.94-39.035 22.965-59.46 7.026-20.432 13.752-42.303 20.193-65.663H101.73z"></path>
						<path d="M172.216 349.055c.45-2.67 1.223-5.307 2.255-7.91 1.04-2.6 2.556-4.897 4.48-6.91 1.922-1.963 4.327-3.56 7.208-4.75 2.888-1.187 6.326-1.82 10.32-1.82 4.146 0 7.658.666 10.465 1.93 2.812 1.264 5.103 2.894 6.958 4.864 1.85 1.97 3.214 4.232 4.105 6.76.883 2.562 1.406 5.164 1.55 7.834h-47.34zm-29.36 38.552c2.515 7.582 6.435 14.152 11.72 19.684 5.287 5.538 11.987 9.887 20.045 13.08 8.066 3.153 17.53 4.75 28.402 4.75 4.294 0 8.582-.26 12.875-.666 4.287-.482 8.316-1.08 12.087-1.712 3.778-.666 7.175-1.48 10.247-2.412 3.03-.89 5.51-1.82 7.36-2.745l-4.547-26.927c-3.96 1.706-9.064 3.12-15.314 4.233-6.252 1.15-12.612 1.707-19.08 1.707-10.138 0-18.237-2.113-24.223-6.42-6.034-4.275-9.43-10.07-10.212-17.347h79.775c.15-1.787.292-3.866.44-6.204s.26-4.49.26-6.46c0-20.025-4.988-35.21-14.942-45.538-9.98-10.32-23.557-15.485-40.713-15.485-7.366 0-14.54 1.373-21.49 4.083-6.993 2.752-13.17 6.76-18.53 12.074-5.395 5.307-9.723 11.958-13.018 19.9-3.29 7.95-4.92 17.24-4.92 27.825.002 8.84 1.26 17.006 3.78 24.582z"></path>
						<path
							fill="#14e2cd"
							d="M344.968 349.055c-.448-2.67-1.223-5.307-2.256-7.91-1.04-2.6-2.555-4.897-4.478-6.91-1.923-1.963-4.328-3.56-7.21-4.75-2.887-1.187-6.325-1.82-10.32-1.82-4.145 0-7.657.666-10.463 1.93-2.812 1.264-5.108 2.894-6.957 4.864-1.848 1.97-3.214 4.232-4.104 6.76-.892 2.562-1.408 5.164-1.557 7.834h47.345zm29.36 38.552c-2.515 7.582-6.436 14.152-11.722 19.684-5.293 5.538-11.985 9.887-20.044 13.08-8.065 3.153-17.53 4.75-28.408 4.75-4.287 0-8.574-.26-12.87-.666-4.286-.482-8.315-1.08-12.093-1.712-3.77-.666-7.174-1.48-10.238-2.412-3.037-.89-5.51-1.82-7.358-2.745l4.545-26.927c3.954 1.706 9.063 3.12 15.308 4.233 6.25 1.15 12.617 1.707 19.086 1.707 10.13 0 18.23-2.113 24.223-6.42 6.026-4.275 9.43-10.07 10.212-17.347h-79.775c-.15-1.787-.3-3.866-.442-6.204-.15-2.337-.258-4.49-.258-6.46 0-20.025 4.987-35.21 14.935-45.538 9.988-10.32 23.563-15.485 40.72-15.485 7.358 0 14.533 1.373 21.49 4.083 6.985 2.752 13.162 6.76 18.53 12.074 5.394 5.307 9.722 11.958 13.018 19.9 3.29 7.95 4.913 17.24 4.913 27.825-.002 8.84-1.26 17.006-3.773 24.582z"
							id="reversed-e"
						></path>
						<path d="M501.657 336.172c-2.807-7.8-6.876-14.452-12.163-19.908-5.327-5.423-11.836-9.662-19.568-12.632-7.767-2.97-16.53-4.49-26.37-4.49-4.138 0-8.432.223-12.87.59-4.47.373-8.872.89-13.2 1.488-4.33.59-8.467 1.338-12.387 2.154-3.962.815-7.435 1.705-10.47 2.603v159.557h33.136v-45.646c3.812 1.672 7.807 2.93 11.944 3.86 4.145.89 8.582 1.372 13.317 1.372 8.582 0 16.157-1.556 22.74-4.607 6.585-3.044 12.096-7.352 16.532-12.85 4.443-5.495 7.84-12.106 10.137-19.757 2.29-7.65 3.438-16.19 3.438-25.555 0-9.654-1.405-18.377-4.218-26.178zm-54.29 60.425c-3.66 0-7.282-.442-10.87-1.373-3.587-.89-6.51-2.045-8.73-3.418v-62.992c1.74-.292 3.96-.557 6.7-.78 2.696-.218 5.652-.368 8.832-.368 9.728 0 17.053 3.227 22.006 9.696 4.953 6.46 7.433 15.077 7.433 25.812 0 22.28-8.467 33.423-25.372 33.423z"></path>
						<path d="M572.11 396.597c-4.18-.3-7.508-.965-9.948-2.04-2.438-1.08-4.328-2.452-5.66-4.165-1.332-1.67-2.215-3.71-2.664-6.162-.44-2.453-.666-5.198-.666-8.283v-131.48l-33.13 5.496V383.04c0 6.463.625 12.26 1.923 17.382 1.257 5.13 3.656 9.512 7.21 13.113 3.512 3.6 8.322 6.387 14.383 8.39 6.067 1.97 14.017 3.045 23.78 3.195l4.772-28.523z"></path>
						<path d="M653.026 301.52c-1.474 6.013-3.18 12.55-5.028 19.568-1.848 7.06-3.805 14.153-5.803 21.322-1.997 7.202-4.07 14.187-6.142 20.98-2.072 6.802-4.07 12.965-5.993 18.536-2.065-5.57-4.287-11.734-6.584-18.535-2.324-6.794-4.62-13.78-6.835-20.98-2.22-7.17-4.368-14.262-6.366-21.322-1.997-7.02-3.73-13.555-5.21-19.568h-35.36c6.583 23.842 13.65 45.347 21.118 64.474 7.474 19.167 14.98 36.398 22.45 51.774-2.142 6.02-4.73 10.695-7.768 14.153-3.07 3.378-7.433 5.09-13.093 5.09-2.846 0-5.544-.265-8.1-.672-2.588-.482-5.47-1.34-8.723-2.528l-5.884 26.927c2.887 1.19 6.55 2.303 11.02 3.31 4.445.964 9.323 1.487 14.65 1.487 6.36 0 11.904-.748 16.68-2.195 4.77-1.49 9.06-3.786 12.83-6.945 3.777-3.194 7.29-7.21 10.47-12.033 3.18-4.906 6.36-10.81 9.54-17.72 8.283-19.202 15.94-39.035 22.965-59.46 7.025-20.432 13.76-42.303 20.193-65.663h-35.024z"></path>
					</g>
				</svg>
			</div>
		</>
	);
};

export default App;
