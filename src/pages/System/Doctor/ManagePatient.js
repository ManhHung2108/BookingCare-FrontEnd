import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./ManagePatient.scss";
import TableManagePatient from "./TableManagePatient";
import { toast } from "react-toastify";
import { LANGUAGE } from "../../../utils";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    componentDidMount() {}

    handleSelectDate = async (date) => {
        this.setState({
            currentDate: date,
        });
    };

    render() {
        const { currentDate } = this.state;
        const { userInfor } = this.props;

        return (
            <div className="manage-patient_container container">
                <div className="title">
                    {/* <FormattedMessage id={"manage-user.title"} /> */}
                    Manage Patient's
                </div>
                <div className="manage-patient_body row">
                    <div className="col-4 form-group" style={{ zIndex: "2" }}>
                        <label>Chọn ngày khám</label>
                        <br />
                        <DatePicker
                            className="form-control"
                            selected={currentDate}
                            onChange={(date) => {
                                this.handleSelectDate(date);
                            }}
                            dateFormat="dd/MM/yyyy" // Định dạng ngày tháng thành "dd/mm/yyyy"
                            value={currentDate}
                        />
                    </div>
                </div>
                <TableManagePatient />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.appReducer.language,
        userInfor: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
