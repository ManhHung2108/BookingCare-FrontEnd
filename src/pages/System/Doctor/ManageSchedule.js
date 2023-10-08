import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { toast } from "react-toastify";

import "./ManageSchedule.scss";
import {
    getAllDoctorAction,
    getAllScheduleTimeAction,
} from "../../../redux/actions/adminAction";
import { LANGUAGE, dateFormat } from "../../../utils/constants";
import { saveBulkScheduleDoctorService } from "../../../services";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: "",
            currentDate: "",
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
        //Lấy ra thời gian lưu vào state
        if (
            prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux
        ) {
            // console.log("check rangeTime: ", this.props.allScheduleTimeRedux);
            let data = this.props.allScheduleTimeRedux;
            if (data && data.length > 0) {
                data = data.map((item) => {
                    return {
                        ...item,
                        isSelected: false,
                    };
                });
            }
            this.setState({
                rangeTime: data,
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

    handleSelectTime = (data) => {
        let { rangeTime } = this.state;
        //Tìm ra vị trí khi được click
        let index = rangeTime.findIndex((item) => {
            return item.id === data.id;
        });

        //Sửa lại isSelected của item được click
        if (index !== -1) {
            let newRangeTime = rangeTime;
            newRangeTime[index].isSelected = !newRangeTime[index].isSelected;
            this.setState({
                rangeTime: newRangeTime,
            });
        }
    };

    handleSaveSchedule = async () => {
        const { currentDate, selectedDoctor, rangeTime } = this.state;
        const { language } = this.props;
        if (!currentDate) {
            toast.error(
                `${
                    LANGUAGE.VI === language
                        ? "Yêu cầu chọn ngày!"
                        : "Isvalid selected Date!"
                }`
            );
        }
        if (!selectedDoctor) {
            toast.error(
                `${
                    LANGUAGE.VI === language
                        ? "Yêu cầu chọn bác sĩ!"
                        : "Isvalid selected Doctor!"
                }`
            );
        }

        let data = []; //gửi lên server
        // let formattedDate = moment(currentDate).format(
        //     dateFormat.SEND_TO_SERVER
        // );

        //Gửi lên dạng timeTamp
        let formattedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            //Lấy ra mảng các time được chọn
            let selectedTime = rangeTime.filter(
                (item) => item.isSelected === true
            );
            // console.log("Check selected time: ", selectedTime);

            //Check nếu chưa có lịch thì sẽ đưa ra thông báo
            if (selectedTime && selectedTime.length > 0) {
                //Mỗi lần lặp lấy ra 1 obj và thêm vào mảng data
                data = selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    // data.push(object);
                    // return data;
                    return object;
                });
            } else {
                toast.error(
                    `${
                        LANGUAGE.VI === language
                            ? "Yêu cầu chọn thời gian!"
                            : "Isvalid selected Time!"
                    }`
                );
                return;
            }
        }

        let res = await saveBulkScheduleDoctorService({
            arrSchedule: data,
            doctorId: selectedDoctor,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            toast.success(
                `${
                    LANGUAGE.VI === language
                        ? "Lưu kế hoạch khám bệnh thành công!"
                        : "Isvalid ScheduleTime Time!"
                }`
            );
        }
        // console.log("check response saveBulkScheduleDoctorService: ", res);

        // console.log("Check data: ", data);

        // console.log(
        //     moment(currentDate).format("DD/MM/YYYY"),
        //     selectedDoctor,
        //     rangeTime
        // );

        // if (currentDate) {
        //     const year = currentDate.getFullYear();
        //     const month = (currentDate.getMonth() + 1)
        //         .toString()
        //         .padStart(2, "0");
        //     const day = currentDate.getDate().toString().padStart(2, "0");

        //     // Tạo chuỗi datetime phù hợp để lưu vào SQL
        //     const sqlDatetime = `${year}-${month}-${day}`;

        //     // Sử dụng giá trị sqlDatetime trong truy vấn SQL hoặc chèn dữ liệu vào cơ sở dữ liệu MySQL
        //     console.log(sqlDatetime);
        // }
    };

    render() {
        const { Option } = Select;
        const { selectedDoctor, listDoctor, currentDate, rangeTime } =
            this.state;
        const { language } = this.props;

        // Tạo một đối tượng Date đại diện cho ngày hiện tại
        var today = new Date();
        // Tạo một đối tượng Date đại diện cho ngày mai
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

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
                                minDate={tomorrow} // Giới hạn ngày tối thiểu là ngày hiện tại
                                value={currentDate}
                            />
                        </div>
                        <div className="col-12 pick-hour_container">
                            {/* <FormattedDate value={this.state.currentDate} /> */}
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item) => {
                                    return (
                                        <button
                                            className={`btn btn btn-schedule ${
                                                item.isSelected ? "active" : ""
                                            }`}
                                            key={item.id}
                                            onClick={() => {
                                                this.handleSelectTime(item);
                                            }}
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
                                onClick={() => this.handleSaveSchedule()}
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
