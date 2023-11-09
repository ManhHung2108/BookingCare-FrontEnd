import { Card, Space, Statistic } from "antd";

import React, { Component } from "react";

export default class DashboardCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Card>
                    <Space direction="horizontal" style={{ display: "flex" }}>
                        {this.props.icon}
                        <Statistic
                            title={this.props.title}
                            value={this.props.value}
                        />
                    </Space>
                </Card>
            </div>
        );
    }
}
