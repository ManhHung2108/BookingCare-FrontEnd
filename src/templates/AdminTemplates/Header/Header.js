import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import * as actions from "../../../redux/actions";
import "./Header.scss";
import { adminMenu, doctorMenu } from "./menuApp";
import Navigator from "../../../components/System/Navigator";
import { LANGUAGE } from "../../../utils";

import { getUserInforSystem } from "../../../services";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Header extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            menuSystem: [],
            userInfo: {},
        };
    }

    async componentDidMount() {
        try {
            this._isMounted = true;
            let { token } = this.props;
            let menu = [];
            let userInfor = {};

            const res = await getUserInforSystem(token);

            if (this._isMounted) {
                if (res && res.errCode === 0) {
                    userInfor = res.userInfor;
                    //Lưu lại thông tin người dùng lên redux
                    await this.props.userLoginSuccess(userInfor);

                    if (userInfor.userType === "admin") {
                        menu = adminMenu;
                    } else if (userInfor.userType === "doctor") {
                        menu = doctorMenu;
                    } else {
                        this.props.history.push("/home");
                        this._isMounted = false;
                    }

                    //Cập nhật trạng thái React trên một thành phần phải được gắn kết, tránh bất đồng bộ
                    if (this._isMounted) {
                        this.setState({
                            menuSystem: menu,
                            userInfo: userInfor,
                        });
                    }
                }
            }
        } catch (error) {
            // Xử lý lỗi ở đây nếu có
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };
    render() {
        const { processLogout, authorized } = this.props;
        const { userInfo } = this.state;
        return (
            <>
                {authorized && (
                    <div className="header-container">
                        {/**Thanh navigation */}
                        <div className="header-tab-container">
                            {/* <Navigator menus={this.state.menuSystem} /> */}
                            <Link className="navigate_home" to={"/system/home"}>
                                <i className="fas fa-arrow-left"></i>
                                <span>
                                    <FormattedMessage
                                        id={"admin.header.text-home"}
                                    />
                                </span>
                            </Link>
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
                )}
            </>
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
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
        changeLanguage: (language) =>
            dispatch(actions.changeLanguageAppAction(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
