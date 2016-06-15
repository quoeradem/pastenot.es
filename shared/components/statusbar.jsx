import React from 'react';
import {connect} from 'react-redux';

/* MDL Components */
import {Dialog} from 'react-mdl/lib/Dialog';
import {List, ListItem} from 'react-mdl/lib/List';
import Snackbar from 'react-mdl/lib/Snackbar';

import CopyToClipboard from 'react-copy-to-clipboard';

import config from '../config';

const modes = [
    { _index: 0,    label: "Plain Text",            mode: "" },
    { _index: 1,    label: "C",                     mode: "text/x-csrc" },
    { _index: 2,    label: "C++",                   mode: "text/x-c++src" },
    { _index: 3,    label: "CMake",                 mode: "text/x-cmake" },
    { _index: 4,    label: "CoffeeScript",          mode: "text/x-coffeescript" },
    { _index: 5,    label: "Configuration (ini)",   mode: "text/x-ini " },
    { _index: 6,    label: "CSS",                   mode: "text/css" },
    { _index: 7,    label: "Diff",                  mode: "text/x-diff" },
    { _index: 8,    label: "Github Markdown",       mode: "text/x-gfm" },
    { _index: 9,    label: "HTML",                  mode: "text/html" },
    { _index: 10,   label: "HTTP",                  mode: "message/http" },
    { _index: 11,   label: "JavaScript",            mode: "text/javascript" },
    { _index: 12,   label: "JavaScript (JSX)",      mode: "text/jsx" },
    { _index: 13,   label: "JSON",                  mode: "application/json" },
    { _index: 14,   label: "LESS",                  mode: "text/x-less" },
    { _index: 15,   label: "Mathematica",           mode: "text/x-mathematica" },
    { _index: 16,   label: "MySQL",                 mode: "text/x-mysql" },
    { _index: 17,   label: "Objective-C",           mode: "text/x-objectivec" },
    { _index: 18,   label: "Perl",                  mode: "text/x-perl" },
    { _index: 19,   label: "PHP",                   mode: "text/x-php" },
    { _index: 20,   label: "Python",                mode: "text/x-python" },
    { _index: 21,   label: "Ruby",                  mode: "text/x-ruby" },
    { _index: 22,   label: "Sass",                  mode: "text/x-sass" },
    { _index: 23,   label: "SCSS",                  mode: "text/x-scss" },
    { _index: 24,   label: "Shell Script",          mode: "text/x-sh" },
    { _index: 25,   label: "SQL",                   mode: "text/x-sql" },
    { _index: 26,   label: "Swift",                 mode: "text/x-swift" },
    { _index: 27,   label: "YAML",                  mode: "text/x-yaml" },
];

@connect(state => ({mode: state.mode, router: state.router, chars: state.meta.chars, lines: state.meta.lines, views: state.meta.views}))
export default class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            children: [],
            value: "",
            snackbarIsActive: false,
        };
    }

    handleListClick = (e) => {
        let i = e.target.getAttribute('data-index');
        this.props.setMode(modes[i].mode);

        // close dialog now.
        this.closeDialog();
    }

    openDialog = (e) => {
        this.populate(modes);
        this.setState({open: true});
    }

    handleInput = (e) => {
        this.setState({value: e.target.value});

        var m = modes.filter(function(arr) {
            return arr.label.indexOf(e.target.value) !== -1;
        });

        this.populate(m);
    }

    populate = (arr) => {
        let _this = this;
        this.setState({children: arr.map(function(arr) {
            return <li className="mdl-list__item" key={arr._index} data-index={arr._index} onClick={_this.handleListClick}>{arr.label}</li>;})
        });
    }

    closeDialog = () => {
        this.setState({open: false, value: ""});
    }

    handleTimeout = () => {
        this.setState({ snackbarIsActive: false });
    }

	render() {
        const { mode, router, chars, lines, views, dispatch } = this.props;
        let m = modes.find(m => m.mode === mode);

		return (
			<div id="statusbar">
                <div className="sb-child-alt-left"><span id="title">PasteNot.es</span></div>
                <div className="sb-child">
                    <span className="pls-arrow_right_black alt-color" />
                </div>

                <div className="sb-child">
                    <CopyToClipboard text={config.url + router} onCopy={() => this.setState({snackbarIsActive: true })}>
                        <span id="location">{router === "/" ? "New Paste" : router.substr(1)}</span>
                    </CopyToClipboard>
                </div>

                <span className="pls-arrow_right" />

                <div className="justify-end">
                    <div className={router == '/' || router == '/about' ? "hidden" : "status-container"}>
                        <span className='status-label'>{views} views</span>
                        <span className="pls-arrow_left" />
                        <span className='status-label'>{chars} chars</span>
                        <span className="pls-arrow_left" />
                        <span className='status-label'>{lines} lines</span>
                    </div>

                    <span className="pls-arrow_left_black" />
                    <div className="sb-child-alt-right">
                        <span id="mode-label" onClick={this.openDialog}>{m.label}</span>
                    </div>
                </div>

                <Dialog open={this.state.open}>
                    <input onChange={this.handleInput} value={this.state.value} />

                    <div className="child-container">
                        <List>{this.state.children}</List>
                    </div>
                </Dialog>

                <Snackbar active={this.state.snackbarIsActive}
                    onTimeout={this.handleTimeout}>
                    Copied link to clipboard!
                </Snackbar>
			</div>
		);
	}
}