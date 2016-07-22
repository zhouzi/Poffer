import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers/index';

function configureStore (initialState = {}) {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}

export default configureStore;
