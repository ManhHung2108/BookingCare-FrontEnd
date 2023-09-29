import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

import configs from "../../configs";
import "./HamburgerMenu.scss";

export default class HamburgerMenu extends Component {
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
            {
                link: configs.routes.LOGIN,
                nameVi: "Đăng nhập",
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
                    </ul>
                </nav>
            </>
        );
    }
}
