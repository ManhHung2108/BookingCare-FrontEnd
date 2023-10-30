import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./DetailSpecialty.scss";
import HomeHeader from "../HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [2, 4],
        };
    }

    componentDidMount() {}
    render() {
        let { arrDoctorId } = this.state;
        return (
            <div className="detail-specialty_container">
                <HomeHeader />
                <div
                    className="description-specialty_background"
                    style={{
                        backgroundImage: `url(${require("../../../assets/images/specialty/112457-co-xuong-khop.jpg")})`,
                    }}
                >
                    <div className="description-specialty">
                        <div className="description-specialty_content">
                            <div className="specialty_header">
                                <h1 data-title="Cơ Xương Khớp">
                                    Cơ Xương Khớp
                                </h1>
                            </div>
                            <div className="more more-hiden">
                                <div className="specialty_content"></div>
                                <div className="specialty-btn">
                                    <a href="/#" className="btn_display">
                                        Đọc thêm
                                    </a>
                                    <a href="/#" className="btn_hiden">
                                        Ẩn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-specialty_body">
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
