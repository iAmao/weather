import { combineReducers } from 'redux';
import city from './city';
import weather from './weather';

function rootReducer() {
  return combineReducers({
    city,
    weather,
  });
};

export default rootReducer;
