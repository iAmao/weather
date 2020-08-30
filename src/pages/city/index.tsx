import React from 'react';
import { connect } from 'react-redux';
import { CityPageContainer } from './styled-components';
import TemperatureDetail from './components/TemperatureDetail';
import {
	UVIndex,
	WindDetail,
	FeelsLikeDetail,
	PressureDetail,
	HumidityDetail,
	DetailRoot
} from './components/WeatherDetails';
import Notes from './components/Notes';
import {
	getCityWeather,
	addNoteToWeather,
	removeNoteFromWeather,
	addWeatherToFavorites,
	removeWeatherFromFavorites,
} from '../../store/weather/actions';
import {
	Weather,
	GetCityWeatherAction,
	AddNoteToWeatherAction,
	RemoveNoteFromWeatherAction,
	AddWeatherToFavoritesAction,
	RemoveWeatherFromFavoritesAction
} from '../../store/weather/types';

class City extends React.Component<CityPageProps> {
	componentDidMount() {
		const { getCityWeather, match, weather, expiresAfter } = this.props;
		this.props.getCityWeather(match.params.id, expiresAfter || 0);
	}

	handleSaveNote = (content: string) => {
		const { addNoteToWeather, match } = this.props;
		addNoteToWeather(match.params.id, content);
	}

	handleDeleteNote = () => {
		const { removeNoteFromWeather, match } = this.props;
		removeNoteFromWeather(match.params.id);
	}

	handleAddFavourite = () => {
		const { addWeatherToFavorites, match } = this.props;
		addWeatherToFavorites(match.params.id);
	}

	handleRemoveFavourite = () => {
		const { removeWeatherFromFavorites, match } = this.props;
		removeWeatherFromFavorites(match.params.id);
	}

	render() {
		const { weather, note, isFavorite, name, country } = this.props;
		const icon = weather.weather_icons ? weather.weather_icons[0] : '';
		const desc = weather.weather_descriptions ? weather.weather_descriptions[0] : '';
		return (
			<CityPageContainer>
				<TemperatureDetail
					isFavorite={isFavorite}
					image={icon}
					temperature={weather.temperature}
					onAdd={this.handleAddFavourite}
					onRemove={this.handleRemoveFavourite}
					description={desc}
					name={name}
					country={country}
				/>
				<DetailRoot>
					<div>
						<WindDetail
							windDir={weather.wind_dir}
							windSpeed={weather.wind_speed}
						/>
						<FeelsLikeDetail feelslike={weather.feelslike}/>
						<PressureDetail pressure={weather.pressure}/>
						<HumidityDetail humidity={weather.humidity}/>
						<UVIndex uvIndex={weather.uv_index}/>
					</div>
				</DetailRoot>
				<Notes
					onSave={this.handleSaveNote}
					onDelete={this.handleDeleteNote}
					content={note}
				/>
			</CityPageContainer>
		);
	}
}

const mapStateToProps = ({ weather }: any, ownProps: CityPageProps) => {
	const key = ownProps.match.params.id
	const cityWeather = weather.weather[key] || {};
	const location = cityWeather.location || {}
	return {
		weather: cityWeather.current || {},
		note: cityWeather.note || '',
		isFavorite:  cityWeather.isFavorite || false,
		expiresAfter: cityWeather.expiresAfter || 0,
		name: location.name || '',
		country: location.country || ''
	};
};

const mapDispatchToProps = {
	getCityWeather,
	addNoteToWeather,
	removeNoteFromWeather,
	addWeatherToFavorites,
	removeWeatherFromFavorites,
};

export interface CityPageProps {
	removeNoteFromWeather: RemoveNoteFromWeatherAction;
	addNoteToWeather: AddNoteToWeatherAction;
	getCityWeather: GetCityWeatherAction;
	addWeatherToFavorites: AddWeatherToFavoritesAction;
	removeWeatherFromFavorites: RemoveWeatherFromFavoritesAction;
	weather: any;
	note: string;
	expiresAfter: number;
	match: any;
	isFavorite: boolean;
	name: string;
	country: string;
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
