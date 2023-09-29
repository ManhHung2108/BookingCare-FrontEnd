import React, { Component } from "react";
import { connect } from "react-redux";

import HomeHeader from "../HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorAction } from "../../../redux/actions";
import { LANGUAGE } from "../../../utils";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetail: {},
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            this.handleGetDetailDoctor(this.props.match.params.id);
        }
    }
    componentDidUpdate(prevProps, prevStates, snapshot) {
        if (prevProps.doctorDetailRedux !== this.props.doctorDetailRedux) {
            this.setState({
                doctorDetail: this.props.doctorDetailRedux,
            });
        }
    }

    handleGetDetailDoctor = (id) => {
        this.props.getDetailDoctor(id);
    };
    render() {
        // console.log(this.props.match.params.id);
        // console.log(
        //     "check doctorDetail from Redux: ",
        //     this.props.doctorDetailRedux
        // );

        let { doctorDetail } = this.state;
        let { language } = this.props;
        let nameVi = "",
            nameEn = "";
        if (doctorDetail && doctorDetail.positionData) {
            nameVi = `${doctorDetail.positionData.valueVi}, ${doctorDetail.firstName} ${doctorDetail.lastName}`;
            nameEn = `${doctorDetail.positionData.valueEn}, ${doctorDetail.lastName} ${doctorDetail.firstName}`;
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="container-fluid">
                    <div className="intro-doctor container">
                        <div
                            className="intro-left"
                            style={{
                                backgroundImage: `url(${
                                    doctorDetail.image ? doctorDetail.image : ""
                                })`,
                            }}
                        ></div>
                        <div className="intro-right">
                            <div className="intro-right_up">
                                {language === LANGUAGE.VI ? nameVi : nameEn}
                            </div>
                            <div className="intro-right_down">
                                {doctorDetail &&
                                    doctorDetail.Markdown &&
                                    doctorDetail.Markdown.description && (
                                        <span>
                                            {doctorDetail.Markdown.description}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor"></div>
                    <div className="detail-container">
                        <div className="detail-doctor container">
                            {doctorDetail &&
                                doctorDetail.Markdown &&
                                doctorDetail.Markdown.contentHTML && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: doctorDetail.Markdown
                                                .contentHTML,
                                        }}
                                    ></div>
                                )}
                        </div>
                        <div className="comments-doctor"></div>
                    </div>
                </div>
            </>
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
    return {
        getDetailDoctor: (id) => {
            dispatch(getDetailDoctorAction(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
