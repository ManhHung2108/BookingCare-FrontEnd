import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import * as actions from "../../../redux/actions";
import "./Header.scss";
import { adminMenu, doctorMenu } from "./menuApp";
import Navigator from "../../../components/System/Navigator";
import { LANGUAGE, USER_ROLE } from "../../../utils";
import _ from "lodash";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuSystem: [],
        };
    }
    componentDidMount = () => {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuSystem: menu,
        });

        console.log("check thông tin người dùng từ redux: ", userInfo);
    };

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };
    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/**Thanh navigation */}
                <div className="header-tab-container">
                    <Navigator menus={this.state.menuSystem} />
                </div>

                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id={"homeHeader.welcome"} />
                        {userInfo && userInfo.lastName
                            ? `${userInfo.firstName} ${userInfo.lastName}!`
                            : ""}
                    </span>
                    <span
                        className={
                            this.props.language === LANGUAGE.VI
                                ? "language-vi active"
                                : "language-vi"
                        }
                        onClick={() => {
                            this.handleChangeLanguage(LANGUAGE.VI);
                        }}
                    >
                        VN
                    </span>
                    <span
                        className={
                            this.props.language === LANGUAGE.EN
                                ? "language-en active"
                                : "language-en"
                        }
                        onClick={() => {
                            this.handleChangeLanguage(LANGUAGE.EN);
                        }}
                    >
                        EN
                    </span>

                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Logout"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.appReducer.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) =>
            dispatch(actions.changeLanguageAppAction(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
