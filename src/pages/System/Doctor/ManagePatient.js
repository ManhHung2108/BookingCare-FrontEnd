import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import moment from "moment";

import "./ManagePatient.scss";
import TableManagePatient from "./TableManagePatient";
import { getListPatientForDoctorService } from "../../../services";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(), //lấy ngày hôm nay, không lấy thời gian
            listPatient: [],
        };
    }

    async componentDidMount() {
        let { userInfor } = this.props;
        let { currentDate } = this.state;

        if (userInfor) {
            if (this.userInfor && this.userInfor.userType !== "doctor") {
                this.props.history.push(`/system/home`);
            }
            this.getDataPatient(userInfor.id, currentDate);
        }
    }

    componentDidUpdate(prevState, prevProps, snapshot) {
        if (prevProps.userInfor !== this.props.userInfor) {
            if (
                this.props.userInfor &&
                this.props.userInfor.userType !== "doctor"
            ) {
                this.props.history.push(`/system/home`);
                console.log(this.props.history);
            }
        }
    }

    getDataPatient = async (doctorId, date) => {
        let res = await getListPatientForDoctorService(doctorId, date);
        if (res && res.errCode === 0) {
            this.setState({
                listPatient: res.data,
            });
        }
    };

    handleSelectDate = async (date) => {
        let { userInfor } = this.props;

        this.setState(
            {
                currentDate: date,
            },
            async () => {
                //Gửi lên dạng timeTamp
                let formattedDate = new Date(date).getTime();
                this.getDataPatient(userInfor.id, formattedDate);
            }
        );
    };

    render() {
        const { currentDate } = this.state;

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
                <TableManagePatient
                    data={this.state.listPatient}
                    language={this.props.language}
                />
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ManagePatient)
);
