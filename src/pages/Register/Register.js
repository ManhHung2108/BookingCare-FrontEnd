import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DatePicker from "react-datepicker";

import "./Register.scss";
import HeaderBack from "../../components/HeaderBack";
import { LANGUAGE, validateEmail, validatePhone } from "../../utils";
import * as actions from "../../redux/actions";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            passWord: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDay: "",
            gender: "",

            genders: [],
        };
    }

    componentDidMount() {
        this.props.getAllGender();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gendersFromRedux !== this.props.gendersFromRedux) {
            let genders = this.buildDataGender(this.props.gendersFromRedux);

            this.setState({
                genders: genders,
                gender:
                    this.props.gendersFromRedux &&
                    this.props.gendersFromRedux.length > 0
                        ? this.props.gendersFromRedux[0].id
                        : "",
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
                    value: item.id,
                };
            });
        }

        return result;
    };

    handleOnChangeInput = (e) => {
        const value = e.target.value;
        const key = e.target.name;

        const copyState = { ...this.state };

        copyState[key] = value;

        this.setState({
            ...copyState,
        });
    };

    handleSelectDate = (date) => {
        this.setState({ birthDay: date });
    };

    handleRegister = async (e) => {
        e.preventDefault();
        const {
            email,
            passWord,
            confirmPassword,
            firstName,
            lastName,
            phoneNumber,
            birthDay,
            gender,
        } = this.state;

        let formattedBirthDay = new Date(birthDay).getTime();

        let data = {
            email: email,
            passWord: passWord,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            birthday: formattedBirthDay,
            gender: gender,
        };

        let isValid = this.checkValidateInput();

        if (isValid === false) {
            return;
        } else {
            if (!validateEmail(email)) {
                toast.warning("Email không đúng định dạng!");
                return;
            }
            if (!validatePhone(phoneNumber)) {
                toast.warn("Số điện thoại không hợp lệ!");
                return;
            }
            if (passWord.length < 6) {
                toast.warn("Mật khẩu phải chứa ít nhất 6 kí tự!");
                return;
            }
            if (passWord !== confirmPassword) {
                toast.warn("Xác nhận mật khẩu không hợp lệ!");
                return;
            }

            console.log(data);

            //Thỏa mãn dispatch action create user lên reducer
            // let res = await this.props.createNewUser(data); //gửi data để gọi api
            // if (res && res.errCode === 0) {
            //     toast.success("Thêm mới thành công người dùng!");
            //     this.getAllUser();
            // } else {
            //     toast.error(res.errMessage);
            // }
        }
    };

    checkValidateInput = () => {
        let arrCheck = [
            "email",
            "passWord",
            "confirmPassword",
            "firstName",
            "lastName",
            "phoneNumber",
            "gender",
        ];
        let isValid = true;

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.warning(`${arrCheck[i]} không được để trống `);
                break;
            }
        }

        return isValid;
    };

    render() {
        const {
            email,
            passWord,
            confirmPassword,
            firstName,
            lastName,
            phoneNumber,
            birthDay,
            gender,

            genders,
        } = this.state;
        return (
            <>
                <HeaderBack />
                <div className="register-container d-flex">
                    <div className="col-6 register-content">
                        <div className="row justify-content-center align-items-center w-100">
                            <div className="Logo mb-5">
                                <img
                                    src={require("../../assets/images/LogoWebsite.PNG")}
                                    alt="HealthBookings"
                                />
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-center title">
                                        <FormattedMessage
                                            id={"patient.register.title"}
                                        />
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <form className="row">
                                        <div className="mb-3 col-12">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                <FormattedMessage
                                                    id={
                                                        "patient.register.email"
                                                    }
                                                />
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => {
                                                    this.handleOnChangeInput(e);
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label
                                                htmlFor="passWord"
                                                className="form-label"
                                            >
                                                <FormattedMessage
                                                    id={
                                                        "patient.register.passWord"
                                                    }
                                                />
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="passWord"
                                                name="passWord"
                                                value={passWord}
                                                onChange={(e) => {
                                                    this.handleOnChangeInput(e);
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label
                                                htmlFor="confirmPassword"
                                                className="form-label"
                                            >
                                                <FormattedMessage
                                                    id={
                                                        "patient.register.confirm"
                                                    }
                                                />
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    this.handleOnChangeInput(e);
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-lg-6 col-sm-12">
                                            <label
                                                htmlFor="firstName"
                                                className="form-label"
                                            >
                                                <FormattedMessage
                                                    id={
                                                        "patient.register.firstName"
                                                    }
                                                />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                value={firstName}
                                                onChange={(e) => {
                                                    this.handleOnChangeInput(e);
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-lg-6 col-sm-12">
                                            <label
                                                htmlFor="lastName"
                                                className="form-label"
                                            >
                                                <FormattedMessage
                                                    id={
                                                        "patient.register.lastName"
                                                    }
                                                />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                value={lastName}
                                                onChange={(e) => {
                                                    this.handleOnChangeInput(e);
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label
                                                htmlFor="phoneNumber"
                                                className="form-label"
                                            >
                                                <FormattedMessage
                                                    id={
                                                        "patient.register.phoneNumber"
                                                    }
                                                />
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    this.handleOnChangeInput(e);
                                                }}
                                                required
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
                                                    id={
                                                        "patient.booking-modal.gender"
                                                    }
                                                />
                                            </label>
                                            <select
                                                className="form-control"
                                                id="inputGender"
                                                name="gender"
                                                value={gender}
                                                onChange={(event) =>
                                                    this.handleOnChangeInput(
                                                        event
                                                    )
                                                }
                                            >
                                                {genders &&
                                                    genders.length > 0 &&
                                                    genders.map(
                                                        (item, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.lable}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-register"
                                                onClick={(e) => {
                                                    this.handleRegister(e);
                                                }}
                                            >
                                                <FormattedMessage
                                                    id={
                                                        "patient.register.register"
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="register-bg_img col-6">
                        <div className="style_shape__1HA08"></div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
        isLoggedIn: state.user.isLoggedIn,
        gendersFromRedux: state.user.genders,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllGender: () => {
            dispatch(actions.getAllGenderAction());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
