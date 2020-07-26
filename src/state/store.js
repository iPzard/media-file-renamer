import * as reducerModules from 'state/reducers';

import { combineReducers, createStore } from 'redux';

/**
 * @namespace Redux
 * @description - Redux related data and logic.
 */

const reducers = {};
for(let reducer in reducerModules) {
  reducers[reducerModules[reducer].stateName] = reducerModules[reducer]
}

const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer);