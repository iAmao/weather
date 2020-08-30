import styled from 'styled-components';

export const CityPageContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	justify-content: space-between;
	height: 100%;

	&>div {
		justify-self: center;
		align-self: center;
		height: 100%;
	}
`;
