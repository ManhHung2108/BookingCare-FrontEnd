import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutStandingDoctor extends Component {
    render() {
        return (
            <div className="section-share section-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Bác sĩ nổi bật</span>
                        <button className="btn-section">Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="container-content">
                                    <div className="bg-img outstanding-doctor-img"></div>
                                    <div className="description text-center">
                                        <div>Giáo sư, Tiến sĩ Đỗ Hùng </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="container-content">
                                    <div className="bg-img outstanding-doctor-img"></div>
                                    <div className="description text-center">
                                        <div>Giáo sư, Tiến sĩ Đỗ Hùng </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="container-content">
                                    <div className="bg-img outstanding-doctor-img"></div>
                                    <div className="description text-center">
                                        <div>Giáo sư, Tiến sĩ Đỗ Hùng </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="container-content">
                                    <div className="bg-img outstanding-doctor-img"></div>
                                    <div className="description text-center">
                                        <div>Giáo sư, Tiến sĩ Đỗ Hùng </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="container-content">
                                    <div className="bg-img outstanding-doctor-img"></div>
                                    <div className="description text-center">
                                        <div>Giáo sư, Tiến sĩ Đỗ Hùng </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(OutStandingDoctor);
