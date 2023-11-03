import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { getAllClinicService } from "../../../services";
import { LANGUAGE } from "../../../utils";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: [],
        };
    }
    async componentDidMount() {
        let res = await getAllClinicService();
        if (res && res.errCode === 0) {
            this.setState({
                listClinic: res.data ? res.data : [],
            });
        }
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    };

    render() {
        const { listClinic } = this.state;
        const { language } = this.props;
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-medical-facilities" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.text-search" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {listClinic &&
                                listClinic.map((item) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={item.id}
                                            onClick={() => {
                                                this.handleViewDetailClinic(
                                                    item
                                                );
                                            }}
                                        >
                                            <div
                                                className="bg-img medical-facility-img"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            ></div>
                                            <div className="description text-center">
                                                {language === LANGUAGE.VI
                                                    ? item.nameVi
                                                    : item.nameEn}
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
