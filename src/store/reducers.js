import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import nodes from './syncReducers/nodes';
import claims from './syncReducers/claim';
import accumulators from './syncReducers/accumulator';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    nodes,
    claims,
    accumulators,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
