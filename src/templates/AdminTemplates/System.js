import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../../pages/System/UserManage";
import ProductManage from "../../pages/System/ProductManage";
import RegisterPackageGroupOrAcc from "../../pages/System/RegisterPackageGroupOrAcc";

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route
                            path="/system/user-manage"
                            component={UserManage}
                        />
                        <Route
                            path="/system/product-manage"
                            component={ProductManage}
                        />
                        <Route
                            path="/system/register-package-group-or-account"
                            component={RegisterPackageGroupOrAcc}
                        />
                        <Route
                            component={() => {
                                return <Redirect to={systemMenuPath} />;
                            }}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.appReducer.systemMenuPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
