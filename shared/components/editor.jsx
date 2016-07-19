import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import * as Actions from '../actions';
import {bindActionCreators} from 'redux';

var Codemirror = require('react-codemirror');
import config from '../config';

@connect(state => ({readOnly: state.readOnly, mode: state.mode, content: state.content, isWrapped: state.isWrapped}),
    dispatch => bindActionCreators(Actions, dispatch))
export default class Editor extends React.Component {

    /* Sync content to redux state when CM loses focus */
    handleFocusChange = (focus) => {if(!focus) this.syncContent()}

    syncContent = () => {
        let content = this.refs.editor.getCodeMirror().getValue();
        if(content != this.props.content) {
            this.props.setContent(content);
            this.props.setLineCount(this.refs.editor.getCodeMirror().doc.lineCount());
        }
    }

    render() {
        const extraKeys = {
            "Ctrl": (cm) => this.syncContent(),
            "Ctrl-N": (cm) => this.props.newPaste(),
            "Ctrl-S": (cm) => this.props.savePaste(this.props.state.content, this.props.state.mode),
            "Ctrl-D": (cm) => this.props.copyPaste(),
            "Ctrl-T": (cm) => this.props.toggleDrawer(),
            "Ctrl-P": (cm) => this.props.toggleMenu(),
            "Ctrl-Shift-R": (cm) => browserHistory.push("/t" + this.props.state.router),
        };
        let options = {
            lineNumbers: true,
            theme: config.editor.theme,
            readOnly: this.props.readOnly,
            indentUnit: config.editor.indent,
            mode: this.props.mode,
            cursorHeight: !this.props.readOnly,
            styleActiveLine: true,
            scrollbarStyle: "overlay",
            autofocus: true,
            extraKeys: extraKeys,
            lineWrapping: this.props.isWrapped,
        };
        return (
            <Codemirror ref="editor"
                value={this.props.content}
                options={options}
                onFocusChange={this.handleFocusChange}
            />
        );
    }
}