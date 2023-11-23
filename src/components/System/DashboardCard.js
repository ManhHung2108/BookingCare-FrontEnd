import { Card, Space, Statistic, Typography } from "antd";

import React, { Component } from "react";

export default class DashboardCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Card style={{ width: "calc(30% - 10px)", minWidth: "150px" }}>
                <Space
                    direction="horizontal"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Space direction="vertical">
                        <Typography.Text>{this.props.title}</Typography.Text>
                        <Statistic
                            value={this.props.value}
                            style={{ fontWeight: "600" }}
                        />
                    </Space>
                    {this.props.icon}
                </Space>
            </Card>
        );
    }
}
