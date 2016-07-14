import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as Actions from '../actions';

import cookie from 'react-cookie';

import config from '../config';

@connect(state => ({state: state}))
export default class AuthHandler extends React.Component {
    // TODO: use componentwillmount instead?
    componentDidMount = async () => {
        if(this.props.location.state === 'logout') {
            // initiate logout -- invalid JWT --- remove cookie --- reset user state --- etc
            // FIXME: add identifier so state isn't lost upon URL change to "/"?
            await cookie.remove('authtoken');
            this.props.dispatch(Actions.userLogout());
            return browserHistory.replace("/");
        }

        /* Request user profile using JWT cookie :
           returns either valid 'profile' object or 'error' object */
        let profile = await fetch("/auth/verify", {
            credentials: 'include',
            method: 'GET'
        }).then((response) => {return response.json()});

        // 'error' object not returned, dispatch redux action to store profile information
        if(!profile.hasOwnProperty('error')) {
            this.props.dispatch(Actions.setUser(profile.login, profile.avatar_url));
            browserHistory.replace("/");
        } else { // JWT not valid, initiate OAUTH2 process
            const response_type = "?response_type=code"
            const client_id = "&client_id=" + encodeURIComponent(config.auth.clientID);
            const redirect_uri = "&redirect_uri=" + encodeURIComponent(config.auth.callbackURL);

            let query = response_type + client_id + redirect_uri;
            window.open("https://github.com/login/oauth/authorize" + query, "Login with GitHub", "height=600, width=450");
            return browserHistory.replace("/");
        }
    }

    render() {return null}
}
