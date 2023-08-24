import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../redux/actions";
import "./Header.scss";
import { adminMenu } from "./menuApp";
import Navigator from "../../../components/System/Navigator";

class Header extends Component {
    render() {
        const { processLogout } = this.props;
        return (
            <div className="header-container">
                {/**Thanh navigation */}
                <div className="header-tab-container">
                    <Navigator menus={adminMenu} />
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
