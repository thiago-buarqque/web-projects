import React, { useRef, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ANIMATION_DURATION } from "../../App";

import { SMain, SMainContent } from "./Main.styles";

import "./_animations.css";

interface props extends RouteComponentProps<any> {}

const Main: React.FC<props> = ({ history }) => {
	const firstRender = useRef(true);
	const [unloadComponent, setUnloadComponent] = useState(false);
	const main = useRef<HTMLElement>(null);

	useEffect(() => {
		if (firstRender.current) firstRender.current = false;
	});

	if (history.location.pathname !== "/" && !firstRender.current && !unloadComponent && main.current != null) {
		main.current.classList.add("main_exit_animation");
		setTimeout(() => {
			setUnloadComponent(true);
		}, ANIMATION_DURATION);
	} else if (history.location.pathname !== "/") return null;
	return (
		<SMain ref={main} onClick={() => history.push("/s/colecao%20verao")}>
			<SMainContent id="main-content">
				<p id="main_text">O VERÃO CHEGOU!</p>
				<p id="secondary_text">AS NOVAS TENDÊNCIAS TAMBÉM</p>
				<button type="button">CONFIRA!</button>
			</SMainContent>
		</SMain>
	);
};

export default Main;
