import addHours from 'date-fns/addHours';
import getTime from 'date-fns/getTime'
import actionTypes from './actionTypes';
import initialWeatherState from './initialState';
import { WeatherState } from './types';
import {
  wrapReducer,
  normalizeByKey,
  getAllKeysValue,
  sortResponseData,
} from '../util';

const weatherReducer = wrapReducer<WeatherState>(
  {
    [actionTypes.FETCH_CITY_WEATHER__PENDING]: draft => {
      draft.loading = true;
    },
    [actionTypes.FETCH_CITY_WEATHER__SUCCESS]: (draft, { response }, pendingPayload) => {
      draft.loading = false;
      if (pendingPayload) {
        const { query } = pendingPayload;
        draft.weather[query] = response;
        draft.weather[query].note = '';
        draft.weather[query].isFavorite = false;
        draft.weather[query].expiresAfter = getTime(addHours(new Date(), 3));
      }
    },
    [actionTypes.ADD_WEATHER_TO_FAVORITES__SUCCESS]: (draft, { response }, pendingPayload) => {
      draft.loading = false;
      if (pendingPayload) {
        const { key } = pendingPayload;
        draft.weather[key] = {
          ...draft.weather[key],
          ...response
        };

        draft.weather[key].isFavorite = true;
        if (Array.isArray(draft.favourites) && !draft.favourites.includes(key)) {
          draft.favourites.push(key);
        } else {
          draft.favourites = [key]
        }
      }
    },
    [actionTypes.REMOVE_WEATHER_FROM_FAVORITES]: (draft, payload) => {
      draft.favourites = draft.favourites.filter(f => f !== payload.key);
      draft.weather[payload.key as string].isFavorite = false;
    },
    [actionTypes.ADD_NOTE_TO_WEATHER]: (draft, { key, content }) => {
      if (draft.weather[key]) {
        draft.weather[key].note = content;
      }
      // TODO: LOG ERROR
    },
    [actionTypes.REMOVE_NOTE_FROM_WEATHER]: (draft, { key }) => {
      if (draft.weather[key]) {
        draft.weather[key].note = '';
      }
    }
  },
  initialWeatherState,
);

export default weatherReducer;

