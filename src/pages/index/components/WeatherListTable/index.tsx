import React from 'react';
import { Link } from 'react-router-dom';
import {
	Table,
	TableRow,
	TableData,
} from './styled-components';
import Button from '../../../../components/atoms/Button';
import TemperatureScale from '../../../../components/atoms/TemperatureScale';
import { City } from '../../../../store/city/initialState';

const getWeatherAlt = (weather: any) => {
	return {
		humidity: weather ? `${weather.humidity}%` : '-',
		description: weather ? `${weather.weather_descriptions[0] || '-'}` : '-',
		temperature: weather ? weather.temperature : 0,
		temperatureCelsius: weather ? `${weather.temperature}` : '-',
	};
};

const WeatherListTable: React.FC<WeatherListTableProps> = ({ cities, onDelete }) => {
	return (
		<Table>
			<tbody>
				{cities.map((city) => {
					const weather = getWeatherAlt(city.weather);
					return <TableRow key={city.id}>
						<TableData>{city.name}</TableData>
						<TableData small>{weather.humidity}</TableData>
						<TableData small>{weather.description}</TableData>
						<TableData>
							<b>{weather.temperature}&deg;C</b>
						</TableData>
						<TableData>
							<TemperatureScale temperature={weather.temperature} />
						</TableData>
						<TableData>
							<Link to={`/city/${city.name}`}>More</Link>
						</TableData>
						<TableData>
							<Button variant="primary">Add to Favorites</Button>
						</TableData>
						<TableData>
							<Button
								variant="secondary"
								onClick={onDelete}
								data-key={city.id}
							>Remove</Button>
						</TableData>
					</TableRow>
				})}
			</tbody>
		</Table>
	);
}

export interface WeatherListTableProps {
	cities: City[];
	onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default WeatherListTable;
