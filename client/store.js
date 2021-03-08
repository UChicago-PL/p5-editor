import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { clearState, loadState } from './persistState';

export default function configureStore(initialState) {
  const enhancers = [applyMiddleware(thunk)];

  const savedState = loadState();
  clearState();

  const store = createStore(
    rootReducer,
    savedState != null ? savedState : initialState,
    compose(...enhancers)
  );

  return store;
}
