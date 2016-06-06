import React from 'react';
import {render} from 'react-dom';

/* Routing imports */
import routes from '../shared/routes';
import {Router, Route, browserHistory} from 'react-router'

/* Redux imports */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../shared/reducers';
import promiseMiddleware from '../shared/lib/promiseMiddleware';

require("./modes"); // include CM modes
require("codemirror/theme/material.css"); // include CM theme

import {} from '../assets/stylesheets/style.less'; // import LESS

const initialState = window.__INITIAL_STATE__;
const store = applyMiddleware(promiseMiddleware)(window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(rootReducer, initialState);

/* Keep router synced in redux state */
import { updateRouter } from '../shared/actions';
browserHistory.listen(router => store.dispatch(updateRouter(router)));

render (
    <Provider store={store}>
        <Router children={routes} history={browserHistory} />
    </Provider>, document.getElementById('react-view')
);