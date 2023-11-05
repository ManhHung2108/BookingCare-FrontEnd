import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
    render() {
        // let jsondata = localStorage.getItem("persist:user");
        // let data = JSON.parse(jsondata);
        // let isLoggedIn = !data.isLoggedIn;
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? "/system/home" : "/home";
        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
