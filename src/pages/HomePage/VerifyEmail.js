import React, { Component } from "react";
import { connect } from "react-redux";

import { postVerifyBookAppointmentService } from "../../services";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        // console.log(">>>> check props form verifyEmail: ", this.props);

        if (this.props.location && this.props.location.search) {
            //Lấy ra các querry string sau dấu ?: http://localhost:3000/verify-booking?token=sj%C4%91jjdkjdjdjj%C4%91&doctorId=2
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");

            // let res = await postVerifyBookAppointmentService({});

            // console.log(">>>> check token: " + token + " " + doctorId);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return <div>VerifyEmail</div>;
    }
}

export default connect()(VerifyEmail);
