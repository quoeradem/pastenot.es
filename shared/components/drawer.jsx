import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Tooltip from 'react-mdl/lib/Tooltip';

var moment = require('moment');

import config from '../config';

/* object mapping Paste 'language' to icon
   TODO: finalize and move somewhere else */
const fileicons = {
    "text/x-csrc"         : "file-icon_c",
    "text/x-c++src"       : "file-icon_cpp",
    "text/x-cmake"        : "file-icon_cmake",
    "text/x-coffeescript" : "file-icon_coffee",
    "text/x-ini"          : "file-icon_config",
    "text/css"            : "file-icon_css",
    "text/x-diff"         : "file-icon_diff",
    "text/x-gfm"          : "file-icon_markdown",
    "text/html"           : "file-icon_html",
    "message/http"        : "file-icon_http",
    "text/javascript"     : "file-icon_js",
    "text/jsx"            : "file-icon_jsx",
    "application/json"    : "file-icon_json",
    "text/x-less"         : "file-icon_less",
    "text/x-mathematica"  : "file-icon_mathematica",
    "text/x-mysql"        : "file-icon_mysql",
    "text/x-objectivec"   : "file-icon_objc",
    "text/x-perl"         : "file-icon_perl",
    "text/x-php"          : "file-icon_php",
    "text/x-python"       : "file-icon_python",
    "text/x-ruby"         : "file-icon_ruby",
    "text/x-sass"         : "file-icon_sass",
    "text/x-scss"         : "file-icon_scss",
    "text/x-sh"           : "file-icon_shell",
    "text/x-sql"          : "file-icon_sql",
    "text/x-swift"        : "file-icon_swift",
    "text/x-yaml"         : "file-icon_yaml",
};

@connect(state => ({state: state}))
export default class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
        };
    }

    componentDidMount = () => this.props.getPastes()

    componentWillReceiveProps = (nextProps) => {
        /* Update list of recent pastes */
        let newPastes = nextProps.state.user.pastes;
        if(this.props.state.user.pastes != newPastes) this.getPastes(newPastes);
    }

    getPastes = async (pastes) => {
        let o = {};
        let _children = [];

        pastes.map((arr, index) => {
            let key = moment(arr.created).format("MMM Do YYYY");
            if(o[key] === undefined) o[key] = [];
            o[key].push(arr);
        });

        for(var date in o) {
            let items = o[date].map((arr, index) => (
                <div className="paste-item" key={index}>
                    <Tooltip label={arr.content} position="right" key={index}>
                        <span>
                            <span className={arr.language ? fileicons[arr.language] : "file-icon_txt"}/>
                            <Link to={arr.id}>{arr.id}</Link>
                        </span>
                    </Tooltip>
                </div>
            ));
            _children.push(<DrawerItem key={date} title={date} children={items} />);
        }
        this.setState({children: _children});
    }

    render() {
        const login = this.props.state.user.login;
        const avatar = this.props.state.user.avatar;
        const totalPastes = this.props.state.user.totalPastes
        const totalViews = this.props.state.user.totalViews
        return(
            <div className={this.props.state.ui.drawer ? "drawer" : "hidden"}>
                <div className="drawer-header">
                    {avatar ? <img className="avatar" src={avatar} /> : null}
                    <div className="userlogin">{login ? login : "You are not logged in..."}</div>
                    {totalPastes ? <div id="userStats">{totalPastes} pastes :: {totalViews} views</div> : null}
                </div>

                <div className="recent-container">
                    <div className="subheading">
                        <span className="file-icon_repo" /><span className="root-item">Recent Pastes</span>
                    </div>
                    {this.state.children}
                    <br /><br /><br /><br /><br /><br />
                </div>
            </div>
        );
    }
}

/* Child component */
class DrawerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            children: this.props.children,
            isOpen: true
        };
    }

    handleClick = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() { return(
        <div>
            <div className="paste-item paste-group" onClick={this.handleClick}>
                <span className={this.state.isOpen ? "file-icon_chevron_down arrow" : "file-icon_chevron_right arrow"}/>
                {this.state.title}
            </div>
            {this.state.isOpen ? this.state.children : null}
        </div>
    )}
}