import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Main from './containers/Main';
import { unit, address, location, masking, currentWeather, weatherForm, forecast } from './states/weather-reducers';
import { todoForm, todo, filterMode, project } from './states/todo-reducers';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function () {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        unit, address, location, masking,
        currentWeather, weatherForm, forecast,
        todoForm, todo, filterMode, project,
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));

    ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>,
        document.getElementById('root')
    );
};
