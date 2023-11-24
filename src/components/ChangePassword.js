import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            isShowPassWord: false,
            errMessage: "",
        };
    }

    handleShowHidePassword = () => {
        //true thì để là text và cho hiện icon con mắt bị gạch
        this.setState({
            isShowPassWord: !this.state.isShowPassWord,
        });
    };

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState(
            {
                [name]: value,
            },
            () => {
                // console.log(this.state);
            }
        );
    };

    render() {
        return (
            <div className="change-password-container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 mt-3 login-input">
                        <label>Password</label>
                        <div className="custom-input-password">
                            <input
                                type={
                                    this.state.isShowPassWord
                                        ? "text"
                                        : "password"
                                }
                                className="form-control"
                                placeholder="Old password"
                                name="oldPassword"
                                value={this.state.oldPassword}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                autoComplete="off"
                            />
                            <span
                                onClick={() => {
                                    this.handleShowHidePassword();
                                }}
                            >
                                {this.state.isShowPassWord ? (
                                    <i className="far fa-eye-slash"></i>
                                ) : (
                                    <i className="far fa-eye"></i>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-12 col-sm-12 mt-3 login-input">
                        <label>
                            {/* <FormattedMessage
                                id={"admin.manage-profile.email"}
                            /> */}
                            Mật khẩu mới
                        </label>
                        <div className="custom-input-password">
                            <input
                                type={
                                    this.state.isShowPassWord
                                        ? "text"
                                        : "password"
                                }
                                className="form-control"
                                placeholder="New password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                autoComplete="off"
                            />
                            <span
                                onClick={() => {
                                    this.handleShowHidePassword();
                                }}
                            >
                                {this.state.isShowPassWord ? (
                                    <i className="far fa-eye-slash"></i>
                                ) : (
                                    <i className="far fa-eye"></i>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-12 col-sm-12 mt-3 login-input">
                        <label>
                            {/* <FormattedMessage
                                id={"admin.manage-profile.email"}
                            /> */}
                            Xác nhận mật khẩu mới
                        </label>
                        <div className="custom-input-password">
                            <input
                                type={
                                    this.state.isShowPassWord
                                        ? "text"
                                        : "password"
                                }
                                className="form-control"
                                placeholder="Confirm New password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                autoComplete="off"
                            />
                            <span
                                onClick={() => {
                                    this.handleShowHidePassword();
                                }}
                            >
                                {this.state.isShowPassWord ? (
                                    <i className="far fa-eye-slash"></i>
                                ) : (
                                    <i className="far fa-eye"></i>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="btn-save col-12">
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                this.handleSave(e);
                            }}
                        >
                            <FormattedMessage
                                id={"admin.manage-profile.save"}
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
