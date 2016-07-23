import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

/* Components */
import App from 'components';
import ViewText from './components/viewtext';
import AuthHandler from "./components/authhandler";
import AuthCallback from "./components/authcallback";
import Editor from "./components/editor";

export default function(history) {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Editor} />
                <Route path="/auth/github" component={AuthHandler} />
                <Route path="/auth/github/callback" component={AuthCallback} />
                <Route path="/(:id)" component={Editor} />
            </Route>
            <Route path="/t/:id" component={ViewText} />
        </Router>
    );
}