import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';

@connect(state => ({state: state}))
export default class ViewText extends React.Component {
    static fetchData({query, params, store}) {
        let id = params.id;
        return id === "about" ? store.dispatch(Actions.aboutNav()) : store.dispatch(Actions.getPaste(id));
    }

    render() {
        return (
            <div id="viewtext">{this.props.state.content}</div>
        );
    }
}