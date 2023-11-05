import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./Header/Header";
import ManageSchedule from "../../pages/System/Doctor/ManageSchedule";
import ManagePatient from "../../pages/System/Doctor/ManagePatient";

class Doctor extends Component {
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
        systemMenuPath: state.appReducer.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
