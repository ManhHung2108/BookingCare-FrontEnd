import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../../pages/System/UserManage";
import UserReduxManage from "../../pages/System/Admin/UserReduxManage";
import ManageDoctor from "../../pages/System/Admin/ManageDoctor";
import Header from "./Header/Header";
import ManageSpecialty from "../../pages/System/Specialty/ManageSpecialty";
import ManageClinic from "../../pages/System/Clinic/ManageClinic";
import SystemHome from "../../pages/System/Admin/SystemHome";
import { Menu } from "antd";
import { adminMenu, doctorMenu } from "./Header/menuApp";
import { FormattedMessage } from "react-intl";
import { getUserInforSystem, fetchDashboardData } from "../../services";
import * as actions from "../../redux/actions";
import ManageSchedule from "../../pages/System/Doctor/ManageSchedule";

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuSystem: [],
            userInfo: {},
            authorized: false, // Thay đổi trạng thái quyền truy cập dựa trên xác minh
        };
    }
    async componentDidMount() {
        try {
            this._isMounted = true;
            let { token } = this.props;
            let menu = [];
            let userInfor = {};
            let authorizeUser = await this.authorizeUser(token);
            if (authorizeUser && authorizeUser.errCode === 0) {
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
                                menuSystem: this.renderMenuItems(menu),
                                userInfo: userInfor,
                            });
                        }
                    }
                }
            }
        } catch (error) {
            // Xử lý lỗi ở đây nếu có
        }
    }

    authorizeUser = async (token) => {
        try {
            let res = await fetchDashboardData(token);
            // Xử lý dữ liệu nếu cần
            this.setState({
                authorized: true,
            });
            return res;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Xử lý lỗi 403 ở đây
                console.log(
                    "Access forbidden. You are not authorized to view this page."
                );
                // Redirect hoặc thực hiện hành động khác tương ứng với lỗi 403
                this.props.history.push("/home");
            } else {
                // Xử lý các lỗi khác
                console.error("Error:", error);
            }
        }
    };

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
        const { systemMenuPath } = this.props;
        const { authorized } = this.state;

        return (
            <Fragment>
                {this.props.isLoggedIn && <Header authorized={authorized} />}
                <div
                    className="system-container"
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <>
                        {authorized && (
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
                            >
                                {/* {renderMenuItems(adminMenu)} */}
                            </Menu>
                        )}
                    </>

                    <div
                        className="system-list"
                        style={{
                            width: "80%",
                            overflow: "auto",
                            height: "calc(100vh - 40px)",
                        }}
                    >
                        <Switch>
                            <Route path="/system/home" component={SystemHome} />
                            <Route
                                path="/system/user-manage"
                                component={UserReduxManage}
                            />
                            <Route
                                path="/system/manage-doctor"
                                component={ManageDoctor}
                            />
                            {/* <Route
                                path="/system/user-manage-redux"
                                component={UserReduxManage}
                            /> */}
                            <Route
                                path="/system/manage-specialty"
                                component={ManageSpecialty}
                            />
                            <Route
                                path="/system/manage-clinic"
                                component={ManageClinic}
                            />

                            <Route
                                path="/system/manage-schedule"
                                component={ManageSchedule}
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
