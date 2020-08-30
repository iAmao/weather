import { all } from 'redux-saga/effects';
import city from './city/sagas';
import weather from './weather/sagas';

export default function* rootSaga() {
  yield all([
    city(),
    weather(),
  ]);
}
