import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";

import "./ManageSchedule.scss";
import {
    getAllDoctorAction,
    getAllScheduleTimeAction,
} from "../../../redux/actions/adminAction";
import { LANGUAGE } from "../../../utils/constants";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: "",
            currentDate: new Date(),
            rangeTime: [],
        };
    }
    componentDidMount = () => {
        this.handleGetAllDoctor();
        this.props.getAllSchedule();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctorRedux !== this.props.listDoctorRedux) {
            this.setState({
                listDoctor: this.props.listDoctorRedux,
            });
        }
        if (
            prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux
        ) {
            this.setState({
                rangeTime: this.props.allScheduleTimeRedux,
            });
        }
    }

    handleGetAllDoctor = async () => {
        await this.props.getAllDoctor();
        this.setState({
            listDoctor: this.props.listDoctorRedux,
        });
    };

    handleSelectDoctor = async (value) => {
        this.setState({
            selectedDoctor: value,
        });
    };

    handleSelectDate = (date) => {
        this.setState({ currentDate: date });
    };

    handleSubmit = () => {
        const { currentDate } = this.state;
        if (currentDate) {
            // Lấy các thành phần ngày và giờ từ DatePicker
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
            const day = currentDate.getDate().toString().padStart(2, "0");

            // Tạo chuỗi datetime phù hợp để lưu vào SQL
            const sqlDatetime = `${year}-${month}-${day}`;

            // Sử dụng giá trị sqlDatetime trong truy vấn SQL hoặc chèn dữ liệu vào cơ sở dữ liệu MySQL
            console.log(sqlDatetime);
        }
    };
    render() {
        const { Option } = Select;
        const { selectedDoctor, listDoctor, currentDate, rangeTime } =
            this.state;
        const { language } = this.props;
        return (
            <div className="manage-schedule_container">
                <div className="m-s-title">
                    <FormattedMessage id={"manage-schedule.title"} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage
                                    id={"manage-schedule.choose-doctor"}
                                />
                            </label>
                            <Select
                                showSearch
                                placeholder="Chọn một mục"
                                style={{ width: "100%" }}
                                onChange={this.handleSelectDoctor}
                                value={selectedDoctor}
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {/* Render các Option từ dữ liệu API */}
                                {listDoctor.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {language === LANGUAGE.VI
                                            ? `${item.firstName} ${item.lastName}`
                                            : `${item.lastName} ${item.firstName}`}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage
                                    id={"manage-schedule.choose-date"}
                                />
                            </label>
                            <br />
                            <DatePicker
                                className="form-control"
                                selected={currentDate}
                                onChange={(date) => {
                                    this.handleSelectDate(date);
                                }}
                                dateFormat="dd/MM/yyyy" // Định dạng ngày tháng thành "dd/mm/yyyy"
                                minDate={new Date()} // Giới hạn ngày tối thiểu là ngày hiện tại
                            />
                        </div>
                        <div className="col-12 pick-hour_container">
                            {/* <FormattedDate value={this.state.currentDate} /> */}
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item) => {
                                    return (
                                        <button
                                            className="btn btn-schedule"
                                            key={item.id}
                                        >
                                            {language === LANGUAGE.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className="col-12 mt-3">
                            <button
                                className="btn btn-primary"
                                onClick={() => this.handleSubmit()}
                            >
                                <FormattedMessage id={"manage-schedule.save"} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.appReducer.language,
        listDoctorRedux: state.adminReducer.listDoctor,
        allScheduleTimeRedux: state.adminReducer.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => {
            return dispatch(getAllDoctorAction());
        },
        getAllSchedule: () => {
            return dispatch(getAllScheduleTimeAction());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
