import { all, call, takeEvery, put } from 'redux-saga/effects';
import getTime from 'date-fns/getTime'
import queryString from 'query-string';
import actionTypes from './actionTypes';
import cityActionTypes from '../city/actionTypes';
import { CustomAxios, createAsyncSaga } from '../util';
import { GenericObject } from '../../types';

export function* fetchMultiplWeather() {
  const Api = new CustomAxios('http://api.weatherstack.com');
  const asyncSaga = createAsyncSaga(
    actionTypes.FETCH_MULTIPLE_WEATHER__SUCCESS,
    actionTypes.FETCH_MULTIPLE_WEATHER__FAILED,
    function ({ payload }) {
      const [city, ...remainders] = payload.query;
      const query: GenericObject<string> = {
        access_key: '4a4cfb561bf6af41a7f8b058bd783046',
        query: city,
      };

      const uri = `/current?${queryString.stringify(query)}`;
      return call(Api.get, uri);
    },
  );

  yield takeEvery(actionTypes.FETCH_MULTIPLE_WEATHER__PENDING, asyncSaga);
};

export function* fetchMultipleSuccessSaga() {
  function* successAsyncSagaHandler ({ payload, pendingPayload }: any) {
    const { query, nameToId } = pendingPayload;
    if (query.length > 1) {
      const [first, ...rest] = query;
      yield put({
        type: actionTypes.FETCH_MULTIPLE_WEATHER__PENDING,
        payload: {
          query: rest,
          nameToId,
        },
      });
    }
  }
  yield takeEvery(actionTypes.FETCH_MULTIPLE_WEATHER__SUCCESS, successAsyncSagaHandler);
}

export function* fetchWeatherSaga() {
  const Api = new CustomAxios('http://api.weatherstack.com/');
  const asyncSaga = createAsyncSaga(
    actionTypes.FETCH_CITY_WEATHER__SUCCESS,
    actionTypes.FETCH_CITY_WEATHER__FAILED,
    ({ payload }) => {
      const time = getTime(new Date());

      if (!payload.expiresAfter || time > payload.expiresAfter) {
        const query: GenericObject<string> = {
          access_key: '4a4cfb561bf6af41a7f8b058bd783046',
          query: payload.query,
        };
        const uri = `/current?${queryString.stringify(query)}`;
        return call(Api.get, uri);
      }
      return;
    },
  );
  yield takeEvery(actionTypes.FETCH_CITY_WEATHER__PENDING, asyncSaga);
}

export function* addWeatherToFavoritesSaga () {
  const Api = new CustomAxios('http://api.weatherstack.com/');
  const asyncSaga = createAsyncSaga(
    actionTypes.ADD_WEATHER_TO_FAVORITES__SUCCESS,
    actionTypes.ADD_WEATHER_TO_FAVORITES__FAILED,
    ({ payload }) => {
      const query: GenericObject<string> = {
        access_key: '4a4cfb561bf6af41a7f8b058bd783046',
        query: payload.key,
      };
      const uri = `/current?${queryString.stringify(query)}`;
      return call(Api.get, uri);
    },
  );
  yield takeEvery(actionTypes.ADD_WEATHER_TO_FAVORITES__PENDING, asyncSaga);
}

export default function* citySagas() {
  yield all([
    fetchMultiplWeather(),
    fetchMultipleSuccessSaga(),
    fetchWeatherSaga(),
    addWeatherToFavoritesSaga(),
  ]);
};
