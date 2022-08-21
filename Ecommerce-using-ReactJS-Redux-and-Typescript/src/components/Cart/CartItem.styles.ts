import styled from "styled-components";

export const SCartItem = styled.div`
	width: 100%;
	max-height: 120px;

	display: flex;
	align-items: center;

	margin-bottom: 15px;

	div.cart_item_image {
		img {
			width: 100px;
			height: 120px;
		}
	}
`;

export const SCartItemData = styled.div`
	width: 100%;
	height: 150px;

	padding-left: 8px;

	overflow: hidden;

	display: flex;
	flex-direction: column;

	a.cart_item_name {
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 14px 0;
	}

	span.cart_item_price {
		font-size: 14px;
		font-weight: 600;
		color: var(--highlight-color);
	}

	span.cart_item_quantity_label {
		font-size: 12px;
		text-transform: uppercase;

		@media screen and (max-width: 300px) {
			font-size: 11px;
		}
	}
`;

export const SCartItemDetails = styled.div`
	width: 100%;
	height: 30px;
	padding: 6px 0;

	display flex;
	align-items: center;
	justify-content: flex-start;

	span.cart_item_details__size, span.cart_item_details__color{
		font-size: 12px;
		color: #717171;
		text-transform: uppercase;

		&:nth-child(2){
			margin-left: 15px;
		}

		@media screen and (max-width: 300px) {
			font-size: 10px;
		}
	}
`;

export const SCartItemQuantityForm = styled.div`
	margin-top: 8px;

	display: flex;
	align-items: center;

	input {
		width: 50px;
		font-size: 12px;
		font-weight: 600;
		border: 1px solid #f1f1f1;
		padding: 4px 0;
		text-align: center;
		border-radius: 2px;
		margin: 0 8px;
	}

	button {
		svg {
			width: 12px;
			height: 12px;
			fill: var(--highlight-color);
		}
	}
`;
