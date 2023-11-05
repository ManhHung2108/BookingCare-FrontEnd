import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import * as actions from "../../../redux/actions";
import "./Header.scss";
import { adminMenu, doctorMenu } from "./menuApp";
import Navigator from "../../../components/System/Navigator";
import { LANGUAGE, USER_ROLE } from "../../../utils";

import { getUserInforSystem } from "../../../services";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuSystem: [],
            userInfo: {},
        };
    }

    async componentDidMount() {
        let { token } = this.props;
        let menu = [];
        let userInfor = {};

        let res = await getUserInforSystem(token);
        if (res && res.errCode === 0) {
            if (res.userInfor && res.userInfor.userType === "admin") {
                menu = adminMenu;
            } else if (res.userInfor && res.userInfor.userType === "doctor") {
                menu = doctorMenu;
            }

            userInfor = res.userInfor;
        }

        // let menu = [];
        // if (userInfo && !_.isEmpty(userInfo)) {
        //     let role = userInfo.roleId;
        //     if (role === USER_ROLE.ADMIN) {
        //         menu = adminMenu;
        //     }
        //     if (role === USER_ROLE.DOCTOR) {
        //         menu = doctorMenu;
        //     }
        // }

        this.setState(
            {
                menuSystem: menu,
                userInfo: userInfor,
            },
            () => {
                console.log(this.state);
            }
        );

        // console.log("check thông tin người dùng từ redux: ", userInfo);
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };
    render() {
        const { processLogout } = this.props;
        const { userInfo } = this.state;
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
        token: state.user.token,
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
