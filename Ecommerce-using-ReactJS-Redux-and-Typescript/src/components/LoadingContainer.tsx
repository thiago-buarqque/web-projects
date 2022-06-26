import styled from "styled-components";
import { ReactComponent as LoadingSVG } from "../media/_loading.svg";

const SLoadingContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	z-index: 10;

	background: rgba(250, 250, 250, 0.3);

	display: flex;
	align-items: center;
	justify-content: center;

	> svg {
		width: 150px;
	}
`;

const LoadingContainer = () => {
	return (
		<SLoadingContainer>
			<LoadingSVG />
		</SLoadingContainer>
	);
};

export default LoadingContainer;
