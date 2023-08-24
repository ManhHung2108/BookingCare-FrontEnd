import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import { ToastContainer } from "react-toastify";

import configs from "./configs";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import System from "./templates/AdminTemplates/System";
import Header from "./templates/AdminTemplates/Header/Header";
import { history } from "./redux/configStore";

import {
    userIsAuthenticated,
    userIsNotAuthenticated,
} from "./hoc/authentication";

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    {this.props.isLoggedIn && <Header />}
                    <div className="main-container">
                        <div className="content-container">
                            <Switch>
                                <Route
                                    path={configs.routes.HOME}
                                    exact
                                    component={Home}
                                />
                                <Route
                                    path={configs.routes.LOGIN}
                                    component={userIsNotAuthenticated(Login)}
                                />
                                <Route
                                    path={configs.routes.SYSTEM}
                                    component={userIsAuthenticated(System)}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
