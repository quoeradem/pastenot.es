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

    toggleDrawer = () => {
        this.props.toggleDrawer();
    }

    render() {
        return (
            <div id="toolbar">
                <Tooltip label="Toggle Sidebar" position="right"><div className="toolbar-child">
                    <Button className="mdl-iconbutton" onClick={this.toggleDrawer}><i className="material-icons">menu</i></Button>
                </div></Tooltip>

                <Tooltip label="New Paste" position="right"><div className="toolbar-child">
                    <Link to={{pathname: "/", state: "new"}}>
                        <Button className="mdl-iconbutton"><i className="material-icons">note_add</i></Button>
                    </Link>
                </div></Tooltip>

                <Tooltip label="Save Paste" position="right"><div className="toolbar-child">
                    <Button className="mdl-iconbutton"
                        onClick={this.savePaste}
                        disabled={this.props.state.router != '/'}
                    ><i className="material-icons">save</i></Button>
                </div></Tooltip>

                <Tooltip label="Duplicate & Edit" position="right"><div className="toolbar-child">
                    <Button className="mdl-iconbutton"
                        onClick={this.copyPaste}
                        disabled={this.props.state.router == '/'}
                    ><i className="material-icons">content_copy</i></Button>
                </div></Tooltip>

                <Tooltip label="View Text" position="right"><div className="toolbar-child">
                        <Button className="mdl-iconbutton"
                            disabled={this.props.state.router == '/'}>
                        <Link to={"/t" + this.props.state.router} />
                        <i className="material-icons">text_format</i></Button>

                </div></Tooltip>

                <Tooltip label="About" position="right"><div className="toolbar-child">
                    <Link to="/about">
                        <Button className="mdl-iconbutton">
                            <i className="material-icons">info_outline</i>
                        </Button>
                    </Link>
                </div></Tooltip>

            <Tooltip label={this.props.state.user.login === '' ? "Login" : "Logout"} position="right"><div className="toolbar-child">
                    <Link to={{pathname: "/auth/github", state: this.props.state.user.login === '' ? "login" : "logout"}}>
                        <Button className="mdl-iconbutton">
                            <i className="material-icons">exit_to_app</i>
                        </Button>
                    </Link>
                </div></Tooltip>
            </div>
        );
    }
}