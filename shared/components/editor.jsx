import React from 'react';
import {connect} from 'react-redux';

var Codemirror = require('react-codemirror');
import config from '../config';

@connect(state => ({readOnly: state.readOnly, mode: state.mode, content: state.content}))
export default class Editor extends React.Component {

    /* Sync content to redux state when CM loses focus */
    handleFocusChange = (focus) => {
        if(!focus) {
            let content = this.refs.editor.getCodeMirror().getValue();
            let lines = this.refs.editor.getCodeMirror().doc.lineCount();
            if(content != this.props.content) {
                this.props.setContent(content);
                this.props.setLineCount(lines);
            }
        }
    }

    render() {
        let options = {
            lineNumbers: true,
            theme: config.editor.theme,
            readOnly: this.props.readOnly,
            indentUnit: config.editor.indent,
            mode: this.props.mode,
            cursorHeight: !this.props.readOnly,
            styleActiveLine: true,
            scrollbarStyle: "overlay"
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