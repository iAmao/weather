import { createActionTypes } from '../util';

const asyncActionTypes = createActionTypes(['FETCH_CITIES'], true);
const syncActionTypes = createActionTypes(['REMOVE_CITY']);
export default {
  ...asyncActionTypes,
  ...syncActionTypes,
};
