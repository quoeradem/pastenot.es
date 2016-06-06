import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

/* MDL Components */
import Tooltip from 'react-mdl/lib/Tooltip';
import Button from 'react-mdl/lib/Button';

@connect(state => ({state: state}))
export default class Toolbar extends React.Component {
    newPaste = () => {
        this.props.newPaste();
    }

    savePaste = () => {
        this.props.savePaste(this.props.state.content, this.props.state.mode);
    }

    copyPaste = () => {
        this.props.copyPaste();
    }

    handleAbout = () => {
        this.props.aboutNav();
    }

    viewText = () => {
        browserHistory.push("/t" + this.props.state.location);
    }

    render() {
        return (
            <div id="toolbar">
                <Tooltip label="New Paste" position="right"><div className="toolbar-child">
                    <Button className="icon-note_add mdl-iconbutton"
                        onClick={this.newPaste} />
                </div></Tooltip>

                <Tooltip label="Save Paste" position="right"><div className="toolbar-child">
                    <Button className="icon-save mdl-iconbutton"
                        onClick={this.savePaste}
                        disabled={this.props.state.location != '/'} />
                </div></Tooltip>

                <Tooltip label="Duplicate & Edit" position="right"><div className="toolbar-child">
                    <Button className="icon-content_copy mdl-iconbutton"
                        onClick={this.copyPaste}
                        disabled={this.props.state.location == '/'} />
                </div></Tooltip>

                <Tooltip label="View Text" position="right"><div className="toolbar-child">
                    <Button className="icon-text_format mdl-iconbutton"
                        disabled={this.props.state.location == '/'}
                        onClick={this.viewText} />
                </div></Tooltip>

                <Tooltip label="Link" position="right"><div className="toolbar-child">
                    <Button className="icon-insert_link mdl-iconbutton"
                        disabled={this.props.state.location == '/'} />
                </div></Tooltip>

                <Tooltip label="About" position="right"><div className="toolbar-child">
                    <Button className="icon-info_outline mdl-iconbutton"
                        onClick={this.handleAbout} />
                </div></Tooltip>
            </div>
        );
    }
}