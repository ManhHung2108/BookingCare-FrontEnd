import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom/cjs/react-router-dom";

import { LANGUAGE } from "../../utils";
import { changeLanguageAppAction } from "../../redux/actions";
import routes from "../../configs/routes";

import "./HomeHeader.scss";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    handleOpenMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        let language = this.props.lang;
        let { isShowBanner } = this.props;
        // console.log(language);
        return (
            <Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i
                                className="fas fa-bars"
                                onClick={() => {
                                    this.handleOpenMenu();
                                }}
                            ></i>
                            <Link to={routes.HOMEPAGE} className="header-logo">
                                <i className="fas fa-heartbeat"></i>
                                <span>HealthBookings</span>
                            </Link>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.speciality" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.health-facility" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.doctor" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.fee" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="right_content-container">
                                <div className="support">
                                    <div>
                                        <i className="fas fa-question-circle"></i>
                                        <span>
                                            <FormattedMessage id="homeHeader.support" />
                                        </span>
                                    </div>
                                    <span>0986-938-375</span>
                                </div>
                                <div
                                    className={
                                        language === LANGUAGE.VI
                                            ? "language-vi active"
                                            : "language-vi"
                                    }
                                >
                                    <span
                                        onClick={() => {
                                            this.props.changeLanguage(
                                                LANGUAGE.VI
                                            );
                                        }}
                                    >
                                        VN
                                    </span>
                                </div>
                                <div
                                    className={
                                        language === LANGUAGE.EN
                                            ? "language-en active"
                                            : "language-en"
                                    }
                                >
                                    <span
                                        onClick={() => {
                                            this.props.changeLanguage(
                                                LANGUAGE.EN
                                            );
                                        }}
                                    >
                                        EN
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isShowBanner && (
                    <div className="home-header-banner">
                        <div className="search">
                            <div className="title">
                                <h1>
                                    <FormattedMessage id="banner.title1" />
                                    <br></br>
                                    <b>
                                        <FormattedMessage id="banner.title2" />
                                    </b>
                                </h1>
                            </div>
                            <div className="search-form">
                                <div className="search-input">
                                    <i className="fas fa-search"></i>
                                    <input type="text" placeholder="Tìm kiếm" />
                                </div>
                                <div className="search-result">
                                    <div className="search-result_specialties">
                                        <h3>Chuyên khoa</h3>
                                        <a href="/#">
                                            <div
                                                className="image"
                                                style={{
                                                    backgroundImage: `url(${require("../../assets/images/specialty/112457-co-xuong-khop.jpg")})`,
                                                }}
                                            ></div>
                                            <h4>Thần kinh</h4>
                                            <div className="xoa"></div>
                                        </a>
                                        <a href="/#">
                                            <div
                                                className="image"
                                                style={{
                                                    backgroundImage: `url(${require("../../assets/images/specialty/112457-co-xuong-khop.jpg")})`,
                                                }}
                                            ></div>
                                            <h4>Thần kinh</h4>
                                            <div className="xoa"></div>
                                        </a>
                                    </div>
                                    <div className="search-result_clinics">
                                        <h3>Phòng khám</h3>
                                    </div>
                                    <div className="search-result_doctors">
                                        <h3>Bác sĩ</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="options">
                            <div className="options-container">
                                <div className="option-child">
                                    <div
                                        className="icon-child"
                                        style={{
                                            backgroundImage: `url(${require("../../assets/images/icon-menu/161905-iconkham-chuyen-khoa.png")})`,
                                        }}
                                    ></div>
                                    <p className="text-child">
                                        <FormattedMessage id="banner.examination" />
                                        <br />
                                        <FormattedMessage id="banner.speciality" />
                                    </p>
                                </div>
                                <div className="option-child">
                                    <div
                                        className="icon-child"
                                        style={{
                                            backgroundImage: `url(${require("../../assets/images/icon-menu/161817-iconkham-tu-xa.png")})`,
                                        }}
                                    ></div>
                                    <p className="text-child">
                                        <FormattedMessage id="banner.examination" />
                                        <br />
                                        <FormattedMessage id="banner.remote" />
                                    </p>
                                </div>
                                <div className="option-child">
                                    <div
                                        className="icon-child"
                                        style={{
                                            backgroundImage: `url(${require("../../assets/images/icon-menu/161350-iconkham-tong-quan.png")})`,
                                        }}
                                    ></div>
                                    <p className="text-child">
                                        <FormattedMessage id="banner.examination" />
                                        <br />
                                        <FormattedMessage id="banner.generality" />
                                    </p>
                                </div>
                                <div className="option-child">
                                    <div
                                        className="icon-child"
                                        style={{
                                            backgroundImage: `url(${require("../../assets/images/icon-menu/161340-iconxet-nghiem-y-hoc.png")})`,
                                        }}
                                    ></div>
                                    <p className="text-child">
                                        <FormattedMessage id="banner.test" />
                                        <br />
                                        <FormattedMessage id="banner.medical" />
                                    </p>
                                </div>
                                <div className="option-child">
                                    <div
                                        className="icon-child"
                                        style={{
                                            backgroundImage: `url(${require("../../assets/images/icon-menu/161403-iconsuc-khoe-tinh-than.png")})`,
                                        }}
                                    ></div>
                                    <p className="text-child">
                                        <FormattedMessage id="banner.health" />
                                        <br />
                                        <FormattedMessage id="banner.spirit" />
                                    </p>
                                </div>
                                <div className="option-child">
                                    <div
                                        className="icon-child"
                                        style={{
                                            backgroundImage: `url(${require("../../assets/images/icon-menu/161410-iconkham-nha-khoa.png")})`,
                                        }}
                                    ></div>
                                    <p className="text-child">
                                        <FormattedMessage id="banner.examination" />
                                        <br />
                                        <FormattedMessage id="banner.dentistry" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <HamburgerMenu
                    isOpen={this.state.isOpen}
                    handleOpenMenuFromHeader={this.handleOpenMenu}
                />
            </Fragment>
        );
    }
}

//lấy state của redux vào props của react
const mapStateFromToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.appReducer.language,
    };
};

//gửi action lên redux(fire redux event)
const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (language) => {
            dispatch(changeLanguageAppAction(language));
        },
    };
};

export default connect(mapStateFromToProps, mapDispatchToProps)(HomeHeader); //kết nối react-redux
