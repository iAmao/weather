import React from 'react';
import { Link } from 'react-router-dom';
import {
	FavoritesContainer,
	StyledFavoriteCard,
	StyledFavoriteCardName,
	StyledFavoriteCardPoster,
	StyledFavoriteCardPosterTemperature,
} from './styled-components';

// const FavoritesContainer = styled.div`
// 	margin: 50px auto;
// 	display: grid;
// 	grid-gap: 20px;
// 	padding: 0 50px;
// 	max-width: 600px;
// 	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
// `;

export interface FavoriteCardProps {
	id: string;
	name: string;
	country: string;
	poster?: string;
	temperature: string;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ id, country, name, temperature, poster }) => {
	const displayName = `${name}, ${country}`;
	return (
		<StyledFavoriteCard>
			<StyledFavoriteCardPoster>
				{/*<img src="https://images.unsplash.com/photo-1583847513358-8151ff4805b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt={displayName} />*/}
				{poster && <img src={poster} alt={displayName} />}
				<StyledFavoriteCardPosterTemperature>
					<h2>{temperature}&deg;C</h2>
				</StyledFavoriteCardPosterTemperature>
			</StyledFavoriteCardPoster>
			<StyledFavoriteCardName>
				<h3>{displayName}</h3>
			</StyledFavoriteCardName>
			<Link to={`/city/${id}`} />
		</StyledFavoriteCard>
	);
}

const Favorites: React.FC<FavoritesProps> = (props) => {
	return (
		<FavoritesContainer>
			{props.favourites.map((weather) => {
				return <FavoriteCard
					id={weather.id}
					key={weather.id}
					name={weather.name}
					poster={weather.poster}
					country={weather.country}
					temperature={weather.temperature}
				/>
			})}
		</FavoritesContainer>
	);
};

export interface FavoritesProps {
	favourites: Array<FavoriteCardProps>;
};
export default Favorites;
