import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./DetailClinic.scss";
import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
    getDetailClinicByIdService,
    getAllCodeService,
} from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import _ from "lodash";

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            readMoreDesc: false,
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicByIdService({
                id: id,
                location: "ALL",
            });

            console.log(res);

            let provinces = await getAllCodeService("PROVINCE");

            // console.log("check res from DetailClinic: ", provinces);

            if (
                res &&
                res.errCode === 0 &&
                provinces &&
                provinces.errCode === 0
            ) {
                let arrDoctorId = [];
                let arrProvince = [];
                if (res.data && !_.isEmpty(res.data)) {
                    let listDoctor = res.data.doctorClinic;
                    if (listDoctor && listDoctor.length > 0) {
                        arrDoctorId = listDoctor.map((item, index) => {
                            return item.doctorId;
                        });
                    }
                }
                if (provinces && provinces.data.length > 0) {
                    arrProvince = provinces.data;
                    arrProvince.unshift({
                        keyMap: "ALL",
                        createdAt: null,
                        type: "PROVINCE",
                        valueVi: "Toàn quốc",
                        valueEn: "ALL",
                    });
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: arrProvince ? arrProvince : [],
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeSelect = async (event) => {
        // console.log("check onChange: ", event.target.value);
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailClinicByIdService({
                id: id,
                location: location,
            });

            if (res && res.errCode === 0) {
                let arrDoctorId = [];

                if (res.data && !_.isEmpty(res.data)) {
                    let listDoctor = res.data.doctorClinic;
                    if (listDoctor && listDoctor.length > 0) {
                        arrDoctorId = listDoctor.map((item, index) => {
                            return item.doctorId;
                        });
                    }
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    };
    render() {
        let { arrDoctorId, dataDetailClinic, readMoreDesc, listProvince } =
            this.state;
        let { language } = this.props;
        return (
            <>
                <div className="detail-specialty_container">
                    <HomeHeader />
                    <div
                        className="description-specialty_background"
                        style={{
                            backgroundImage: `url(${dataDetailClinic.image})`,
                        }}
                    >
                        <div className="description-specialty">
                            <div className="description-specialty_content">
                                {/* <div className="specialty_header">
                                    <h1 data-title="Cơ Xương Khớp">
                                        {dataDetailSpecialty &&
                                        language === LANGUAGE.VI
                                            ? dataDetailClinic.nameVi
                                            : dataDetailClinic.nameEn}
                                    </h1>
                                </div> */}
                                <div
                                    className={`more ${
                                        readMoreDesc
                                            ? "more-display"
                                            : "more-hiden"
                                    }`}
                                >
                                    <div className="specialty_content">
                                        {dataDetailClinic &&
                                            !_.isEmpty(dataDetailClinic) && (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: dataDetailClinic.descriptionHTML,
                                                    }}
                                                ></div>
                                            )}
                                    </div>
                                    <div className="specialty-btn">
                                        <div
                                            className="btn_display"
                                            onClick={() => {
                                                this.setState({
                                                    readMoreDesc: true,
                                                });
                                            }}
                                        >
                                            Đọc thêm
                                        </div>

                                        <div
                                            className="btn_hiden"
                                            onClick={() => {
                                                this.setState({
                                                    readMoreDesc: false,
                                                });
                                            }}
                                        >
                                            Ẩn
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-specialty_body">
                        <div className="filter-doctor">
                            <select
                                onChange={(event) => {
                                    this.handleOnChangeSelect(event);
                                }}
                            >
                                {listProvince &&
                                    listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGE.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="list-doctor">
                            {arrDoctorId &&
                                arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return (
                                        <div
                                            className="doctor-item"
                                            key={index}
                                        >
                                            <div className="doctor-item_left">
                                                <div className="profile-doctor">
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        isShowDescription={true}
                                                        isShowLinkDetail={true}
                                                        isShowPrice={false}
                                                    />
                                                </div>
                                            </div>
                                            <div className="doctor-item_right">
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                                <DoctorExtraInfor
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <HomeFooter />
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
