import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";

export default class HandBook extends Component {
    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.hand-book" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-img handbook-img"></div>
                                <div className="description">
                                    Cơ xương khớp 1
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img handbook-img"></div>
                                <div className="description">
                                    Cơ xương khớp 2
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img handbook-img"></div>
                                <div className="description">
                                    Cơ xương khớp 3
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img handbook-img"></div>
                                <div className="description">
                                    Cơ xương khớp 4
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img handbook-img"></div>
                                <div className="description">
                                    Cơ xương khớp 5
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img handbook-img"></div>
                                <div className="description">
                                    Cơ xương khớp 6
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}
