import React from 'react';
import {renderToString} from 'react-dom/server';
import fs from 'fs';

/* Redux imports */
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../shared/reducers';
import * as Actions from '../shared/actions';

/* Routing imports */
import {RouterContext, match, useRouterHistory} from 'react-router';
import {createMemoryHistory, useQueries} from 'history';
import createRoutes from '../shared/routes';
import createLocation from 'history/lib/createLocation';

/* Koa imports */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import convert from 'koa-convert';
var serve = require('koa-static-folder');

/* Promise imports */
var Promise = require('bluebird');
import promiseMiddleware from '../shared/lib/promiseMiddleware';

var jwt = require('jsonwebtoken');

import config from '../shared/config';

/* init Koa server */
const app = new Koa();
app.use(bodyParser());

/* serve static "assets" and "dist" directories */
app.use(convert(serve('./assets')));
app.use(convert(serve('./dist')));

/* load initial html */
const index = fs.readFileSync('./assets/index.html', {encoding: 'utf-8'});

/* Mount API routes */
const apiRouter = new Router({ prefix: "/api" });
require('./api').default((apiRouter));
app.use(apiRouter.routes());

/* Mount Auth routes */
const authRouter = new Router();
require('./auth').default((authRouter));
app.use(authRouter.routes());

/* Render initial html + state */
app.use(async (ctx, next) => {
    const store = applyMiddleware(promiseMiddleware)(createStore)(rootReducer);

    let history = useRouterHistory(useQueries(createMemoryHistory))();
    let routes = createRoutes(history);
    let location = history.createLocation(ctx.request.url);

    var resolver = Promise.defer();

    // Check for JWT and set user state if token is valid
    let token = await ctx.cookies.get('authtoken');
    var decoded; try {decoded = jwt.verify(token, config.secret)} catch(err) {};
    if(typeof decoded !== 'undefined')
        store.dispatch(Actions.setUser(decoded.login, decoded.avatar_url));

    match({routes, location}, (err, redirectLocation, renderProps) => {
        // initialize initial component with access to redux store
        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        if(err) {
            ctx.body = err.message;
            ctx.status = 500;
        } else if(redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if(renderProps == null) {
            ctx.body = "not found";
            ctx.status = 404;
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
    ctx.body = await resolver.promise;
});

export default app;