import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import * as actions from "../../../redux/actions";
import "./Header.scss";
import { adminMenu } from "./menuApp";
import Navigator from "../../../components/System/Navigator";
import { LANGUAGE } from "../../../utils";

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };
    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/**Thanh navigation */}
                <div className="header-tab-container">
                    <Navigator menus={adminMenu} />
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
