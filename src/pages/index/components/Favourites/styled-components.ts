import styled from 'styled-components';

export const FavoritesContainer = styled.div`
	margin: 50px auto;
	display: grid;
	grid-gap: 30px;
	padding: 0 50px;
	max-width: 600px;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

export const StyledFavoriteCardPoster = styled.div`
	height: 200px;
	position: relative;
	background-color: #ccc;
	border-radius: 10px;
	overflow: hidden;
	&>img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

export const StyledFavoriteCardPosterTemperature = styled.div`
	height: 200px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #22222266;
	&>h2 {
		color: white;
		margin: 0;
	}
`;

export const StyledFavoriteCardName = styled.div`
	margin-top: 10px;
	&>h3 {
		margin: 0;
		text-align: center;
	}
`;

export const StyledFavoriteCard = styled.div`
	border-radius: 10px;
	position: relative;

	&>a {
		display: block;
		opacity: 0.1;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
`;
