import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import { polyfill } from 'es6-promise'

import Demo from './demo.jsx'
import rootReducers from '../reducer/index.js'
import '../mocks/demo.js'

polyfill();

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(...middlewares)));
const Root = () => {
  return (
    <Provider store={store}>
      <Demo />
    </Provider>
  )
};

ReactDOM.render(<Root />, document.querySelector('#main'));
