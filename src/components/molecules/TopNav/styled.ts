import styled from 'styled-components';

export const TopNavContainer = styled.div`
	width: calc(100vw - 75px);
	height: 40px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #efefef;

	&>div:last-child {
		padding: 0 30px;
		height: 100%;
		display: flex;
		width: 300px;
		align-items: center;
		input {
			height: 38px;
			width: 200px;
			font-size: 1rem;
			border: 1px solid #efefef;
			outline: unset;
			padding-left: 1rem;
		}

		button {
			height: 40px;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			margin-left: -5px;
		}
	}
`;
