import React from 'react';
import { connect } from 'react-redux';
import Favourites from './components/Favourites';
import WeatherListTable from './components/WeatherListTable';
import {
	fetchCitiesByPopulation,
	removeCity,
} from '../../store/city/actions';
import {
	RemoveCityAction,
	FetchCitiesByPopulationAction
} from '../../store/city/types';
import { CityState } from '../../store/city/initialState';
import { WeatherState } from '../../store/weather/types';

class IndexPage extends React.Component<IndexPageProps> {
	componentDidMount() {
		const { city, fetchCitiesByPopulation } = this.props;
		fetchCitiesByPopulation({
			limit: 15,
			expiresAt: city.expiresAt,
		});
	}

	getCities = () => {
		const { city } = this.props;
		return city.sortedPks.map(c => city.cities[c]);
	}

	getFavourites = () => {
		const { weather } = this.props;
		return weather.favourites
			.slice(0, 3)
			.map((city: string) => {
				const { location, current, poster } = weather.weather[city];
				return {
					poster,
					id: city,
					name: location.name,
					country: location.country,
					temperature: current.temperature,
				};
			});
	}

	handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.target as HTMLButtonElement;
		this.props.removeCity(Number(target.dataset.key));
	}

	render() {
		return (
			<div>
				<Favourites favourites={this.getFavourites()} />
				<WeatherListTable
					cities={this.getCities()}
					onDelete={this.handleDelete}
				/>
			</div>
		);
	}
}

export interface IndexPageProps {
	removeCity: RemoveCityAction,
	fetchCitiesByPopulation: FetchCitiesByPopulationAction,
	city: CityState,
	weather: WeatherState;
};

const mapStateToProps = ({ city, weather }: { city: CityState, weather: WeatherState }) => {
	return { city, weather };
};

const mapDispatchToProps = {
	fetchCitiesByPopulation,
	removeCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
