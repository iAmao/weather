import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/atoms/Button';

const TemperatureDetailContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	& >div:first-child {
		h2, h3 {
			line-height: 10px;
			text-align: center;
		}
	}

	img {
		width: 150px;
	}

	h2 {
		font-size: 3rem;
		text-align: center;
	}

	h4 {
		text-align: center;
	}
`;

const TemperatureDetail: React.FC<TemperatureDetailProps> = (props) => {
	const handleRemoveFavorite = () => props.onRemove();
	const handleAddFavourite = () => props.onAdd();
	return (
		<TemperatureDetailContainer>
			<div>
				<h2>{props.name}</h2>
				<h3>{props.country}</h3>
			</div>
			<img src={props.image} alt="Temperature" />
			<div>
				<h2>{props.temperature}&deg;C</h2>
				<h4>{props.description}</h4>
			</div>
			<div>
				{props.isFavorite
					? <Button variant="secondary" onClick={handleRemoveFavorite}>Remove from favorites</Button>
					: <Button variant="primary" onClick={handleAddFavourite}>Add to favorites</Button>
				}
			</div>
		</TemperatureDetailContainer>
	);
}

export interface TemperatureDetailProps {
	image: string;
	description: string;
	temperature: number;
	isFavorite: boolean;
	onRemove: () => void;
	onAdd: () => void;
	name: string;
	country: string;
}

export default TemperatureDetail;
