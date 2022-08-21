import styled from "styled-components";

export const SCartContainer = styled.div`
	width: 100%;
	height: 100%;

	position: fixed;
	right: 0;
	top: 0;

	transition: background 0.3s ease-in;

	z-index: 5;

	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: rgba(0, 0, 0, 0.2);
`;

export const SCart = styled.div`
	width: 100vw;
	max-width: 600px;
	height: 100%;

	transition: margin 0.3s ease-in;

	background-color: #fff;

	z-index: 5;

	display: grid;
	grid-template-rows: 8vh 1fr 20vh;

	@media screen and (min-width: 1024px) {
		max-width: 400px;
	}
	@media screen and (min-width: 1600px) {
		max-width: 500px;
	}
`;

export const SCartHeader = styled.div`
	width: 100%;
	height: 8vh;
	background: var(--highlight-color);

	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;

	svg#cart__cart_icon {
		width: 28px;
		height: 28px;
		fill: #fff;
	}

	button#btn_close_cart {
		width: 32px;
		height: 32px;

		cursor: pointer;

		position: absolute;
		right: 8px;
		top: calc(50% - 16px);

		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			width: 18px;
			height: 18px;
			fill: #fff;
		}
	}

	span {
		font-size: 20px;
		color: #fff;
		text-transform: uppercase;
		margin-left: 8px;
	}
`;

export const SCartBody = styled.div`
	width: 100%;
	height: 100%;

	position: relative;
	padding: 15px;

	overflow: hidden;

	h4#empty_cart_message {
		text-align: center;
	}

	div#cart_body_content {
		width: 100%;
		height: 100%;
		overflow-y: scroll;

		// 17px is the size of browsers scrollbar +
		// 15px is the padding of the cart body
		padding-right: calc(17px + 15px);
		box-sizing: content-box !important;
	}
`;

export const SCartFooter = styled.div`
	width: 100%;

	div#cart_total_price {
		background: #e3e3e3;
		padding: 22px 0;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 22px;
		color: #111111;

		height: 50%;
	}

	form {
		background: var(--text-color);
		padding: 22px 0;
		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;

		height: 50%;

		button {
			width: 100%;
			height: 100%;
			color: #fff;
			font-size: 18px;
			font-weight: 600;
			letter-spacing: 3px;
		}
	}
`;
