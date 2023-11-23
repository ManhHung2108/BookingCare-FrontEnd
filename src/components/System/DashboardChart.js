import React, { Component } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default class DashboardChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null,
        };
    }

    async componentDidMount() {
        if (this.props.chartData) {
            this.setState({
                chartData: this.props.chartData,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.chartData !== this.props.chartData) {
            this.setState({
                chartData: this.props.chartData,
            });
        }
    }

    render() {
        const { chartData } = this.state;
        const { titleChart } = this.props;

        const options = {
            responsive: true,
            maintainAspectRatio: false, // Tắt duy trì tỉ lệ khung hình, để biểu đồ có thể co dãn tự do

            plugins: {
                legend: {
                    position: "bottom",
                },
                title: {
                    display: true,
                    text: titleChart,
                },
            },
        };

        return (
            <div className="chart-item mt-5">
                {chartData &&
                chartData.labels &&
                chartData.labels.length > 0 ? (
                    <Bar options={options} data={chartData} height={400} />
                ) : (
                    <p>No data available</p>
                )}
            </div>
        );
    }
}
