import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { getAllSpecialtyService } from "../../../services";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],
        };
    }
    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                listSpecialty: res.data ? res.data : [],
            });
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    };

    render() {
        const { listSpecialty } = this.state;
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage
                                id={"homepage.popular-specialties"}
                            />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {listSpecialty &&
                                listSpecialty.map((item) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={item.id}
                                            onClick={() => {
                                                this.handleViewDetailSpecialty(
                                                    item
                                                );
                                            }}
                                        >
                                            <div
                                                className="bg-img specialty-img"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            ></div>
                                            <div className="description">
                                                {item.nameVi}
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
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
