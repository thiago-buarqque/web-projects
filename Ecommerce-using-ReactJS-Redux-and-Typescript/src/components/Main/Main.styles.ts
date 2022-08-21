import styled from "styled-components";

import MobileBackground from "../../media/images/angelo-pantazis-h0AnGGgseio-unsplash.jpg";
import DesktopBackground from "../../media/images/igor-rodrigues-pWlJiKKgIj8-unsplash.jpg";

export const SMain = styled.main`
	width: 100%;
	height: 90vh;
	max-width: 1200px;

	position: relative;

	margin: 0 auto;
	padding: 0 10px;

	position: relative;
	line-height: 1;

	background-image: url("${MobileBackground}");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	overflow: hidden;

	transition: opacity var(--transition-duration) ease-in-out, height var(--transition-duration) ease-in-out;

	cursor: pointer;

	@media screen and (min-width: 720px) {
		height: 500px;
		background-image: url("${DesktopBackground}");
	}

	@media screen and (min-width: 880px) {
		height: 85vh;
		max-height: 600px;
	}

	> img {
		width: 100%;
	}
`;

export const SMainContent = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.1);

	z-index: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	text-align: center;

	#main_text {
		color: #ff6073;
		font-size: 32px;
		font-weight: 800;

		margin: 0;

		@media screen and (min-width: 600px) {
			font-size: 48px;
		}

		@media screen and (min-width: 720px) {
			font-size: 56px;
		}
	}

	#secondary_text {
		color: #fff;
		font-size: 14px;
		font-weight: 700;
		margin: 8px 0 22px 0;
		letter-spacing: 0.05em;

		@media screen and (min-width: 600px) {
			font-size: 22px;
		}

		@media screen and (min-width: 720px) {
			font-size: 22px;
			font-weight: 800;
		}
	}

	> button {
		width: 170px;
		border-radius: 5px;
		padding: 12px;
		background: #fff;

		font-weight: 800;
		color: var(--highlight-color);
		letter-spacing: 1px;

		transition: all 0.2s ease-in-out;

		&:hover {
			background: var(--highlight-color);
			color: #fff;
		}

		@media screen and (min-width: 600px) {
			width: 200px;
			padding: 16px;
			font-size: 18px;
		}

		@media screen and (min-width: 720px) {
			font-size: 20px;
		}
	}
`;
