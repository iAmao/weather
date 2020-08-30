import styled from 'styled-components';

// RightNavContainer,
// 	RightNavHeader,
// 	RightNavContent

export const RightNavContainer = styled.div`
	display: grid;
	height: 100vh;
	width: 300px;
	grid-template-rows: 60px; auto;
`;

export const RightNavHeader = styled.div`
	background-color: ${({ theme }) => theme.colors.primary};
`;

export const RightNavContent = styled.div`
	position: relative;
	background-color: ${({ theme }) => theme.colors.primary}88;
`;

export const RightNavError = styled.div``;
export const RightNavOverlay = styled.div`
	background-color: #22222288;
	position: relative;
	z-index: 10;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const RightNavImage = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	&>img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const RightNavWeather = styled.div`
	&>div>h1 {
		color: white;
		font-size: 3rem;
		text-align: center;
	}
	&>div>h3 {
		color: white;
		text-align: center;
	}
	&>h3 {
		color: white;
		text-align: center;
	}
`
