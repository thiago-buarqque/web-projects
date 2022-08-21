import styled from "styled-components";

import { ReactComponent as _IconSearch } from "../../media/icons/014-search.svg";

export const IconSearch = styled(_IconSearch)`
	width: 28px;
	height: 28px;

	position: absolute;
	right: 16px;
	top: calc(50% - 14px);

	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (min-width: 760px) {
		width: 34px;
		height: 34px;
		top: calc(50% - 17px);
	}

	@media screen and (min-width: 1020px) {
		width: 36px;
		height: 36px;
		top: calc(50% - 18px);
		right: 36px;
	}
`;

export const SSearcherContainer = styled.div`
    position: relative;

    width: 100%;
    margin 0 auto;
	background: #fafafa;

	height: 100px;

	display: flex;
	align-items: center;
    flex-direction: column;

	padding: 0 10px;
	margin-top: 25px;
    margin-bottom: -15px;

	transition: all var(--transition-duration) ease-in-out;

	overflow: hidden;

	@media screen and (min-width: 760px) {
		height: 160px;
	}

`;

export const SSearcher = styled.form`
	z-index: 2;
	position: relative;

	width: 100%;
	// height: 100px;
	max-width: 1100px;

	background: #f2f2f2;

	border-radius: 14px;

	@media screen and (min-width: 760px) {
		height: 80px;
	}

	@media screen and (min-width: 1020px) {
		height: 100px;
		border-radius: 25px;
	}

	input {
		width: 100%;
		height: 100%;

		padding: 20px 50px 20px 16px !important;

		font-size: 14px;
		font-weight: 600;

		@media screen and (min-width: 760px) {
			font-size: 18px;
		}

		@media screen and (min-width: 1020px) {
			padding: 20px 50px 20px 36px;
		}
	}
`;

export const SSearchSuggestions = styled.div`
	width: 100%;
	max-width: 1000px;
	height: 40px;

	z-index: 0;

	overflow-x: scroll;

	transition: margin 0.2s ease-in, opacity 0.2s ease-in;

	display: flex;
	align-items: center;
	justify-content: center;

	padding: 0 14px;

	@media screen and (min-width: 760px) {
		overflow: hidden;
	}

	a {
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;

		margin: 0 12px;

		@media screen and (min-width: 760px) {
			font-size: 16px;
			margin: 0 16px;
		}

		@media screen and (min-width: 1020px) {
			font-size: 18px;
			margin: 0 18px;
		}

		@media screen and (min-width: 1200px) {
			font-size: 18px;
			margin: 0 22px;
		}

		&:hover {
			color: rgba(0, 0, 0, 0.8);
		}
	}
`;
