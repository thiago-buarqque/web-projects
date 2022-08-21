import styled from "styled-components";

export const SProductDetails = styled.div`
	width: 100%;

	@media screen and (min-width: 800px) {
		grid-area: pdetails;
	}

	.product_section_label {
		font-size: 16px;

		@media screen and (min-width: 500px) {
			font-size: 18px;
		}
	}
`;
export const SProductPrice = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    text-align: left;

    span#product_old_price{
        font-size 18px;
        text-decoration: line-through;

        @media screen and (min-width: 500px){
            font-size: 20px;
        }
    }

    span#product_new_price{
        font-size 28px;
        color: var(--highlight-color);
        margin-top: 4px;

        @media screen and (min-width: 500px){
            font-size: 32px;
        }
    }
`;

export const SProductSizes = styled.div`
	width: 100%;
	margin-top: 20px;

	> div {
		display: flex;
		align-items: center;

		margin-top: 15px;

		.product_size {
			width: 32px;
			height: 32px;

			background: #e8e8e8;

			margin-right: 4px;
			padding: 6px;
			border-radius: 5px;

			text-align: center;
			font-weight: bold;

			cursor: pointer;
		}
	}
`;

export const SProductColors = styled.div`
	width: 100%;
	margin-top: 20px;

	> div {
		display: flex;
		align-items: center;

		margin-top: 10px;

		.product_color {
			width: 32px;
			height: 32px;

			padding: 6px;

			border-radius: 5px;

			margin-right: 4px;

			cursor: pointer;
		}
	}
`;

export const SDesktopButtonsContainer = styled.div`
	width: 100%;
	height: 50px;

	margin-top: 20px;

	display: flex;
	align-items: center;
`;

const DesktopButton = styled.button`
	font-weight: 600;

	border-radius: 5px;

	padding: 12px;
	height: 50px;
`;

export const SBtnAddToCart = styled(DesktopButton)`
	width: 40%;
	background: #e8e8e8;
	font-size: 16px;

	display: flex;
	align-items: center;
	justify-content: center;

	transition: background 0.1s ease-out;

	&:hover {
		background: #e4e3e3;
	}

	span {
		margin: 0;
		font-size: 18px;
		text-align: left;
		margin-left: 12px;
		color: #313131;
	}

	svg {
		width: 36px;
		height: 36px;
		fill: #313131;
	}
`;

export const SBtnBuy = styled(DesktopButton)`
	width: calc(60% - 25px);
	background: var(--text-color);
	margin-left: 10px;

	color: #fff;

	font-size: 24px;
	text-align: center;

	transition: background 0.1s ease-out;

	&:hover {
		background: #212121;
	}
`;

export const SCalculateShipping = styled.div`
	width: 100%;

	margin-top: 20px;

	form {
		margin-top: 10px;

		input {
			border: 1px solid #909090;
			width: 150px;

			padding: 6px;

			border-radius: 5px;

			font-size: 14px;
			font-weight: 500;
		}

		button {
			margin-left: 10px;
			padding: 7px 12px;
			font-size: 14px;

			border-radius: 5px;

			background: var(--highlight-color);
			color: #fff;
			font-weight: 600;

			cursor: pointer;
		}
	}
`;
