import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

import { LANGUAGE } from "../../../utils";
import * as actions from "../../../redux/actions";
import "./UserReduxManage.scss";

class UserReduxManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            previewImgUrl: "",
            isOpen: false,
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            //Tạo đường link ảo của HTML để xem được biến obj
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
            });

            console.log("check file: ", objectUrl); //copy đường link này lên url để xem
        }
    };

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        //Chưa có ảnh click sẽ ko cho setState để mở preview full màn hình

        this.setState({
            isOpen: true,
        });
    };

    render() {
        let { language, genders, isLoadingGender, roles, positions } =
            this.props;
        // console.log("check props from redux: ", this.props);

        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id={"manage-user.title"} />
                </div>
                <div className="user-reudx-body">
                    <div className="container">
                        <form className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id={"manage-user.add"} />
                            </div>
                            <div className="col-12">
                                {isLoadingGender && "Loading..."}
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage
                                        id={"manage-user.email"}
                                    />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage
                                        id={"manage-user.passWord"}
                                    />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    autoComplete="off"
                                    name="passWord"
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage
                                        id={"manage-user.firstName"}
                                    />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="firstName"
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage
                                        id={"manage-user.lastName"}
                                    />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="lastName"
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage
                                        id={"manage-user.phoneNumber"}
                                    />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="phoneNumber"
                                />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage
                                        id={"manage-user.address"}
                                    />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="address"
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="inputGender">
                                    <FormattedMessage
                                        id={"manage-user.gender"}
                                    />
                                </label>
                                <select
                                    className="form-control"
                                    id="inputGender"
                                    name="gender"
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={item.id}>
                                                    {language === LANGUAGE.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="inputPosition">
                                    <FormattedMessage
                                        id={"manage-user.position"}
                                    />
                                </label>
                                <select
                                    className="form-control"
                                    id="inputPosition"
                                    name="positionId"
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={item.id}>
                                                    {language === LANGUAGE.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="inputRole">
                                    <FormattedMessage id={"manage-user.role"} />
                                </label>
                                <select
                                    className="form-control"
                                    id="inputRole"
                                    name="roleId"
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item) => {
                                            return (
                                                <option key={item.id}>
                                                    {language === LANGUAGE.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="inputImg">
                                    <FormattedMessage id={"manage-user.img"} />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="preview-img"
                                        type="file"
                                        hidden
                                        onChange={(event) => {
                                            this.handleOnchangeImage(event);
                                        }}
                                    />
                                    <label
                                        htmlFor="preview-img"
                                        className="lable-upload"
                                    >
                                        Tải ảnh
                                        <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="preview-image"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgUrl})`,
                                        }}
                                        onClick={() => {
                                            this.openPreviewImg();
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary">
                                    <FormattedMessage id={"manage-user.save"} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/**Xử lý mở to người dùng click preview Image sẽ được phóng to */}
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
        genders: state.adminReducer.genders,
        isLoadingGender: state.adminReducer.isLoadingGender,
        positions: state.adminReducer.positions,
        roles: state.adminReducer.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => {
            return dispatch(actions.fecthGenderStart());
        },
        getPositionStart: () => {
            return dispatch(actions.fecthPositionStart());
        },
        getRoleStart: () => {
            return dispatch(actions.fecthRoleStart());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReduxManage);
