import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const store =
  `${process.env.REACT_APP_NODE_ENV}` === 'development'
    ? createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
    : createStore(rootReducer, applyMiddleware(thunk));

export default store;
