import { all } from 'redux-saga/effects';
import city from './city/sagas';

export default function* rootSaga() {
  yield all([
    city(),
  ]);
}
