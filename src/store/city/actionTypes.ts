import { createActionTypes } from '../util';

const asyncActionTypes = createActionTypes([
	'FETCH_CITIES',
	'FETCH_CITY_FROM_COORD'
], true);
const syncActionTypes = createActionTypes(['REMOVE_CITY']);
export default {
  ...asyncActionTypes,
  ...syncActionTypes,
};
