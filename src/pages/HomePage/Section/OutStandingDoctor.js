import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Buffer } from "buffer";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";

import { LANGUAGE } from "../../../utils";
import { getTopDoctorAction } from "../../../redux/actions";

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    async componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            //Khi có thay đổi data thì gọi lại loadTopDoctors
            this.setState({ arrDoctors: this.props.topDoctorsRedux });
            // this.props.loadTopDoctors();
        }
    }

    render() {
        const { topDoctorsRedux, language } = this.props;
        // console.log("Check props topDoctors from redux: ", topDoctorsRedux);

        const handleDetailDoctor = (doctor) => {
            this.props.history.push(`detail-doctor/${doctor.id}`);
        };

        const renderTopDoctor = () => {
            return this.state.arrDoctors.map((doctor, index) => {
                let imageBase64 = "";
                if (doctor.image) {
                    //decode từ base64 để lấy ra ảnh dạng binary
                    imageBase64 = new Buffer(doctor.image, "base64").toString(
                        "binary"
                    );
                }
                let nameVi = `${doctor.positionData.valueVi}, ${doctor.firstName} ${doctor.lastName}`;
                let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;

                return (
                    <div
                        className="section-customize"
                        key={doctor.id}
                        onClick={() => {
                            handleDetailDoctor(doctor);
                        }}
                    >
                        <div className="container-content">
                            <div
                                className="bg-img outstanding-doctor-img"
                                style={{
                                    backgroundImage: `url(${imageBase64})`,
                                }}
                            ></div>
                            <div className="description text-center">
                                <div>
                                    {language === LANGUAGE.VI ? nameVi : nameEn}
                                </div>
                                <span>Cơ xương khớp</span>
                            </div>
                        </div>
                    </div>
                );
            });
        };

        return (
            <div className="section-share section-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.out-standing-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {topDoctorsRedux && topDoctorsRedux.length > 0
                                ? renderTopDoctor()
                                : ""}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topDoctorsRedux: state.adminReducer.topDoctors,
        language: state.appReducer.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => {
            return dispatch(getTopDoctorAction());
        },
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
