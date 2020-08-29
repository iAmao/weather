import { combineReducers } from 'redux';
import city from './city';

function rootReducer() {
  return combineReducers({
    city,
  });
};

export default rootReducer;
