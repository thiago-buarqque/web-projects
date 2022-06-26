import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import { IconSearch, SSearcher, SSearcherContainer, SSearchSuggestions } from "./Searcher.styles";

import "./append_classes.css";
import { scrollPageToTop, setPageTitle } from "../../utils";

interface props extends RouteComponentProps<any> {}

const Searcher: React.FC<props> = ({ history, match }) => {
	const searcher_suggestions = useRef<HTMLDivElement>(null);
	const input_searcher = useRef<HTMLInputElement>(null);
	const searcherContainer = useRef<HTMLDivElement>(null);

	const [unloadComponent, setUnloadComponent] = useState(false);

	const hideShowSearchSuggestions = (): void => {
		if (
			input_searcher.current?.value.length === 0 &&
			searcher_suggestions.current?.classList.contains("hide_searcher_suggestions")
		)
			searcher_suggestions.current?.classList.remove("hide_searcher_suggestions");
		else if (input_searcher.current?.value && input_searcher.current.value.length > 0)
			searcher_suggestions.current?.classList.add("hide_searcher_suggestions");
	};

	const handleSearch = (): void => {
		if (input_searcher.current && input_searcher.current?.value.length !== 0)
			history.push(`/s/${input_searcher.current.value}`);
		else alert("Preencha o campo");
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		handleSearch();
	};

	if (match.params.searchValue) {
		scrollPageToTop();
		setPageTitle(`Busca por "${match.params.searchValue}"`);
	}

	useEffect(() => {
		if (input_searcher.current) {
			searcher_suggestions.current?.classList.add("hide_searcher_suggestions");
		}
		if ((match.params.searchValue || match.params.productName) && input_searcher.current)
			input_searcher.current.value = "" + (match.params.searchValue || match.params.productName.replaceAll("_", " "));
	});

	if (history.location.pathname.includes("checkout") && searcherContainer.current) {
		searcherContainer.current?.classList.add("element_exit_animation");
		setTimeout(() => setUnloadComponent(true), 1000);
	} else if (history.location.pathname.includes("checkout")) return null;
	else if (!history.location.pathname.includes("checkout") && unloadComponent) setUnloadComponent(false);

	if (unloadComponent) return null;

	return (
		<SSearcherContainer ref={searcherContainer}>
			<SSearcher onSubmit={handleFormSubmit}>
				<input
					ref={input_searcher}
					type="text"
					placeholder="Digite o que procura"
					onChange={hideShowSearchSuggestions}
					onFocus={hideShowSearchSuggestions}
				></input>
				<button id="btn_search_product" type="button" onClick={handleSearch}>
					<IconSearch className="icon" />
				</button>
			</SSearcher>
			<SSearchSuggestions ref={searcher_suggestions} id="searcher_suggestions" className="hide_searcher_suggestions">
				<Link to="/s/feminino">Feminino</Link>
				<Link to="/s/masculino">Masculino</Link>
				<Link to="/s/shorts">Shorts</Link>
				<Link to="/s/bikinis">Bikinis</Link>
				<Link to="/s/acessórios">Acessórios</Link>
			</SSearchSuggestions>
		</SSearcherContainer>
	);
};

export default Searcher;
