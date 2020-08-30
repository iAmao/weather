import styled from 'styled-components';

export const TopNavContainer = styled.div`
	width: calc(100vw - 375px);
	height: 60px;
	display: flex;
	justify-content: center;
	border-bottom: 1px solid #efefef;

	&>div:last-child {
		padding: 0 30px;
		height: 100%;
		display: flex;
		width: 500px;
		align-items: center;
		&> div {
			height: 40px;
		}

		input {
			height: 36px;
			width: 400px;
			font-size: 1rem;
			border: 1px solid #efefef;
			outline: unset;
			padding-left: 1rem;
		}

		button {
			height: 40px;
			top: -1px;
			position: relative;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			margin-left: -5px;
		}
	}
`;
