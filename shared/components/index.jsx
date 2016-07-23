import React from 'react';
import {browserHistory} from 'react-router';

/* Redux Imports */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions';

/* Components */
import Toolbar from './toolbar.jsx';
import StatusBar from "./statusbar.jsx";
import Drawer from './drawer';

import config from '../config';

@connect(state => ({state}))
export default class AppView extends React.Component {
    static fetchData({query, params, store}) {
        const id = params.id;
        return id === "about" ? store.dispatch(Actions.aboutNav()) : store.dispatch(Actions.getPaste(id));
    }

    componentDidMount = () => {
        window.addEventListener('message', this.handleMessage);
    }

    componentWillReceiveProps = (nextProps) => {
        const cur_path = this.props.state.router;
        const new_path = nextProps.state.router;
        const locState = nextProps.location.state;

        if(new_path === cur_path && cur_path === '/' && locState === 'new') {
            this.props.location.state = "";
            this.props.dispatch(Actions.newPaste());
        }

        if(new_path !== cur_path) {
            browserHistory.push(new_path);
            switch(new_path) {
            case "/":
                if(!nextProps.state.isCopy) {
                    this.props.dispatch(Actions.newPaste());
                }
                break;

            case "/about":
                this.props.dispatch(Actions.aboutNav());
                break;

            default:
                const id = new_path.charAt(0) === "/" ? new_path.substr(1) : new_path;
                this.props.dispatch(Actions.putPaste(id));
                break;
            }
        }
    }

    handleMessage = async (e) => {
        if(e.origin === config.url) {
            const code = e.data.code;
            if(typeof code !== 'undefined') {
                await this.props.dispatch(Actions.setAuthCode(code));
                await this.props.dispatch(Actions.getAuthToken(code));
                await this.props.dispatch(Actions.userLogin());
                await this.props.dispatch(Actions.getPastes());
            }
        }
    }

    render() {
        const {dispatch} = this.props;
        return (
            <div id="app-view">
                <Drawer {...bindActionCreators(Actions, dispatch)} />
                <Toolbar {...bindActionCreators(Actions, dispatch)} />
                <div id="container">
                    <main className="main">
                        {this.props.children}
                    </main>
                    <StatusBar {...bindActionCreators(Actions, dispatch)} />
                </div>
            </div>
		);
    }
}