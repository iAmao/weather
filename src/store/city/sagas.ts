import { all, call, takeEvery, put } from 'redux-saga/effects';
import queryString from 'query-string';
import actionTypes from './actionTypes';
import weatherActionTypes from '../weather/actionTypes';
import { CustomAxios, createAsyncSaga } from '../util';
import { ActionPayload } from '../types';
import { GenericObject } from '../../types';

export function* fetchCitiesSaga() {
  const Api = new CustomAxios('https://wft-geo-db.p.rapidapi.com/v1');
  Api.setHeader('x-rapidapi-key', process.env.REACT_APP__GEO_API || '');
  Api.setHeader('useQueryString', 'true');
  const asyncSaga = createAsyncSaga(
    actionTypes.FETCH_CITIES__SUCCESS,
    actionTypes.FETCH_CITIES__FAILED,
    action => {
      const { expiresAt = 0, ...query } = action.payload;
      if (expiresAt > 0) {
        return;
      }
      const uri = `/geo/cities?${queryString.stringify(query)}`;
      return call(Api.get, uri);
    },
  );
  yield takeEvery(actionTypes.FETCH_CITIES__PENDING, asyncSaga);
};

export function* dispatchBulkCityWeatherSaga() {
  yield takeEvery(actionTypes.FETCH_CITIES__SUCCESS, function* (action: ActionPayload) {
    if (action.payload.response) {
      const names = action.payload.response.data.reduce((acc: GenericObject<number>, city: any) => {
        acc[city.name] = city.id
        return acc;
      }, {});
      yield put({
        type: weatherActionTypes.FETCH_MULTIPLE_WEATHER__PENDING,
        payload: {
          query: Object.keys(names),
          nameToId: names,
        },
      });
    }
  });
}

export function* fetchCityByCoordinates() {
  const Api = new CustomAxios('http://api.positionstack.com/v1');
  const asyncSaga = createAsyncSaga(
    actionTypes.FETCH_CITY_FROM_COORD__SUCCESS,
    actionTypes.FETCH_CITY_FROM_COORD__FAILED,
    action => {
      const { position: { latitude, longitude } } = action.payload;
      const query = {
        access_key: process.env.REACT_APP__COORD_API || '',
      };
      const pos = `query=${latitude.toPrecision(6)},${longitude.toPrecision(6)}`;
      const uri = `/reverse?${queryString.stringify(query)}&${pos}`;
      return call(Api.get, uri);
    }
  );

  yield takeEvery(actionTypes.FETCH_CITY_FROM_COORD__PENDING, asyncSaga);
}

export default function* citySagas() {
  yield all([
  	fetchCitiesSaga(),
    dispatchBulkCityWeatherSaga(),
    fetchCityByCoordinates(),
  ]);
};
