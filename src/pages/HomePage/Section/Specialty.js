import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Specialty.scss";
import specialtyImg from "../../../assets/specialty/112457-co-xuong-khop.jpg";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                background: "#fff",
                justifyContent: "center",
                alignItems: "center",
                transform: "translate(25%, -70%)",
                width: "44px",
                height: "48px",
                border: "2px solid #d7d7d7",
                opacity: "0.5",
                textAlign: "center",
            }}
            onClick={onClick}
        >
            <i
                className="fas fa-angle-right"
                style={{ fontSize: "30px", color: "#959595", opacity: 0.5 }}
            ></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                background: "#fff",
                justifyContent: "center",
                alignItems: "center",
                transform: "translate(-25%, -70%)",
                width: "44px",
                height: "48px",
                border: "2px solid #d7d7d7",
                opacity: "0.5",
                textAlign: "center",
            }}
            onClick={onClick}
        >
            <i
                className="fas fa-angle-left"
                style={{ fontSize: "30px", color: "#959595", opacity: 0.5 }}
            ></i>
        </div>
    );
}

class Specialty extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section">
                            Chuyên khoa phổ biến
                        </span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...settings}>
                            <div className="specialty-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Specialty);
