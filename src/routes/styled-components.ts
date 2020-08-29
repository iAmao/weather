import styled from 'styled-components';

export const PageLayoutContainer = styled.div`
	display: flex;
`;

export const MainContentContainer = styled.div`
	height: 100%;
	max-height: calc(100vh - 50px);
	overflow-y: auto;
	overflow-x: hidden;
`;
