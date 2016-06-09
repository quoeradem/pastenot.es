import React from 'react';
import {renderToString} from 'react-dom/server';
import fs from 'fs';

/* Redux imports */
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../shared/reducers';
import * as Actions from '../shared/actions';

/* Routing imports */
import {RouterContext, match} from 'react-router';
import routes from '../shared/routes';
import createLocation from 'history/lib/createLocation';

/* Koa imports */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
var serve = require('koa-static-folder');

/* Promise imports */
var Promise = require('bluebird');
import promiseMiddleware from '../shared/lib/promiseMiddleware';

import config from '../shared/config';

/* init Koa server */
const app = Koa();
app.use(bodyParser());

/* serve static "assets" and "dist" directories */
app.use(serve('./assets'));
app.use(serve('./dist'));

/* load initial html */
const index = fs.readFileSync('./assets/index.html', {encoding: 'utf-8'});

/* Mount API routes */
const apiRouter = new Router({ prefix: "/api" });
require('./api').default((apiRouter));
app.use(apiRouter.routes());

/* Render initial html + state */
app.use(function *() {
    const store = applyMiddleware(promiseMiddleware)(createStore)(rootReducer);
    const location = createLocation(this.request.url);

    var resolver = Promise.defer();

    match({routes, location}, (err, redirectLocation, renderProps) => {
        // initialize initial component with access to redux store
        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        if(err) {
            this.status = 500;
            this.body = err.message;
        } else if(redirectLocation) {
            this.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if(renderProps == null) {
            this.status = 404;
            this.body = "not found";
        } else {
            getReduxPromise().then(() => {
                let markup = renderToString(InitialComponent);
                let initialState = JSON.stringify(store.getState())
                    .replace(/<\/script/g, '<\\/script')
                    .replace(/<!--/g, '<\\!--');

                let html = index.replace('${markup}', markup)
                    .replace('${initialState}', initialState)
                    .replace('${config}', JSON.stringify(config));
                resolver.resolve(html);
            });

            function getReduxPromise() {
                let {query, params} = renderProps;
                let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
                let promise = comp.fetchData ?
                    comp.fetchData({query, params, store}) :
                    Promise.resolve();

                return promise;
            }
	    }
    });
    this.body = yield resolver.promise;
});

export default app;