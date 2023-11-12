import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FormattedMessage } from "react-intl";
import { Table } from "antd";

import * as actions from "../../../redux/actions";
import HomeFooter from "../HomeFooter";
import HomeHeader from "../HomeHeader";
import "./HistoryBooking.scss";
import { getBookingHistoryForPatient } from "../../../services";

const columns = [
    {
        title: "Họ và tên",
        dataIndex: "fullName",
        key: "fullName",
    },
    {
        title: "Bác sĩ khám",
        dataIndex: "doctorName",
        key: "doctorName",
    },
    {
        title: "Thời gian",
        dataIndex: "timeType",
        key: "timeType",
    },
    {
        title: "Lý do khám khám",
        dataIndex: "reason",
        key: "reason",
    },
    {
        title: "Kết quả khám",
        dataIndex: "description",
        key: "description",
    },
];

class HistoryBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            bookings: [],
            bookingHistories: [],
        };
    }

    async componentDidMount() {
        const { token } = this.props;
        if (token) {
            let res = await getBookingHistoryForPatient(token);
            if (res && res.errCode === 0) {
                let bookings = this.buildDataBooking(res.data.bookings);
                let bookingHistories = this.builDataBookingHistory(
                    res.data.bookingHistory
                );

                this.setState({
                    bookings: bookings,
                    bookingHistories: bookingHistories,
                });
            }
        }
    }

    async componentDidUpdate(prevProps) {
        const { token } = this.props;
        if (prevProps.token !== this.props.token) {
            console.log("hi");
            if (token) {
                let res = await getBookingHistoryForPatient(token);
                if (res && res.errCode === 0) {
                    let bookings = this.buildDataBooking(res.data.bookings);
                    let bookingHistories = this.builDataBookingHistory(
                        res.data.bookingHistory
                    );

                    this.setState({
                        bookings: bookings,
                        bookingHistories: bookingHistories,
                    });
                }
            } else {
                this.setState({
                    bookings: [],
                    bookingHistories: [],
                });
            }
        }
    }

    buildDataBooking = (data) => {
        let dataSource = data.map((item) => {
            return {
                key: item.id,
                fullName: `${item.patientData.firstName} ${item.patientData.lastName}`,
                doctorName: `${item.User.firstName} ${item.User.lastName}`,
                timeType: `${item.timeTypeDataPatient.valueVi}`,
                reason: item.reason,
                description: "",
            };
        });

        return dataSource;
    };

    builDataBookingHistory = (data) => {
        let dataSource = data.map((item) => {
            return {
                key: item.id,
                fullName: `${item.bookingData.patientData.firstName} ${item.bookingData.patientData.lastName}`,
                doctorName: `${item.bookingData.User.firstName} ${item.bookingData.User.lastName}`,
                timeType: `${item.bookingData.timeTypeDataPatient.valueVi}`,
                reason: item.bookingData.reason,
                description: item.description,
            };
        });
        return dataSource;
    };

    handleOnChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let copyState = { ...this.state };
        copyState[name] = value;

        this.setState({
            ...copyState,
        });
    };

    render() {
        const { searchInput } = this.state;
        const { isLoggedIn } = this.props;
        return (
            <>
                <HomeHeader bgColor={true} />
                <div className="booking-history-container">
                    <div className="booking-history-header">
                        <Link to="/home">
                            <i className="fas fa-home"></i>
                            <span>/</span>
                        </Link>
                        <div>
                            {/* <FormattedMessage
                                id={"patient.list-clinic.text-title"}
                            /> */}
                            Lịch hẹn
                        </div>
                    </div>
                    {isLoggedIn === false ? (
                        <div className="booking-search">
                            <div className="filter_search">
                                <input
                                    className="form-control"
                                    name="searchInput"
                                    value={searchInput}
                                    placeholder="Nhập email đã đặt lịch"
                                    onChange={(e) => {
                                        this.handleOnChangeInput(e);
                                    }}
                                    // onKeyPress={(e) => {
                                    //     this.handleEnterKeyPress(e);
                                    // }}
                                />
                                {/* <i className="fas fa-search"></i> */}
                                <button>
                                    <FormattedMessage
                                        id={"patient.list-clinic.text-search"}
                                    />
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="booking-history-content">
                        <div className="booking-current">
                            <h2>Lịch hẹn đã đặt</h2>
                            <Table
                                dataSource={this.state.bookings}
                                columns={columns}
                            />
                        </div>
                        <div className="booking-history">
                            <h2>Lịch sử khám</h2>
                            <Table
                                dataSource={this.state.bookingHistories}
                                columns={columns}
                            />
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
        token: state.user.token,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isShowLoading: (isLoading) => {
            return dispatch(actions.isLoadingAction(isLoading));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBooking);
