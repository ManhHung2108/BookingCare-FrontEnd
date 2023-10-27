import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../../pages/System/UserManage";
import UserReduxManage from "../../pages/System/Admin/UserReduxManage";
import ManageDoctor from "../../pages/System/Admin/ManageDoctor";

import Header from "./Header/Header";
import ManageSpecialty from "../../pages/System/Specialty/ManageSpecialty";

class System extends Component {
    render() {
        // console.log(`system: ${this.props.isLoggedIn}`);
        const { systemMenuPath } = this.props;
        return (
            <Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
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
        systemMenuPath: state.appReducer.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
