import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import DatePicker from "react-datepicker";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";

import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../../redux/actions";
import { LANGUAGE } from "../../../../utils";
import { postPatientBookAppointmentService } from "../../../../services";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthDay: "",
            selectedGender: "",
            doctorId: "",
            timeType: "",
            date: "",
            language: "vi",
            timeString: "",
            doctorName: "",

            genders: "",

            recaptchaValue: null,
        };
    }
    componentDidMount() {
        this.props.getGenders();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.gendersRedux),
            });
        }
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            this.setState({
                genders: this.buildDataGender(this.props.gendersRedux),
                selectedGender:
                    this.props.gendersRedux &&
                    this.props.gendersRedux.length > 0
                        ? this.props.gendersRedux[0].keyMap
                        : "",
            });
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            this.setState({
                doctorId: this.props.dataTime.doctorId,
                timeType: this.props.dataTime.timeType,
                date: this.props.dataTime.date,
                recaptchaValue: this.props.recaptchaValue,
            });
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            result = data.map((item) => {
                return {
                    lable:
                        language === LANGUAGE.VI ? item.valueVi : item.valueEn,
                    value: item.keyMap,
                };
            });
        }

        return result;
    };

    handleChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state };
        copyState[id] = valueInput;
        this.setState({
            ...copyState,
        });
    };

    handleSelectDate = (date) => {
        this.setState({ birthDay: date });
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGE.VI
                    ? dataTime.timeData.valueVi
                    : dataTime.timeData.valueEn;

            let date =
                language === LANGUAGE.VI
                    ? this.capitalizeFirstLetter(
                          moment
                              .unix(+dataTime.date / 1000)
                              .format("dddd - DD/MM/YYYY")
                      )
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");

            return `${time} - ${date}`;
        }
        return ``;
    };

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGE.VI
                    ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                    : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;

            return name;
        }
        return ``;
    };

    handleConfirmBooking = async () => {
        //validate input
        let birthDay = new Date(this.state.birthDay).getTime(); //timestamp
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let data = {
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.state.date,
            gender: this.state.selectedGender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            birthDay: birthDay,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        };
        this.props.isShowLoading(true);
        let res = await postPatientBookAppointmentService(data);
        if (res && res.errCode === 0) {
            this.props.isShowLoading(false);
            toast.success(res.message);
            this.props.handleCloseModalBooking();
            this.setState({
                recaptchaValue: null,
            });
        } else {
            this.props.isShowLoading(false);
            toast.error(res.errMessage);
        }

        // console.log("check state from btnConfirm BookingModal: ", this.state);
    };

    handleRecaptchaChange = (value) => {
        // Có thể có các lệnh xử lý khác ở đây
        try {
            this.setState({
                recaptchaValue: value,
            });
        } catch (error) {
            console.error("Error in handleRecaptchaChange:", error);
        }
    };

    render() {
        const {
            email,
            fullName,
            genders,
            address,
            phoneNumber,
            reason,
            birthDay,
            selectedGender,
        } = this.state;
        const { isOpenModal, handleCloseModalBooking, dataTime } = this.props;

        let doctorId = "";
        //check tồn tại và không rỗng
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }

        // console.log("check data props from booking modal: ", this.props);
        // console.log("check data props from booking modal: ", this.state);
        // console.log(
        //     "check dataTime form DoctorSchedule: ",
        //     this.props.dataTime
        // );
        return (
            <div>
                <Modal
                    isOpen={isOpenModal}
                    toggle={this.props.handleCloseModalBooking}
                    className="booking-modal-container"
                    size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="text-header">
                                <FormattedMessage
                                    id={"patient.booking-modal.title"}
                                />
                            </span>
                            <span className="right">
                                <i
                                    className="fas fa-times"
                                    onClick={handleCloseModalBooking}
                                ></i>
                            </span>
                        </div>
                        <div className="booking-modal-body container">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage
                                            id={
                                                "patient.booking-modal.fullName"
                                            }
                                        />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={fullName}
                                        onChange={(event) => {
                                            this.handleChangeInput(
                                                event,
                                                "fullName"
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage
                                            id={
                                                "patient.booking-modal.phoneNumber"
                                            }
                                        />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(event) => {
                                            this.handleChangeInput(
                                                event,
                                                "phoneNumber"
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage
                                            id={"patient.booking-modal.email"}
                                        />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={email}
                                        onChange={(event) => {
                                            this.handleChangeInput(
                                                event,
                                                "email"
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage
                                            id={"patient.booking-modal.address"}
                                        />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={address}
                                        onChange={(event) => {
                                            this.handleChangeInput(
                                                event,
                                                "address"
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage
                                            id={"patient.booking-modal.reason"}
                                        />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={reason}
                                        onChange={(event) => {
                                            this.handleChangeInput(
                                                event,
                                                "reason"
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage
                                            id={
                                                "patient.booking-modal.birthday"
                                            }
                                        />
                                    </label>
                                    <br></br>
                                    <DatePicker
                                        className="form-control w-full"
                                        selected={birthDay}
                                        onChange={(date) => {
                                            this.handleSelectDate(date);
                                        }}
                                        dateFormat="dd/MM/yyyy" // Định dạng ngày tháng thành "dd/mm/yyyy"
                                        value={birthDay}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage
                                            id={"patient.booking-modal.gender"}
                                        />
                                    </label>
                                    <select
                                        className="form-control"
                                        id="inputGender"
                                        name="gender"
                                        value={selectedGender}
                                        onChange={(event) =>
                                            this.handleChangeInput(
                                                event,
                                                "selectedGender"
                                            )
                                        }
                                    >
                                        {genders &&
                                            genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.value}
                                                    >
                                                        {item.lable}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>
                            <ReCAPTCHA
                                sitekey="6LcDeigpAAAAALF7KPDFg0HCJGvh3tj-pv5F2WcK"
                                onChange={this.handleRecaptchaChange}
                            />
                        </div>
                        <div className="booking-modal-footer">
                            <button
                                className="btn btn-booking-confirm"
                                onClick={() => {
                                    this.handleConfirmBooking();
                                }}
                                disabled={
                                    this.state.recaptchaValue ? false : true
                                }
                            >
                                <FormattedMessage
                                    id={"patient.booking-modal.btnConfirm"}
                                />
                            </button>
                            <button
                                className="btn btn-booking-cancle"
                                onClick={handleCloseModalBooking}
                            >
                                <FormattedMessage
                                    id={"patient.booking-modal.btnCancel"}
                                />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
        gendersRedux: state.adminReducer.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isShowLoading: (isLoading) => {
            return dispatch(actions.isLoadingAction(isLoading));
        },
        getGenders: () => {
            return dispatch(actions.fecthGenderStart());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
