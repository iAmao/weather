import actionTypes from './actionTypes';
import {
	FetchCitiesActionPayload,
	FetchCitiesByPopulationActionPayload,
} from './types';

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
