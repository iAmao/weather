import React from 'react';
import styled from 'styled-components';


const FavoritesContainer = styled.div`
	margin-top: 50px;
	display: grid;
	grid-gap: 20px;
	padding: 0 50px;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const StyledFavoriteCard = styled.div`
	border-radius: 10px;
	background-color: white;

	&>div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&>div:first-child {
		border-bottom: 1px solid #efefef;
		height: 40px;
		padding: 10px 0;

		h3 {
			text-align: center;
			margin: 0;
			font-size: 0.8rem;
		}
	}
`;

interface FavoriteCardProps {
	name: string;
	temp: string;
};

const FavoriteCard = ({ name, temp }: FavoriteCardProps) => {
	return (
		<StyledFavoriteCard>
			<div>
				<h3>{name}</h3>
			</div>
			<div><h2>{temp}&deg;C</h2></div>
		</StyledFavoriteCard>
	);
}

const Favorites: React.FC<FavoritesProps> = (props) => {
	return <FavoritesContainer>
		{props.favourites.map((weather) => {
			return <FavoriteCard name={weather.name} temp={weather.temperature} />
		})}
	</FavoritesContainer>
}

export interface FavoritesProps {
	favourites: any[]
}
export default Favorites;
