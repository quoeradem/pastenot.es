import React from 'react';
import {Router,Route} from 'react-router';

/* Components */
import App from 'components';
import ViewText from './components/viewtext';

export default function(history) {
    return(
        <Router history={history}>
            <Route path="/(:id)" component={App} />
            <Route path="/t/:id" component={ViewText} />
        </Router>
    );
}