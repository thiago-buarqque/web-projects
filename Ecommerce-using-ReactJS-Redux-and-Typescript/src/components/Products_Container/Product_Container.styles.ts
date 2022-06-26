import styled from "styled-components";

export const SProductsContainer = styled.div`
	width: 100%;
	position: relative;

	padding: 0 10px;

	@media screen and (min-width: 1100px) {
		padding: 0;
	}

	div.products_section__content {
		display: flex;
		flex-direction: column;
		align-items: center;

		@media screen and (min-width: 660px) {
			display: grid;
			row-gap: 50px;
			justify-content: center;
			grid-template-columns: auto auto;
			column-gap: 50px;
		}

		@media screen and (min-width: 960px) {
			grid-template-columns: auto auto auto;
			justify-content: space-between;
			column-gap: 30px;
		}

		@media screen and (min-width: 1400px) {
			grid-template-columns: auto auto auto auto;
		}
	}
	.products_section__title {
		font-size: 24px;
		color: #000;
		font-weight: 600;

		@media screen and (min-width: 800px) {
			margin-left: 16px;
		}

		@media screen and (min-width: 1024px) {
			margin-left: 0;
		}
	}
`;
