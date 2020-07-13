import { combineReducers, createStore } from 'redux';

import { pageReducer } from 'state/reducers';

const rootReducer = combineReducers({
  page: pageReducer
});

export const store = createStore(rootReducer);