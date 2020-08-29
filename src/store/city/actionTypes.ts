import { createActionTypes } from '../util';

const asyncActionTypes = createActionTypes(['FETCH_CITIES'], true);

export default {
  ...asyncActionTypes,
};
