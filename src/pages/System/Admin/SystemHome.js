import React, { Component } from "react";
import { UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHospital,
    faStethoscope,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import "./SystemHome.scss";
import DashboardCard from "../../../components/System/DashboardCard";
import DashboardChart from "../../../components/System/DashboardChart";

export default class SystemHome extends Component {
    render() {
        return (
            <div className="admin-home">
                <div className="admin-home_title">
                    <h1>Chào mừng đến trang quản trị</h1>
                </div>

                <Space direction="horizontal">
                    <DashboardCard
                        icon={
                            <UserOutlined
                                style={{
                                    fontSize: "20px",
                                    color: "green",
                                    backgroundColor: "rgba(0, 255, 0, 0.25)",
                                    borderRadius: "50%",
                                    padding: "8px",
                                }}
                            />
                        }
                        title={"User"}
                        value={1000}
                    />
                    <DashboardCard
                        icon={
                            <FontAwesomeIcon
                                icon={faHospital}
                                style={{
                                    fontSize: "20px",
                                    color: "rgba(22, 119, 255, 0.75)",
                                    backgroundColor: "rgba(22, 119, 255, 0.25)",
                                    borderRadius: "50%",
                                    padding: "8px",
                                }}
                            />
                        }
                        title={"Clinic"}
                        value={1500}
                    />
                    <DashboardCard
                        icon={
                            <FontAwesomeIcon
                                icon={faUserDoctor}
                                style={{
                                    fontSize: "20px",
                                    color: "red",
                                    backgroundColor: "rgba(255, 0, 0, 0.25)",
                                    borderRadius: "50%",
                                    padding: "8px",
                                }}
                            />
                        }
                        title={"Doctor"}
                        value={2000}
                    />
                </Space>
                <div className="mt-5">
                    <DashboardChart />
                </div>
            </div>
        );
    }
}
