import actionTypes from './actionTypes';
import {
	FetchCitiesActionPayload,
	FetchCitiesByPopulationActionPayload,
} from './types';
import {
	CoordinatePosition
} from '../../types';

export function fetchCities(payload: FetchCitiesActionPayload) {
  return {
    type: actionTypes.FETCH_CITIES__PENDING,
    payload,
  };
};

export function fetchCitiesByPopulation(payload: FetchCitiesByPopulationActionPayload) {
	return fetchCities({
		sort: '-population',
		...payload,
	});
};

export function removeCity(id: number) {
	return {
		type: actionTypes.REMOVE_CITY,
		payload: { id },
	};
}

export function findMyCityByCoords(position: CoordinatePosition) {
	console.log(position, 'HERO 2')
	return {
		type: actionTypes.FETCH_CITY_FROM_COORD__PENDING,
		payload: {
			position,
		},
	};
}
