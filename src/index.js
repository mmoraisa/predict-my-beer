import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root'
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../src/reducers/predictReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './index.css';

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
