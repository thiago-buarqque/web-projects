import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
`;

const fadeIn = keyframes`
  from{
	  opacity: 0;
  }
  to{
	  opacity: 1;
  }
`;

export const CheckoutContainer = styled.div`
	display: flex;
	flex-direction: column;

	max-width: 550px;

	animation-name: ${fadeIn};
	animation-fill-mode: forwards;
	animation-duration: 1s;
	animation-delay: 0.5s;

	opacity: 0;

	@media screen and (min-width: 1024px) {
		max-width: 950px;
		display: grid;
		grid-template-areas:
			"header details"
			"form details";
		grid-template-columns: 50% 50%;
		grid-template-rows: 100px auto;
		column-gap: 25px;
	}

	@media screen and (min-width: 1300px) {
		max-width: 1100px;
		margin-top: 35px;
	}

	margin-top: 25px;

	// Append classes
	.active_checkout_dot {
		background: var(--highlight-color) !important;
	}

	.field_error_message {
		color: var(--highlight-color);
		font-size: 14px;
	}

	.disabled_form_field {
		> span,
		> input {
			opacity: 0.6;
		}
	}
`;

export const CheckoutHeader = styled.div`
	width: 80%;
	margin: 0 auto;

	grid-area: header;

	display: flex;
	justify-content: space-between;
	align-items: center;

	position: relative;

	margin-bottom: 15px;

	@media screen and (max-width: 300px) {
		width: 100%;
	}

	> span#checkout__header_line {
		height: 1px;
		width: 70%;
		position: absolute;
		left: 20%;
		bottom: 25px;
		background: #dadada;
		z-index: -1;

		@media screen and (min-width: 1024px) {
			bottom: 30px;
		}
	}
`;
export const CheckoutHeaderDot = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	> span {
		font-size: 14px;
		font-weight: 600;
	}

	.checkout__header_dot {
		background: #dadada;
		border-radius: 50%;
		width: 50px;
		height: 50px;

		transition: background 0.2s ease-in;

		margin-top: 5px;

		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			width: 32px;
			height: 32px;
			color: #fff;
			fill: #fff;
		}
	}
`;
export const LeftContainer = styled.div`
	width: 100%;
	grid-area: form;

	.required_items_message {
		display: block;
		font-size: 14px;
		margin-top: 15px;
		color: red;
	}

	.instruction_message {
		font-size: 14px;
		margin: 4px 0;
		display: block;

		@media screen and (max-width: 300px) {
			font-size: 12px;
		}
	}

	.required_item {
		color: red;
	}

	.form_item {
		margin-top: 20px;
		.form_item_name {
			font-size: 14px;
			font-weight: 600;
			display: block;

			@media screen and (max-width: 300px) {
				font-size: 12px;
			}
		}

		> input {
			width: 150px;
			height: 35px;

			margin-top: 8px;
			border-radius: 5px;
			background: #eaeaea;

			padding-left: 12px;
			padding-right: 12px;

			font-size: 14px;
		}
	}

	.left_container_next_button {
		font-size: 16px;
		color: #fff;
		text-align: center;
		font-weight: 500;

		background: var(--highlight-color);
		width: 200px;
		height: 40px;

		border-radius: 5px;

		margin-top: 8px;

		&:disabled {
			opacity: 0.6;
		}
	}

	#form_item_select_payment_method {
		#select_payment_method {
			margin-top: 8px;
		}
	}
`;

export const AddressDetailsContainer = styled.div`
	width: 100%;
	display: grid;

	grid-template-areas:
		"address address"
		"state city"
		"h_number h_number_compl";

	grid-template-columns: 50% 50%;
	column-gap: 12px;

	#form_item_address {
		grid-area: address;
	}

	#form_item_state {
		grid-area: state;
		width: 50%;
	}

	#form_item_city {
		grid-area: city;
		width: 150%;
		margin-left: -50%;
	}

	#form_item_house_number {
		grid-area: h_number;
	}

	#form_item_house_number_complement {
		grid-area: h_number_compl;
	}

	#form_item_address,
	#form_item_state,
	#form_item_city,
	#form_item_house_number,
	#form_item_house_number_complement {
		> input {
			width: calc(100% - 10px);
		}
	}
`;
export const FormPayment = styled.form`
	display: grid;
	grid-template-areas:
		"card_num expiration"
		"card_name card_pin";
	column-gap: 15px;

	#form_item_num_card {
		grid-area: card_num;
	}
	#form_item_card_expiration {
		grid-area: expiration;
	}
	#form_item_name_in_card {
		grid-area: card_name;
	}
	#form_item_card_pin {
		grid-area: card_pin;
	}

	> .form_item {
		> input {
			width: 100%;
		}
	}
`;
export const FormAddress = styled.form`
	width: 100%;

	#btn_submit_cep {
		width: 100px;
		height: 35px;

		background: var(--highlight-color);

		margin-left: 8px;

		text-align: center;
		color: #fff;
		font-weight: 500;

		border-radius: 5px;
	}
`;
export const OrderDetails = styled.div`
	width: 100%;

	grid-area: details;

	padding: 25px 0;

	@media screen and (min-width: 1024px) {
		border-left: 1px solid #dadada;
		padding: 0 0 0 25px;
	}

	div#order_details_header {
		width: 100%;

		padding-bottom: 15px;
		margin-bottom: 15px;

		border-bottom: 1px solid #dadada;

		span#checkout__total_label {
			font-size: 16px;
			display: block;

			margin-bottom: 4px;
		}

		span#checkout__total_value {
			font-size: 24px;
			color: var(--highlight-color);
		}
	}

	span#buying_message {
		font-weight: 600;
	}
`;

export const OrderProducts = styled.div`
	padding-top: 15px;
`;

export const ContainerEmptyCarMessage = styled.div`
	width: 100%;

	h2 {
		max-width: 90%;

		@media screen and (min-width: 1024px) {
			max-width: 70%;
		}

		font-size: 20px;
		text-align: center;
		margin: 24px auto;
	}
`;
