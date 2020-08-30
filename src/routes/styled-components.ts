import styled from 'styled-components';

export const PageLayoutContainer = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
`;

export const MainContentContainer = styled.div`
	height: 100%;
	max-height: calc(100vh - 50px);
	overflow-y: auto;
	overflow-x: hidden;
	background-color: #f9f9f9;
`;
