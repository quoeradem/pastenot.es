import React from 'react';
import {Route} from 'react-router';

/* Components */
import App from 'components';
import ViewText from './components/viewtext';

export default (
    <Route name="app">
        <Route path="/(:id)" component={App} />
        <Route path="/t/:id" component={ViewText} />
    </Route>
);