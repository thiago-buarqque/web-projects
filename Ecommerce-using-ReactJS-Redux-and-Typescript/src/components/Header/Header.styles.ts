import styled from "styled-components";

export const SHeader = styled.header`
	width: 100%;
	height: 60px;
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	padding: 0 15px;

	border-bottom: 1px solid #d7d7d7;
`;

export const SNavContent = styled.div`
	width: 100%;
	max-width: 1200px;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	@media screen and (min-width: 1400px) {
		max-width: 1300px;
	}

	#nav_logo {
		width: 140px;
	}
`;

export const SNavCartContainer = styled.div`
	position: relative;
	width: 30px;

	cursor: pointer;

	> svg {
		width: 30px;
		height: 30px;
	}

	> div {
		font-size: 12px;
		color: #fff;
		font-weight: bold;

		background: var(--highlight-color);
		border-radius: 50%;

		position: absolute;
		top: -5px;
		right: -5px;

		width: 17px;
		height: 17px;

		text-align: center;

		line-height: 18px;
	}
`;
