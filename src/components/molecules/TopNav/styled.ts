import styled from 'styled-components';

export const TopNavContainer = styled.div`
	width: calc(100vw - 75px);
	height: 40px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #efefef;
	padding: 10px 0;

	&>div {
		padding: 0 30px;
		input {
			height: 35px;
			width: 200px;
			font-size: 1rem;
			opacity: 0.8;
		}

		button {
			height: 40px;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
`;
