import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FormattedMessage } from "react-intl";
import { Table } from "antd";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import { LANGUAGE } from "../../../utils";

import * as actions from "../../../redux/actions";
import HomeFooter from "../HomeFooter";
import HomeHeader from "../HomeHeader";
import "./HistoryBooking.scss";
import {
    getBookingHistoryForPatient,
    lookUpBookingHistoryForPatient,
} from "../../../services";

// Hàm này trả về tên lớp CSS tùy thuộc vào giá trị trạng thái
const getStatusColor = (status) => {
    switch (status) {
        case "S1":
            return "new-status"; // Đặt tên lớp CSS cho trạng thái hoàn thành
        case "S2":
            return "confirmed-status"; // Đặt tên lớp CSS cho trạng thái chưa hoàn thành
        case "S3":
            return "done-status"; // Đặt tên lớp CSS cho trạng thái chưa hoàn thành
        case "S4":
            return "cancle-status"; // Đặt tên lớp CSS cho trạng thái chưa hoàn thành
        default:
            return "default-status"; // Đặt tên lớp CSS cho trạng thái mặc định hoặc khác
    }
};

class HistoryBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            bookings: [],
            bookingHistories: [],

            lookUpBooking: [],
        };
    }

    async componentDidMount() {
        const { token } = this.props;
        if (token) {
            this.getDataBookingLogged(token);
        }
    }

    async componentDidUpdate(prevProps) {
        const { token } = this.props;
        if (prevProps.token !== this.props.token) {
            if (token) {
                this.getDataBookingLogged(token);
            } else {
                this.setState({
                    bookings: [],
                    bookingHistories: [],
                });
            }
        }
    }

    getDataBookingLogged = async (token) => {
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
    };

    buildDataBooking = (data) => {
        const { language } = this.props;
        let dataSource = data.map((item) => {
            return {
                key: item.id,
                fullName: `${
                    item.patientData.firstName ? item.patientData.firstName : ""
                } ${item.patientData.lastName}`,
                doctorName: `${item.User.firstName} ${item.User.lastName}`,
                timeType: `${item.timeTypeDataPatient.valueVi}, ${
                    language === LANGUAGE.VI
                        ? moment
                              .unix(+item.date / 1000)
                              .format("dddd - DD/MM/YYYY")
                        : moment
                              .unix(+item.date / 1000)
                              .locale("en")
                              .format("ddd - MM/DD/YYYY")
                }`,
                reason: item.reason,
                description: "",
            };
        });

        return dataSource;
    };

    builDataBookingHistory = (data) => {
        const { language } = this.props;
        let dataSource = data.map((item) => {
            return {
                key: item.id,
                fullName: `${item.bookingData.patientData.firstName} ${item.bookingData.patientData.lastName}`,
                doctorName: `${item.bookingData.User.firstName} ${item.bookingData.User.lastName}`,
                timeType: `${item.bookingData.timeTypeDataPatient.valueVi}, ${
                    language === LANGUAGE.VI
                        ? moment
                              .unix(+item.date / 1000)
                              .format("dddd - DD/MM/YYYY")
                        : moment
                              .unix(+item.date / 1000)
                              .locale("en")
                              .format("ddd - MM/DD/YYYY")
                }`,
                reason: item.bookingData.reason,
                description: item.description,
            };
        });

        return dataSource;
    };

    builDataLookUp = (data) => {
        const { language } = this.props;
        let dataSource = data.map((item) => {
            return {
                key: item.id,
                fullName: `${
                    item.patientData.firstName ? item.patientData.firstName : ""
                } ${item.patientData.lastName}`,
                doctorName: `${item.User.firstName} ${item.User.lastName}`,
                timeType: `${item.timeTypeDataPatient.valueVi}, ${
                    language === LANGUAGE.VI
                        ? moment
                              .unix(+item.date / 1000)
                              .format("dddd - DD/MM/YYYY")
                        : moment
                              .unix(+item.date / 1000)
                              .locale("en")
                              .format("ddd - MM/DD/YYYY")
                }`,
                statusId: `${item.statusId}`,
                status: `${
                    language === LANGUAGE.VI
                        ? item.statusData.valueVi
                        : item.statusData.valueEn
                }`,
                reason: item.reason,
                description:
                    item.bookingData && item.bookingData.description
                        ? item.bookingData.description
                        : "",
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

    handleEnterKeyPress = async (event) => {
        if (event.key === "Enter") {
            let tokenBooking = this.state.searchInput;

            let res = await lookUpBookingHistoryForPatient(tokenBooking);
            if (res && res.errCode === 0) {
                if (res.data && !_.isEmpty(res.data)) {
                    let booking = this.builDataLookUp(res.data.booking);

                    this.setState({
                        lookUpBooking: booking,
                    });
                }
            } else {
                this.setState({
                    lookUpBooking: [],
                });
                toast.error(res.errMessage);
            }
        }
    };

    render() {
        const { searchInput, lookUpBooking } = this.state;
        const { isLoggedIn, language } = this.props;

        const columns = [
            {
                title: language === LANGUAGE.VI ? "Họ và tên" : "FullName",
                dataIndex: "fullName",
                key: "fullName",
            },
            {
                itle: language === LANGUAGE.EN ? "Doctor" : "Bác sĩ khám",
                dataIndex: "doctorName",
                key: "doctorName",
            },
            {
                title: language === LANGUAGE.EN ? "Time" : "Thời gian",
                dataIndex: "timeType",
                key: "timeType",
            },
            {
                title: language === LANGUAGE.EN ? "Reason" : "Lý do khám",
                dataIndex: "reason",
                key: "reason",
            },
        ];

        const columnsHistories = [
            {
                title: language === LANGUAGE.VI ? "Họ và tên" : "FullName",
                dataIndex: "fullName",
                key: "fullName",
            },
            {
                title: language === LANGUAGE.EN ? "Doctor" : "Bác sĩ khám",
                dataIndex: "doctorName",
                key: "doctorName",
            },
            {
                title: language === LANGUAGE.EN ? "Time" : "Thời gian",
                dataIndex: "timeType",
                key: "timeType",
            },
            {
                title: language === LANGUAGE.EN ? "Reason" : "Lý do khám",
                dataIndex: "reason",
                key: "reason",
            },
            {
                title: language === LANGUAGE.EN ? "Result" : "Kết quả khám",
                dataIndex: "description",
                key: "description",
            },
        ];

        const columnsLookUp = [
            {
                title: language === LANGUAGE.VI ? "Họ và tên" : "FullName",
                dataIndex: "fullName",
                key: "fullName",
            },
            {
                title: language === LANGUAGE.EN ? "Doctor" : "Bác sĩ khám",
                dataIndex: "doctorName",
                key: "doctorName",
            },
            {
                title: language === LANGUAGE.EN ? "Time" : "Thời gian",
                dataIndex: "timeType",
                key: "timeType",
            },
            {
                title: language === LANGUAGE.EN ? "Reason" : "Lý do khám",
                dataIndex: "reason",
                key: "reason",
            },
            {
                title: language === LANGUAGE.EN ? "Result" : "Kết quả khám",
                dataIndex: "description",
                key: "description",
                render: (text, record) => {
                    return <span>{text}</span>;
                },
            },
            {
                title: language === LANGUAGE.EN ? "Status" : "Trạng thái",
                dataIndex: "status",
                key: "status",
                render: (text, record) => {
                    return (
                        <span
                            className={`status-column ${getStatusColor(
                                record.statusId
                            )}`}
                        >
                            {record.status}
                        </span>
                    );
                },
            },
        ];

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
                            <FormattedMessage
                                id={
                                    "patient.appointment-schedule.text-appointment-schedule"
                                }
                            />
                        </div>
                    </div>
                    {isLoggedIn === false ? (
                        <>
                            <div className="booking-search">
                                <div className="filter_search">
                                    <input
                                        className="form-control"
                                        name="searchInput"
                                        value={searchInput}
                                        placeholder="Search"
                                        onChange={(e) => {
                                            this.handleOnChangeInput(e);
                                        }}
                                        onKeyPress={(e) => {
                                            this.handleEnterKeyPress(e);
                                        }}
                                    />
                                    <i className="fas fa-search"></i>
                                </div>
                            </div>
                            <div className="booking-history-content">
                                <div className="booking-current">
                                    <h2>
                                        <FormattedMessage
                                            id={
                                                "patient.appointment-schedule.text-title-lookup"
                                            }
                                        />
                                    </h2>
                                    {lookUpBooking &&
                                    lookUpBooking.length > 0 ? (
                                        <Table
                                            dataSource={lookUpBooking}
                                            columns={columnsLookUp}
                                        />
                                    ) : (
                                        <p className="text-center">
                                            <FormattedMessage
                                                id={
                                                    "patient.appointment-schedule.text-result"
                                                }
                                            />
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="booking-history-content">
                                <div className="booking-current">
                                    <h2>
                                        <FormattedMessage
                                            id={
                                                "patient.appointment-schedule.text-title-appointment-scheduled"
                                            }
                                        />
                                    </h2>
                                    <Table
                                        dataSource={this.state.bookings}
                                        columns={columns}
                                    />
                                </div>
                                <div className="booking-history">
                                    <h2>
                                        <FormattedMessage
                                            id={
                                                "patient.appointment-schedule.text-title-history"
                                            }
                                        />
                                    </h2>
                                    <Table
                                        dataSource={this.state.bookingHistories}
                                        columns={columnsHistories}
                                    />
                                </div>
                            </div>
                        </>
                    )}
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
