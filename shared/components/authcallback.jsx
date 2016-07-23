import React from 'react';
import {connect} from 'react-redux';

import config from '../config';

@connect(state => ({state}))
export default class AuthCallback extends React.Component {
    componentDidMount = () => {
        const code = this.props.location.query.code;

        // Send auth code to parent window and close current window.
        window.opener.postMessage({code}, config.url);
        window.close();
    }

    render() {
        return null;
    }
}