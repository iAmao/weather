import { createActionTypes } from '../util';

const asyncActionTypes = createActionTypes([
	'FETCH_WEATHER',
	'FETCH_CITY_WEATHER',
	'FETCH_MULTIPLE_WEATHER',
	'ADD_WEATHER_TO_FAVORITES',
	'REMOVE_WEATHER_FROM_FAVORITES',
	'ADD_NOTE_TO_WEATHER',
	'REMOVE_NOTE_FROM_WEATHER',
], true);

export default {
  ...asyncActionTypes,
};
