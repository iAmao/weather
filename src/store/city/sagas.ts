import { all, call, takeEvery, put } from 'redux-saga/effects';
import queryString from 'query-string';
import actionTypes from './actionTypes';
import { CustomAxios, createAsyncSaga } from '../util';

export function* fetchCitiesSaga() {
  const Api = new CustomAxios('https://wft-geo-db.p.rapidapi.com/v1');
  Api.setHeader('x-rapidapi-key', '5d9166b6c0msh2923d5063dabc5fp169609jsn5e4f4080ac1d');
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

export default function* citySagas() {
  yield all([
  	fetchCitiesSaga(),
  ]);
};
