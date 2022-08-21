import React, { useState, useRef } from "react";

import "./contact.styles.css";

import ClientNeeds from "./ClientNeeds";
import ClientCompanyInfo from "./ClienteCompanyInfo";
import ProjectInfo from "./ProjectInfo";
import FinalScreen from "./FinalScreen";

import { getElementWidthWithoutPadding } from "../../utils";

const Contact = ({ renderContactContainer, setRenderContactContainer }) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [visitedScreens, setVisitedScreens] = useState([]);

	const btnPreviousScreen = useRef(null);
	const btnNextScreen = useRef(null);
	const containerControls = useRef(null);
	const contentContainer = useRef(null);
	const contactBodyContainer = useRef(null);
	const emptyContainer = useRef(null);
	const contactContainer = useRef(null);

	const PROJECT_INFO_SCREEN_ID = 2;
	const CLIENT_COMPANY_INFO_SCREEN_ID = 3;
	const FINAL_SCREEN_ID = 4;

	const previousQuestion = () => {
		if (currentQuestion - 1 < 0) return;

		if (currentQuestion - 1 === 0) {
			btnPreviousScreen.current.classList.add("hide_dot");
		} else {
			alternateScreen(false);
		}
		setCurrentQuestion(currentQuestion - 1);
	};

	const nextQuestion = () => {
		if (currentQuestion + 1 >= PROJECT_INFO_SCREEN_ID - 1 && currentQuestion + 1 < FINAL_SCREEN_ID) {
			if (btnPreviousScreen.current.classList.contains("hide_dot"))
				btnPreviousScreen.current.classList.remove("hide_dot");
			setVisitedScreens([...visitedScreens, currentQuestion + 1]);
		} else if (currentQuestion + 1 === FINAL_SCREEN_ID) containerControls.current.classList.add("hide_element");
		if (currentQuestion + 1 < 2) {
			setVisitedScreens([...visitedScreens, currentQuestion + 1]);
			setCurrentQuestion(currentQuestion + 1);
		} else {
			alternateScreen(true);
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	const alternateScreen = (isMoveForward) => {
		let emptyContainerWidth = getElementWidthWithoutPadding(contactBodyContainer.current);

		let contactStyle = window.getComputedStyle(contentContainer.current);
		let translateValue = contactStyle.getPropertyValue("transform").split(",")[4].trim();

		let nextWindowTranslateValue;
		if (isMoveForward) nextWindowTranslateValue = -(Math.abs(Number(translateValue)) + emptyContainerWidth * 2);
		else nextWindowTranslateValue = -(Math.abs(Number(translateValue)) - emptyContainerWidth * 2);

		contentContainer.current.style.transform = `translateX(${nextWindowTranslateValue}px)`;
	};

	const hideContactContainer = (e) => {
		if (
			e.target.getAttribute("id") !== "contact_container" &&
			e.target.getAttribute("id") !== "btn_close_contact_container"
		)
			return;
		setRenderContactContainer(false);
		setCurrentQuestion(0);
		setVisitedScreens([]);
	};

	if (!renderContactContainer) return null;

	return (
		<div ref={contactContainer} id="contact_container" onClick={hideContactContainer}>
			<div id="close_btn_parent" className="fade_in">
				<button id="btn_close_contact_container" onClick={hideContactContainer}>
					<span>x</span>
				</button>
				<div ref={contactBodyContainer} id="__body">
					<div
						ref={contentContainer}
						id="__content"
						className={`${currentQuestion === FINAL_SCREEN_ID ? "full_height_element" : ``}`}
					>
						<ClientNeeds
							currentQuestion={currentQuestion}
							nextQuestion={nextQuestion}
							previousQuestion={previousQuestion}
						/>
						<div ref={emptyContainer} className="contact_screen"></div>
						<ProjectInfo nextQuestion={nextQuestion} />
						<div className="contact_screen"></div>
						<ClientCompanyInfo nextQuestion={nextQuestion} />
						<div className="contact_screen"></div>
						<FinalScreen alternateScreen={alternateScreen} hideContactContainer={hideContactContainer} />
					</div>
					<div ref={containerControls} id="__controls">
						<button
							ref={btnPreviousScreen}
							id="btn_previous_screen"
							className="contact_button hide_dot"
							onClick={previousQuestion}
						>
							<img src="https://widgets.yeeply.com/1618934712/img/arrow_dx.1ba0f5a6.svg" alt="" />
						</button>
						<div className="dot" id="dot1"></div>
						<div
							className={`dot${currentQuestion < PROJECT_INFO_SCREEN_ID ? " remove_dot_background" : ""}`}
							id="dot2"
						></div>
						<div
							className={`dot${currentQuestion < CLIENT_COMPANY_INFO_SCREEN_ID ? " remove_dot_background" : ""}`}
							id="dot3"
						></div>
						<button
							ref={btnNextScreen}
							id="btn_next_screen"
							className={`contact_button${
								currentQuestion <= 1 || !visitedScreens.includes(currentQuestion + 1) ? " disabled_dot" : ""
							}`}
							onClick={nextQuestion}
						>
							<img src="https://widgets.yeeply.com/1618934712/img/arrow_dx.1ba0f5a6.svg" alt="" />
							<img
								id="disabled_forward_arrow"
								src="https://widgets.yeeply.com/1618934712/img/arrow_inactive.1ebbdb3f.svg"
								alt=""
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
