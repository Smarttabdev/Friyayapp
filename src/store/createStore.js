import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from '../reducers';

import { batchStoreEnhancer, batchMiddleware } from 'redux-batch-enhancer';
import createCableMiddleware from 'Lib/action_cable/redux_middleware';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    sagaMiddleware,
    createCableMiddleware(),
    batchMiddleware,
    thunk
  ];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [batchStoreEnhancer];
  if (typeof __DEV__ != 'undefined' && __DEV__) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );

  store.asyncReducers = {};

  sagaMiddleware.run(saga);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
