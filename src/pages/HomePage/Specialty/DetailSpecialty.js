import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./DetailSpecialty.scss";
import HomeHeader from "../HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
    getDetailSpecialtyByIdService,
    getAllCodeService,
} from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import _ from "lodash";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
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
            let res = await getDetailSpecialtyByIdService({
                id: id,
                location: "ALL",
            });

            let provinces = await getAllCodeService("PROVINCE");

            console.log("check res from DetailSpecialty: ", provinces);
            if (
                res &&
                res.errCode === 0 &&
                provinces &&
                provinces.errCode === 0
            ) {
                let arrDoctorId = [];
                if (res.data && !_.isEmpty(res.data)) {
                    let listDoctor = res.data.doctorSpecialty;
                    if (listDoctor && listDoctor.length > 0) {
                        arrDoctorId = listDoctor.map((item, index) => {
                            return item.doctorId;
                        });
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: provinces.data,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeSelect = (event) => {
        console.log("check onChange: ", event.target.value);
    };
    render() {
        let { arrDoctorId, dataDetailSpecialty, readMoreDesc, listProvince } =
            this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty_container">
                <HomeHeader />
                <div
                    className="description-specialty_background"
                    style={{
                        backgroundImage: `url(${dataDetailSpecialty.image})`,
                    }}
                >
                    <div className="description-specialty">
                        <div className="description-specialty_content">
                            {/* <div className="specialty_header">
                                <h1 data-title="Cơ Xương Khớp">
                                    {dataDetailSpecialty &&
                                    language === LANGUAGE.VI
                                        ? dataDetailSpecialty.nameVi
                                        : dataDetailSpecialty.nameEn}
                                </h1>
                            </div> */}
                            <div
                                className={`more ${
                                    readMoreDesc ? "more-display" : "more-hiden"
                                }`}
                            >
                                <div className="specialty_content">
                                    {dataDetailSpecialty &&
                                        !_.isEmpty(dataDetailSpecialty) && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: dataDetailSpecialty.descriptionHTML,
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
                            <option value={"ALL"}>Toàn quốc</option>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item) => {
                                    return (
                                        <option
                                            key={item.id}
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
                                    <div className="doctor-item" key={index}>
                                        <div className="doctor-item_left">
                                            <div className="profile-doctor">
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescription={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
