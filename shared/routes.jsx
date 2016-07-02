import React from 'react';
import {Router,Route} from 'react-router';

/* Components */
import App from 'components';
import ViewText from './components/viewtext';
import AuthHandler from "./components/authhandler";
import AuthCallback from "./components/authcallback";

export default function(history) {
    return(
        <Router history={history}>
            <Route path="/(:id)" component={App}>
                <Route path="/auth/github" component={AuthHandler} />
                <Route path="/auth/github/callback" component={AuthCallback} />
            </Route>
            <Route path="/t/:id" component={ViewText} />
        </Router>
    );
}