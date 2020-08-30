import actionTypes from './actionTypes';

export function fetchWeather(query: string) {
	return {
		type: actionTypes.FETCH_WEATHER__PENDING,
		payload: { query },
	};
};

export function getCityWeather(query: string, expiresAfter: number) {
	return {
		type: actionTypes.FETCH_CITY_WEATHER__PENDING,
		payload: {
			query,
			expiresAfter,
		},
	};
}

export function addWeatherToFavorites(key: string) {
	return {
		type: actionTypes.ADD_WEATHER_TO_FAVORITES__PENDING,
		payload: { key },
	};
}

export function removeWeatherFromFavorites(key: string) {
	return {
		type: actionTypes.REMOVE_WEATHER_FROM_FAVORITES,
		payload: { key },
	};
}

export function addNoteToWeather(key: string, content: string) {
	return {
		type: actionTypes.ADD_NOTE_TO_WEATHER,
		payload: { key, content },
	};
}

export function removeNoteFromWeather(key: string) {
	return {
		type: actionTypes.REMOVE_NOTE_FROM_WEATHER,
		payload: { key },
	};
}
