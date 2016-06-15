import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';

/* MDL Components */
import Tooltip from 'react-mdl/lib/Tooltip';
import Button from 'react-mdl/lib/Button';

@connect(state => ({state: state}))
export default class Toolbar extends React.Component {
    savePaste = () => {
        this.props.savePaste(this.props.state.content, this.props.state.mode);
    }

    copyPaste = () => {
        this.props.copyPaste();
    }

    render() {
        return (
            <div id="toolbar">
                <Tooltip label="New Paste" position="right"><div className="toolbar-child">
                    <Link to={{pathname: "/", state: "new"}}>
                        <Button className="icon-note_add mdl-iconbutton" />
                    </Link>
                </div></Tooltip>

                <Tooltip label="Save Paste" position="right"><div className="toolbar-child">
                    <Button className="icon-save mdl-iconbutton"
                        onClick={this.savePaste}
                        disabled={this.props.state.router != '/'}
                    />
                </div></Tooltip>

                <Tooltip label="Duplicate & Edit" position="right"><div className="toolbar-child">
                    <Button className="icon-content_copy mdl-iconbutton"
                        onClick={this.copyPaste}
                        disabled={this.props.state.router == '/'}
                    />
                </div></Tooltip>

                <Tooltip label="View Text" position="right"><div className="toolbar-child">
                    <Link to={"/t" + this.props.state.router}>
                        <Button className="icon-text_format mdl-iconbutton"
                            disabled={this.props.state.router == '/'}
                        />
                    </Link>
                </div></Tooltip>

                <Tooltip label="Link" position="right"><div className="toolbar-child">
                    <Button className="icon-insert_link mdl-iconbutton"
                        disabled={this.props.state.router == '/'}
                    />
                </div></Tooltip>

                <Tooltip label="About" position="right"><div className="toolbar-child">
                    <Link to="/about">
                        <Button className="icon-info_outline mdl-iconbutton" />
                    </Link>
                </div></Tooltip>
            </div>
        );
    }
}