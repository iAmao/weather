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
		return weather.favourites.map((city: string) => {
			return {
				...weather.weather[city].current,
				...weather.weather[city].location
			};
		})
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
	weather: any;
};

const mapStateToProps = ({ city, weather }: { city: CityState, weather: any }) => {
	return {
		city,
		weather
	};
};

const mapDispatchToProps = {
	fetchCitiesByPopulation,
	removeCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
