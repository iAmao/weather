import addDays from 'date-fns/addDays';
import getTime from 'date-fns/getTime'
import actionTypes from './actionTypes';
import weatherActionTypes from '../weather/actionTypes';
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
      console.log(response);
    	draft.loading = false;
      if (response && Array.isArray(response.data)) {
        const sortedData = sortResponseData(response.data, 'name', 'asc');
        draft.sortedPks = getAllKeysValue(sortedData, 'id');
        draft.cities = normalizeByKey<City>(sortedData, 'id');
        draft.expiresAt = getTime(addDays(new Date(), 1));
      }
    },
    [actionTypes.REMOVE_CITY]: (draft, payload) => {
      // @ts-ignore
      delete draft.cities[payload.id];
      draft.sortedPks = draft.sortedPks.filter((pk) => Number(pk) !== Number(payload.id));
    },
    [weatherActionTypes.FETCH_MULTIPLE_WEATHER__SUCCESS]: (
      draft,
      { response },
      pendingPayload
    ) => {
      if (pendingPayload && response && response.location) {
        const { nameToId, query } = pendingPayload;
        const id = nameToId[query[0]];
        if (draft.cities[id]) {
          draft.cities[id].weather = response.current;
        }
      }
    },
  },
  initialCityState,
);

export default cityReducer;

