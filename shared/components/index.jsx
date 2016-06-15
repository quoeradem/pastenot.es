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
        let cur_path = this.props.state.router;
        let new_path = nextProps.state.router;
        let locState = nextProps.location.state;

        if(new_path != cur_path) {
            browserHistory.push(new_path);
            switch(new_path) {
                case "/":
                    if(!nextProps.state.isCopy)
                        this.props.dispatch(Actions.newPaste());
                    break;

                case "/about":
                    this.props.dispatch(Actions.aboutNav());
                    break;

                default:
                    let id = new_path.substr(1);
                    this.props.dispatch(Actions.getPaste(id));
                    break;
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