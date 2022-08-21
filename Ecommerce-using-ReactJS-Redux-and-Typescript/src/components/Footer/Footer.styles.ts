import styled from "styled-components";

export const SFooter = styled.footer`
	width: 100%;
	height: 100px;

	background: #f1f1f1;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	@media screen and (min-width: 1024px) {
		margin-top: 50px;
	}

	span {
		font-size: 14px;
	}

	span#author {
		color: var(--highlight-color);
		margin-top: 8px;
	}
`;
