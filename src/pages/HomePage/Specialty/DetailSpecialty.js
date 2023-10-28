import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./DetailSpecialty.scss";
import HomeHeader from "../HomeHeader";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}
    render() {
        return (
            <>
                <HomeHeader />
                <div>DetailSpecialty</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
