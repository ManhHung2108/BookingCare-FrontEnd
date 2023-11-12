import React, { Component } from "react";
import { UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHospital,
    faStethoscope,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import "./SystemHome.scss";
import DashboardCard from "../../../components/System/DashboardCard";
import DashboardChart from "../../../components/System/DashboardChart";
import {
    countStatsForAdminService,
    getBookingCountsByMonthService,
    getClinicMonthlyBookingStatsService,
} from "../../../services";
import { connect } from "react-redux";
import { LANGUAGE } from "../../../utils/constants";
import { FormattedMessage } from "react-intl";

class SystemHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartBooking: null,
            chartClinicBooking: null,
            userCountStats: 0,
            doctorCountStats: 0,
            clinicCountStats: 0,
        };
    }

    async componentDidMount() {
        const { language } = this.props;
        let res = await getBookingCountsByMonthService();
        let resClinicBooking = await getClinicMonthlyBookingStatsService();
        let resCountStats = await countStatsForAdminService();

        if (res && res.errCode === 0) {
            if (res && res.data && res.data.resultsBooking.length > 0) {
                // Xử lý dữ liệu để đưa vào biểu đồ
                let labels = res.data.resultsBooking.map(
                    (entry) => entry.month
                );

                let countsBooking = this.builData(res.data.resultsBooking);
                let countsCancle = this.builData(res.data.resultsBookingCancle);

                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: `${
                                language === LANGUAGE.VI
                                    ? "Số lịch hủy"
                                    : "Cancellation schedule number"
                            }`,
                            data: countsCancle,
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                            label: `${
                                language === LANGUAGE.VI
                                    ? "Số lịch đặt khám"
                                    : "Appointment appointment number"
                            }`,
                            data: countsBooking,
                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                    ],
                };

                this.setState({
                    chartBooking: data,
                });
            }
        }

        if (resClinicBooking && resClinicBooking.errCode === 0) {
            let labels = resClinicBooking.data.map((item) => {
                return this.props.language === LANGUAGE.VI
                    ? item.nameVi
                    : item.nameEn;
            });
            let countsBooking = this.builData(resClinicBooking.data);
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: "Số lượng lịch đặt khám",
                        data: countsBooking,
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                ],
            };
            this.setState({
                chartClinicBooking: data,
            });
        }

        if (resCountStats && resCountStats.errCode === 0) {
            this.setState({
                userCountStats: resCountStats.data.userCountStats,
                doctorCountStats: resCountStats.data.doctorCountStats,
                clinicCountStats: resCountStats.data.clinicCountStats,
            });
        }
    }

    async componentDidUpdate(prevProps) {
        const { language } = this.props;
        if (prevProps.language !== this.props.language) {
            let res = await getBookingCountsByMonthService();
            let resClinicBooking = await getClinicMonthlyBookingStatsService();

            if (res && res.errCode === 0) {
                if (res && res.data && res.data.resultsBooking.length > 0) {
                    // Xử lý dữ liệu để đưa vào biểu đồ
                    let labels = res.data.resultsBooking.map(
                        (entry) => entry.month
                    );

                    let countsBooking = this.builData(res.data.resultsBooking);
                    let countsCancle = this.builData(
                        res.data.resultsBookingCancle
                    );

                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: `${
                                    language === LANGUAGE.VI
                                        ? "Số lịch hủy"
                                        : "Cancellation schedule number"
                                }`,
                                data: countsCancle,
                                backgroundColor: "rgba(255, 99, 132, 0.5)",
                            },
                            {
                                label: `${
                                    language === LANGUAGE.VI
                                        ? "Số lịch đặt khám"
                                        : "Appointment appointment number"
                                }`,
                                data: countsBooking,
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            },
                        ],
                    };

                    this.setState({
                        chartBooking: data,
                    });
                }
            }

            if (resClinicBooking && resClinicBooking.errCode === 0) {
                let labels = resClinicBooking.data.map((item) => {
                    return this.props.language === LANGUAGE.VI
                        ? item.nameVi
                        : item.nameEn;
                });
                let countsBooking = this.builData(resClinicBooking.data);
                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: `${
                                language === LANGUAGE.VI
                                    ? "Số lịch đặt khám"
                                    : "Appointment appointment number"
                            }`,
                            data: countsBooking,
                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                    ],
                };
                this.setState({
                    chartClinicBooking: data,
                });
            }
        }
    }

    builData = (inputData) => {
        let counts = inputData.map((entry) => entry.quantity);
        return counts;
    };

    render() {
        const { language } = this.props;
        const { userCountStats, doctorCountStats, clinicCountStats } =
            this.state;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1 để lấy tháng thực tế

        return (
            <div className="admin-home">
                <div className="admin-home_title">
                    <h1>
                        <FormattedMessage id={"admin.dashboard.title"} />
                    </h1>
                </div>

                <Space direction="horizontal">
                    <DashboardCard
                        icon={
                            <UserOutlined
                                style={{
                                    fontSize: "20px",
                                    color: "green",
                                    backgroundColor: "rgba(0, 255, 0, 0.25)",
                                    borderRadius: "50%",
                                    padding: "8px",
                                }}
                            />
                        }
                        title={language === LANGUAGE.EN ? "User" : "Người dùng"}
                        value={userCountStats}
                    />
                    <DashboardCard
                        icon={
                            <FontAwesomeIcon
                                icon={faHospital}
                                style={{
                                    fontSize: "20px",
                                    color: "rgba(22, 119, 255, 0.75)",
                                    backgroundColor: "rgba(22, 119, 255, 0.25)",
                                    borderRadius: "50%",
                                    padding: "8px",
                                }}
                            />
                        }
                        title={
                            language === LANGUAGE.EN ? "Clinic" : "Phòng khám"
                        }
                        value={clinicCountStats}
                    />
                    <DashboardCard
                        icon={
                            <FontAwesomeIcon
                                icon={faUserDoctor}
                                style={{
                                    fontSize: "20px",
                                    color: "red",
                                    backgroundColor: "rgba(255, 0, 0, 0.25)",
                                    borderRadius: "50%",
                                    padding: "8px",
                                }}
                            />
                        }
                        title={language === LANGUAGE.EN ? "Doctor" : "Bác sĩ"}
                        value={doctorCountStats}
                    />
                </Space>

                <div className="admin-home_chart">
                    <DashboardChart
                        chartData={this.state.chartBooking}
                        titleChart={
                            language === LANGUAGE.VI
                                ? "Thống kê đặt lịch theo tháng"
                                : "Scheduling statistics by month"
                        }
                    />
                    <DashboardChart
                        chartData={this.state.chartClinicBooking}
                        titleChart={
                            language === LANGUAGE.VI
                                ? `Thống kê đặt lịch của phòng khám tháng ${currentMonth}`
                                : `Monthly clinic scheduling statistics ${currentMonth}`
                        }
                    />
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SystemHome);
