import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import config from '../config';

@connect(state => ({state: state}))
export default class AuthCallback extends React.Component {
    componentDidMount = () => {
        let code = this.props.location.query.code;

        // Send auth code to parent window and close current window.
        window.opener.postMessage({code: code}, config.url);
        window.close();
    }

    render() {return null}
}