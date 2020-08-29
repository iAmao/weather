import addDays from 'date-fns/addDays';
import getTime from 'date-fns/getTime'
import actionTypes from './actionTypes';
import initialCityState, { CityState, City } from './initialState';
import {
  wrapReducer,
  normalizeByKey,
  getAllKeysValue,
  sortResponseData,
} from '../util';

const cityReducer = wrapReducer<CityState>(
  {
    [actionTypes.FETCH_CITIES__PENDING]: draft => {
      draft.loading = true;
    },
    [actionTypes.FETCH_CITIES__SUCCESS]: (draft, { response }) => {
    	draft.loading = false;
      if (response && Array.isArray(response.data)) {
        const sortedData = sortResponseData(response.data, 'name', 'asc');
        draft.sortedPks = getAllKeysValue(sortedData, 'id');
        draft.cities = normalizeByKey<City>(sortedData, 'id');
        draft.expiresAt = getTime(addDays(new Date(), 1));
      }
    },
  },
  initialCityState,
);

export default cityReducer;

