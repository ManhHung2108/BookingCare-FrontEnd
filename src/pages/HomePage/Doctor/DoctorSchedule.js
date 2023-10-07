import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDateServicde } from "../../../services/userService";

import { LANGUAGE } from "../../../utils";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
        };
    }

    async componentDidMount() {
        this.setArrDays(this.props.language);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setArrDays(this.props.language);
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            this.setTime(
                this.props.doctorIdFromParent,
                moment(new Date()).startOf("day").valueOf()
            );
        }
    }

    //Viết hoa chữ cái đầu
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    //Hàm cho phép hiển thị 7 ngày sắp tới
    setArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGE.VI) {
                let labelVi = moment(new Date())
                    .add(i, "days")
                    .format("dddd - DD/MM");

                obj.label = this.capitalizeFirstLetter(labelVi);
            } else {
                obj.label = moment(new Date())
                    .add(i, "days")
                    .locale("en")
                    .format("ddd - DD/MM");
            }
            obj.value = moment(new Date())
                .add(i, "days")
                .startOf("day") //đầu ngày để ko lấy thời gian
                .valueOf(); //trả về timestamp

            allDays.push(obj);
        }

        this.setState({
            allDays: allDays,
        });
    };

    setTime = async (doctorId, date) => {
        let res = await getScheduleDoctorByDateServicde(doctorId, date);
        console.log("check response schedule from react: ", res);
        this.setState({
            allAvalableTime: res.data,
        });
    };

    handleChangeSelectDate = async (e) => {
        // console.log(
        //     "check doctorId for handleChangeSelectDate: ",
        //     this.props.doctorIdFromParent
        // );
        if (
            this.props.doctorIdFromParent &&
            this.props.doctorIdFromParent !== -1
        ) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value;

            let res = await getScheduleDoctorByDateServicde(doctorId, date);
            console.log("check response schedule from react: ", res);

            if (res && res.errCode == 0) {
                this.setState({
                    allAvalableTime: res.data,
                });
            }
        }

        // console.log("event onchangDate value: ", e.target.value);
    };

    render() {
        let { language } = this.props;
        let { allDays, allAvalableTime } = this.state;
        return (
            <div className="doctor-schedule_container">
                <div className="schedules-date">
                    <select
                        onChange={(e) => {
                            this.handleChangeSelectDate(e);
                        }}
                    >
                        {allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="schedules-available_time">
                    <div className="text-calenders">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Lịch Khám</span>
                    </div>
                    <div className="times">
                        {allAvalableTime &&
                            allAvalableTime.length > 0 &&
                            allAvalableTime.map((item, index) => {
                                return (
                                    <button key={index}>
                                        {language === LANGUAGE.VI
                                            ? item.timeData.valueVi
                                            : item.timeData.valueEn}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctorDetailRedux: state.user.doctorDetail,
        language: state.appReducer.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
