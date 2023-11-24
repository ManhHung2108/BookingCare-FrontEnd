import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faKey } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";

import { CommonUtils, LANGUAGE } from "../../../utils";
import "./ManageProfile.scss";
import ProfileUser from "../../../components/ProfileUser";

const { TabPane } = Tabs;

class ManageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: "",
            birthDay: "",
            selectedGender: "",

            previewImgUrl: "",

            genders: "",
        };
    }

    handleTab = (e) => {
        // console.log(e);
    };

    render() {
        return (
            <div className="manage-profile-container container">
                <div className="manage-profile-header">
                    <h4 className="manage-profile-title">Manage Profile</h4>
                    <nav className="">
                        <ol className="breadcrums">
                            <li>
                                <Link to={"/system/home"}>Dashboard</Link>
                            </li>
                            <li className="breadcrums-separator">
                                <span className="doot"></span>
                            </li>
                            <li>
                                <Link to={"/system/manage-profile"}>
                                    Profile
                                </Link>
                            </li>
                            <li className="breadcrums-separator">
                                <span className="doot"></span>
                            </li>
                            <li>
                                <div>Account</div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="manage-profile-body">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.handleTab}
                        className="custom-tabs"
                    >
                        <TabPane
                            key="1"
                            tab={
                                <span>
                                    <FontAwesomeIcon
                                        icon={faIdCard}
                                        style={{
                                            fontSize: "1rem",
                                            marginRight: "5px",
                                        }}
                                    />
                                    General
                                </span>
                            }
                        >
                            <ProfileUser />
                        </TabPane>
                        <TabPane
                            key="2"
                            tab={
                                <span>
                                    <FontAwesomeIcon
                                        icon={faKey}
                                        style={{
                                            fontSize: "1rem",
                                            marginRight: "5px",
                                        }}
                                    />
                                    Security
                                </span>
                            }
                        >
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfile);
