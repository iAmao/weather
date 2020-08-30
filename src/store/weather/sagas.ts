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
      const [city] = payload.query;
      const query: GenericObject<string> = {
        access_key: process.env.REACT_APP__WEATHER_API || '',
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
          lastQuery: first,
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
          access_key: process.env.REACT_APP__WEATHER_API || '',
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
        access_key: process.env.REACT_APP__WEATHER_API || '',
        query: payload.key,
      };
      const uri = `/current?${queryString.stringify(query)}`;
      return call(Api.get, uri);
    },
  );
  yield takeEvery(actionTypes.ADD_WEATHER_TO_FAVORITES__PENDING, asyncSaga);
}

export function* updateCityWeatherPoster() {
  yield takeEvery(
    actionTypes.ADD_WEATHER_TO_FAVORITES__SUCCESS,
    function* ({ payload, pendingPayload }: any) {
      if (payload.response) {
        const { name, country } = payload.response.location;
        yield put({
          type: actionTypes.FETCH_CITY_POSTER__PENDING,
          payload: {
            key: pendingPayload.key,
            query: `${name},${country},city`,
          }
        });
      }
  });
}

export function* fetchCityPosterSaga() {
  const Api = new CustomAxios('https://pixabay.com/api');
  const asyncSaga = createAsyncSaga(
    actionTypes.FETCH_CITY_POSTER__SUCCESS,
    actionTypes.FETCH_CITY_POSTER__FAILED,
    ({ payload }) => {
      const query: GenericObject<string> = {
        q: payload.query,
        page: '1',
        key: process.env.REACT_APP__IMG_API || '',
        image_type: 'photo',
      };
      const uri = `/?${queryString.stringify(query)}`;
      return call(Api.get, uri);
    },
  );
  yield takeEvery(
    actionTypes.FETCH_CITY_POSTER__PENDING,
    asyncSaga,
  );
}

export function* fetchCurrentCityWeatherSaga() {
  const Api = new CustomAxios('http://api.weatherstack.com/');
  const asyncSaga = createAsyncSaga(
    actionTypes.UPDATE_CURRENT_CITY_WEATHER__SUCCESS,
    actionTypes.UPDATE_CURRENT_CITY_WEATHER__FAILED,
    ({ payload }) => {
      const { response } = payload;
      if (response && response.data) {
        const query: GenericObject<string> = {
          access_key: process.env.REACT_APP__WEATHER_API || '',
          query: response.data[0].label,
        };
        const uri = `/current?${queryString.stringify(query)}`;
        return call(Api.get, uri);
      }
      return;
    },
  );
  yield takeEvery(
    cityActionTypes.FETCH_CITY_FROM_COORD__SUCCESS,
    asyncSaga,
  );
}

export function* fetchCurrentCityPosterSaga() {
  yield takeEvery(actionTypes.UPDATE_CURRENT_CITY_WEATHER__SUCCESS, function* ({ payload }: any) {
    if (payload.response && payload.response.location) {
      yield put({
        type: actionTypes.FETCH_CITY_POSTER__PENDING,
        payload: {
          isCurrent: true,
          query: `${payload.response.location.region}, ${payload.response.location.country}, city`,
        }
      });
    }
  });
}

export default function* citySagas() {
  yield all([
    fetchMultiplWeather(),
    fetchMultipleSuccessSaga(),
    fetchWeatherSaga(),
    addWeatherToFavoritesSaga(),
    updateCityWeatherPoster(),
    fetchCityPosterSaga(),
    fetchCurrentCityWeatherSaga(),
    fetchCurrentCityPosterSaga(),
  ]);
};
