import { WeatherState } from './types';

const initialWeatherState: WeatherState = {
	loading: false,
	weather: {},
	favourites: [],
};

export default initialWeatherState;
