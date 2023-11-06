import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

import configs from "../../configs";
import "./HamburgerMenu.scss";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

class HamburgerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                isOpen: this.props.isOpen,
            });
        }
    }

    handleMenuOpen = () => {
        this.props.handleOpenMenuFromHeader();
    };
    render() {
        const { userInfo, language, isLoggedIn } = this.props;

        const menus = [
            {
                link: configs.routes.HOMEPAGE,
                nameVi: "Trang chủ",
            },
            {
                link: "/histories",
                nameVi: "Xem lịch sử khám bệnh",
            },
            {
                link: "/contact",
                nameVi: "Liên hệ",
            },
            {
                link: "/article",
                nameVi: "Điều khoản sử dụng",
            },
        ];

        return (
            <>
                <div
                    className={`nen-mo ${this.state.isOpen ? "display" : ""}`}
                    onClick={this.handleMenuOpen}
                ></div>
                <nav
                    className={`navbar-container ${
                        this.state.isOpen ? "open" : ""
                    }`}
                >
                    <ul className="navbar-content">
                        {menus.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        this.handleMenuOpen();
                                    }}
                                >
                                    <Link to={item.link}>{item.nameVi}</Link>
                                </li>
                            );
                        })}
                        {isLoggedIn === false ? (
                            <li>
                                <Link to={configs.routes.LOGIN}>Đăng Nhập</Link>
                            </li>
                        ) : (
                            <li>
                                <a
                                    href="/logout"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        this.props.processLogout();
                                    }}
                                >
                                    Đăng Xuất
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        language: state.appReducer.language,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);
