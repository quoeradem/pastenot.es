import React from 'react';
import {render} from 'react-dom';

/* Routing imports */
import createRoutes from '../shared/routes';
import {browserHistory} from 'react-router'

/* Redux imports */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../shared/reducers';
import promiseMiddleware from '../shared/lib/promiseMiddleware';

require("./modes"); // include CM modes

/* CM addons */
require('codemirror/addon/scroll/simplescrollbars.js');
require('../assets/stylesheets/vendor/simplescrollbars.css');

require('codemirror/addon/selection/active-line.js');

import {} from '../assets/stylesheets/style.less'; // import LESS

const initialState = window.__INITIAL_STATE__;
const store = applyMiddleware(promiseMiddleware)(window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(rootReducer, initialState);

render (
    <Provider store={store}>
        { createRoutes(browserHistory) }
    </Provider>, document.getElementById('react-view')
);

/* Keep router synced in redux state */
import { updateRouter } from '../shared/actions';
browserHistory.listen(router => store.dispatch(updateRouter(router)));