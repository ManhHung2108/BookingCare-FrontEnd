import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            Cơ sở y tế nổi bật
                        </span>
                        <button className="btn-section">Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-img medical-facility-img"></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img medical-facility-img"></div>
                                <div>Hệ thống thu cúc 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img medical-facility-img"></div>
                                <div>Hệ thống thu cúc 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img medical-facility-img"></div>
                                <div>Hệ thống thu cúc 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img medical-facility-img"></div>
                                <div>Hệ thống thu cúc 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img medical-facility-img"></div>
                                <div>Hệ thống thu cúc 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(MedicalFacility);
