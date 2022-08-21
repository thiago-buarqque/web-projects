import styled from "styled-components";

export const SProductCard = styled.div`
	position: relative;

	width: 100%;
	max-width: 520px;

	margin-bottom: 50px;

	@media screen and (min-width: 660px) {
		width: 350px;
		margin-bottom: 0px;
	}

	a {
		text-decoration: none;
		width: 100%;
		height: 100%;
	}

	@media screen and (min-width: 800px) {
		width: 300px;
	}
`;

export const SCardImage = styled.div`
	height: 600px;

	margin: 0 auto;

	background-position: center;
	background-size: cover;
	border-radius: 2px;

	@media screen and (max-width: 365px) {
		width: 280px;
		height: 400px;
	}

	@media screen and (max-width: 285px) {
		width: 250px;
		height: 400px;
	}

	@media screen and (min-width: 500px) {
		height: 700px;
	}

	@media screen and (min-width: 660px) {
		height: 450px;
	}

	@media screen and (min-width: 960px) {
		height: 420px;
	}
`;

export const SCardDetailsContainer = styled.div`
	text-align: center;
	padding: 8px 15px 0 15px;

	p {
		font-size: 18px;
		font-weight: 500;
		color: #000;
		margin: 0 0 8px 0;
		height: 45px;
		overflow: hidden;
	}

	div {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		> span.product_card__old_price {
			font-size: 16px;
			color: #616161;
			text-decoration: line-through;
		}
		> span.product_card__new_price {
			font-size: 18px;
			color: var(--highlight-color);
			font-weight: 700;
			margin-left: 15px;
		}
	}
`;
