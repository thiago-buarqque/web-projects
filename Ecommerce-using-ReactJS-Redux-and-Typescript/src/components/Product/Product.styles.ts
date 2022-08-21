import styled from "styled-components";

export const SProduct = styled.div`
	position: relative;

	width: 100vw;
	max-width: 520px;
	//height: 500px;
	// min-height: 100%;
	padding: 0 10px;

	margin: 0 auto;

	overflow: hidden;

	transition: all var(--transition-duration) ease-in-out;

	@media screen and (min-width: 800px) {
		display: grid;
		// pimgs -> Product images
		// pname -> Product name
		// pdetails -> Product details
		// pdesc -> Product description
		max-width: 1100px;
		grid-template-areas:
			"pimgs pname"
			"pimgs pdetails"
			"pdesc pdesc";

		grid-template-rows: 80px auto;
		grid-template-columns: 50% 50%;
		column-gap: 15px;
		justify-content: space-between;
	}

	@media screen and (min-width: 1024px) {
		margin: 15px auto 0 auto;
		min-height: 750px;
	}

	button#mobile_btn_add_to_cart {
		width: 100%;
		height: 60px;

		position: fixed;
		bottom: 0px !important;
		left: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		z-index: 4;

		background: var(--highlight-color);

		padding: 12px 0;

		color: #fff;
		font-weight: 600;

		@media screen and (min-width: 520px) {
			display: none;
		}
	}

	h4#product_name {
		font-size: 20px;
		font-weight: 500;
		margin-bottom: 15px;

		@media screen and (min-width: 500px) {
			font-size: 24px;
			margin-top: 0;
		}

		@media screen and (min-width: 800px) {
			grid-area: pname;
		}
	}
`;

export const SProductDescription = styled.div`
	width 100%;

	margin-top: 20px;

	@media screen and (min-width: 800px){
		grid-area: pdesc;
	}
	
	> button{
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		padding: 4px 12px;
		margin-bottom: 10px;

		background: #E8E8E8;

		border-radius: 3px;

		span{
			font-size: 14px;
			font-weight: 500;
			color: #000;
		}

		// '+' symbol
		span:nth-child(2){
			font-size: 18px;
		}

		@media screen and (min-width: 800px){
			display: none;
		}
	}

	> div {
		height: 0;
		transition: height 0.3s ease-in;

		overflow: hidden;

		span.product_section_label{
			font-weight: 600;
		}

		@media screen and (min-width: 800px){
			height: auto;
		}

		p{  
			font-size: 14px;
		}
	}
`;
