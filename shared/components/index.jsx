import React from 'react';
import {browserHistory} from 'react-router';

/* Redux Imports */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions';

/* Components */
import Toolbar from './toolbar.jsx';
import StatusBar from "./statusbar.jsx";
import Editor from './editor.jsx';

@connect(state => ({state: state}))
export default class AppView extends React.Component {
    static fetchData({query, params, store}) {
        let id = params.id;
        return id === "about" ? store.dispatch(Actions.aboutNav()) : store.dispatch(Actions.getPaste(id));
    }

    componentWillReceiveProps = (nextProps) => {
        // update URL when "location" state changes
        let curPath = this.props.state.location
        let newPath = nextProps.state.location;

        // FIXME: this.props.history is deprecated :: http://tiny.cc/router-contextchanges
        if(newPath != curPath) this.props.history.push(newPath);

        // update redux state when route changes -- i.e. back button
        let newRoute = nextProps.state.router;
        if(curPath != newRoute) {
            let id = newRoute.substr(1);
            if(newRoute === "/") {
                this.props.dispatch(Actions.newPaste());
            } else if(id === "about") {
                this.props.dispatch(Actions.aboutNav());
            } else {
                this.props.dispatch(Actions.getPaste(id));
            }
        }
    }

	render() {
        const { state, dispatch } = this.props;
		return (
			<div id="app-view">
				<Toolbar {...bindActionCreators(Actions, dispatch)} />
                <div id="container">
                     <main className="main">
                    <Editor {...bindActionCreators(Actions, dispatch)} />
                    </main>
                    <StatusBar {...bindActionCreators(Actions, dispatch)} />
                </div>
			</div>
		);
	}
}