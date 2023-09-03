import React, { Component } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default class HomeFooter extends Component {
    render() {
        return (
            <footer>
                <div className="home-footer px-5">
                    <div className="row">
                        <div className="col-6">
                            <NavLink to="/home">
                                <img
                                    className="footer-logo"
                                    src={require("../../assets/images/LogoWebsite.PNG")}
                                    alt="HealthBookings"
                                />
                            </NavLink>
                            <div className="footer-company">
                                <h2>Đại Học Mở Hà Nội</h2>
                                <p>
                                    <span>
                                        <i className="fas fa-map-marker-alt"></i>
                                    </span>{" "}
                                    96 phố Định Công, Quận Thanh Xuân, Thành Phố
                                    Hà Nội, Việt Nam
                                </p>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-3">
                            <div className="footer-address">
                                <strong>Trụ sở Hà Nội</strong>
                                <br />
                                96 phố Định Công, Quận Thanh Xuân, Thành Phố Hà
                                Nội, Việt Nam
                            </div>
                            <div className="footer-address">
                                <strong>Hỗ trợ khách hàng</strong>
                                <br />
                                manhhung210801@gmail.com
                            </div>
                            <div className="footer-address">
                                <strong>Hotline</strong>
                                <br />
                                <span>0986-938-375</span> {"(7h30 - 18h)"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-footer2 text-center">
                    <small>&copy; HealthBookings.</small>
                </div>
            </footer>
        );
    }
}
