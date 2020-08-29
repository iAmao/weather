import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from './sagas';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers())

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga);

  // @ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // @ts-ignore
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
}
