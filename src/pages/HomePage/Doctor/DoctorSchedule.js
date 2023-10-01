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
        };
    }

    componentDidMount() {
        this.setArrDays(this.props.language);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setArrDays(this.props.language);
        }
    }

    //Hàm cho phép hiển thị 7 ngày sắp tới
    setArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGE.VI) {
                obj.label = moment(new Date())
                    .add(i, "days")
                    .format("dddd - DD/MM");
            } else {
                obj.label = moment(new Date())
                    .add(i, "days")
                    .locale("en")
                    .format("dddd - DD/MM");
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
        }

        // console.log("event onchangDate value: ", e.target.value);
    };

    render() {
        let { allDays } = this.state;
        return (
            <div className="doctor-schedule_container">
                <div className="schedule-date">
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
                <div className="schedule-available_time"></div>
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
