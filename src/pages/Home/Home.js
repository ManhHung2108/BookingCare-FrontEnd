import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
    notify = () => toast("Wow so easy!");

    render() {
        // let jsondata = localStorage.getItem("persist:user");
        // let data = JSON.parse(jsondata);
        // let isLoggedIn = !data.isLoggedIn;

        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";
        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
