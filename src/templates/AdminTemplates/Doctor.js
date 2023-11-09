import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Menu } from "antd";

import Header from "./Header/Header";
import ManageSchedule from "../../pages/System/Doctor/ManageSchedule";
import ManagePatient from "../../pages/System/Doctor/ManagePatient";
import { FormattedMessage } from "react-intl";
import { getUserInforSystem } from "../../services";
import * as actions from "../../redux/actions";
import { adminMenu, doctorMenu } from "./Header/menuApp";

class Doctor extends Component {
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

            console.log(res);

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
                            menuSystem: this.renderMenuItems(menu),
                            userInfo: userInfor,
                        });
                    }
                }
            }
        } catch (error) {
            // Xử lý lỗi ở đây nếu có
        }
    }

    renderMenuItems = (items) => {
        if (items && items.length > 0) {
            return items.map((item) => {
                if (item.menus && item.menus.length > 0) {
                    return {
                        key: `${item.id}`,
                        label: <FormattedMessage id={item.name} />,
                        icon: item.icon,
                        children: this.renderMenuItems(item.menus)
                            ? this.renderMenuItems(item.menus)
                            : [],
                    };
                } else {
                    return {
                        key: `${item.link}`,
                        label: <FormattedMessage id={item.name} />,
                    };
                }
            });
        }
    };

    render() {
        // console.log(`system: ${this.props.isLoggedIn}`);
        const { systemMenuPath } = this.props;

        return (
            <Fragment>
                {this.props.isLoggedIn && <Header />}
                <div
                    className="system-container"
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Menu
                        style={{
                            height: "calc(100vh - 40px)",
                            width: "20%",
                        }}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[
                            this.props.history.location.pathname,
                        ]}
                        items={this.state.menuSystem}
                        onClick={(item) => {
                            this.props.history.push(item.key);
                        }}
                    ></Menu>
                    <div
                        className="system-list"
                        style={{
                            width: "80%",
                            overflow: "auto",
                            height: "calc(100vh - 40px)",
                        }}
                    >
                        <Switch>
                            <Route
                                path="/doctor/manage-schedule"
                                component={ManageSchedule}
                            />
                            <Route
                                path="/doctor/manage-patient"
                                component={ManagePatient}
                            />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        token: state.user.token,
        language: state.appReducer.language,
        systemMenuPath: state.appReducer.systemMenuPath,
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
