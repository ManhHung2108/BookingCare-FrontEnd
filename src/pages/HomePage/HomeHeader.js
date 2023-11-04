import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom/cjs/react-router-dom";

import { LANGUAGE } from "../../utils";
import { changeLanguageAppAction } from "../../redux/actions";
import routes from "../../configs/routes";

import "./HomeHeader.scss";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { getSearchByNameService, getSearchService } from "../../services";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isFocused: false,
            searchQuery: "",
            listSearchClinic: [],
            listSearchDoctor: [],
            listSearchSpecialty: [],
        };
    }

    async componentDidMount() {
        let copyState = { ...this.state };
        let res = await getSearchService();
        if (res && res.errCode === 0) {
            copyState.listSearchClinic = res.data.resClinic;
            copyState.listSearchSpecialty = res.data.resSpecialty;
            copyState.listSearchDoctor = res.data.resDoctor;
        }
        this.setState({
            ...copyState,
        });
    }

    handleOpenMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    handleFocusSearch = async () => {
        this.setState({
            isFocused: true,
        });
    };

    handleBlurSearch = () => {
        this.setState({
            isFocused: false,
        });
    };

    handleOnChangeSearch = async (e, key) => {
        let copyState = { ...this.state };
        copyState[key] = e.target.value;
        this.setState({
            ...copyState,
        });
        if (copyState.searchQuery === "") {
            let res = await getSearchService();
            if (res && res.errCode === 0) {
                copyState.listSearchClinic = res.data.resClinic;
                copyState.listSearchSpecialty = res.data.resSpecialty;
                copyState.listSearchDoctor = res.data.resDoctor;
                this.setState({
                    ...copyState,
                });
            }
        }
    };

    handleEnterSearch = async (e) => {
        const { searchQuery } = this.state;
        let copyState = { ...this.state };
        if (searchQuery) {
            if (e.key === "Enter") {
                let res = await getSearchByNameService(searchQuery);
                if (res && res.errCode === 0) {
                    copyState.listSearchClinic = res.data.resClinic;
                    copyState.listSearchSpecialty = res.data.resSpecialty;
                    copyState.listSearchDoctor = res.data.resDoctor;
                }

                this.setState({
                    ...copyState,
                });
            }
        }
    };

    render() {
        let language = this.props.lang;
        let { isShowBanner } = this.props;
        let {
            isFocused,
            searchQuery,
            listSearchClinic,
            listSearchDoctor,
            listSearchSpecialty,
        } = this.state;
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
                            <div
                                className={`search-form ${
                                    isFocused ? "hien" : ""
                                }`}
                            >
                                <div className="search-input">
                                    <i className="fas fa-search"></i>
                                    <input
                                        value={searchQuery}
                                        type="text"
                                        placeholder={
                                            language === LANGUAGE.VI
                                                ? "Tìm kiếm"
                                                : "Search"
                                        }
                                        onFocus={() => {
                                            this.handleFocusSearch();
                                        }}
                                        onBlur={() => {
                                            // Sử dụng setTimeout để trì hoãn việc ẩn danh sách kết quả
                                            setTimeout(() => {
                                                this.handleBlurSearch();
                                            }, 200); // Thời gian trễ 200ms (có thể điều chỉnh)
                                        }}
                                        onChange={(e) => {
                                            this.handleOnChangeSearch(
                                                e,
                                                "searchQuery"
                                            );
                                        }}
                                        onKeyPress={(e) => {
                                            this.handleEnterSearch(e);
                                        }}
                                    />
                                </div>
                                <div className="search-result">
                                    <div className="search-result_specialties">
                                        <h3>
                                            <FormattedMessage id="banner.speciality" />
                                        </h3>
                                        {listSearchSpecialty &&
                                            listSearchSpecialty.length > 0 &&
                                            listSearchSpecialty.map(
                                                (item, index) => {
                                                    return (
                                                        <Link
                                                            to={`/detail-specialty/${item.id}`}
                                                            key={index}
                                                        >
                                                            <div
                                                                className="image"
                                                                style={{
                                                                    backgroundImage: `url(${item.image})`,
                                                                }}
                                                            ></div>
                                                            <h4>
                                                                {language ===
                                                                LANGUAGE.VI
                                                                    ? item.nameVi
                                                                    : item.nameEn}
                                                            </h4>
                                                            <div className="xoa"></div>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                    </div>
                                    <div className="search-result_clinics">
                                        <h3>
                                            <FormattedMessage id="banner.clinic" />
                                        </h3>
                                        {listSearchClinic &&
                                            listSearchClinic.length > 0 &&
                                            listSearchClinic.map(
                                                (item, index) => {
                                                    return (
                                                        <Link
                                                            to={`/detail-clinic/${item.id}`}
                                                            key={index}
                                                        >
                                                            <div
                                                                className="image"
                                                                style={{
                                                                    backgroundImage: `url(${item.image})`,
                                                                }}
                                                            ></div>
                                                            <h4>
                                                                {language ===
                                                                LANGUAGE.VI
                                                                    ? item.nameVi
                                                                    : item.nameEn}
                                                            </h4>
                                                            <div className="xoa"></div>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                    </div>
                                    <div className="search-result_doctors">
                                        <h3>
                                            <FormattedMessage id="banner.doctor" />
                                        </h3>
                                        {listSearchDoctor &&
                                            listSearchDoctor.length > 0 &&
                                            listSearchDoctor.map(
                                                (item, index) => {
                                                    return (
                                                        <Link
                                                            to={`/detail-doctor/${item.id}`}
                                                            key={index}
                                                        >
                                                            <div
                                                                className="image"
                                                                style={{
                                                                    backgroundImage: `url(${item.image})`,
                                                                }}
                                                            ></div>
                                                            <h4>
                                                                {language ===
                                                                LANGUAGE.VI
                                                                    ? `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`
                                                                    : `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`}
                                                            </h4>
                                                            <div className="xoa"></div>
                                                        </Link>
                                                    );
                                                }
                                            )}
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
