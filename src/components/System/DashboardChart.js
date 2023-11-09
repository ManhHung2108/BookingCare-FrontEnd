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

import { getBookingCountsByMonthService } from "../../services";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
        title: {
            display: true,
            text: "Thống kê đặt lịch theo tháng",
        },
    },
};

export default class DashboardChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null,
            chartDataBookingCancle: null,
        };
    }

    async componentDidMount() {
        let res = await getBookingCountsByMonthService();

        if (res && res.errCode === 0) {
            if (res && res.data && res.data.resultsBooking.length > 0) {
                this.builData(res.data);
            }
        }
    }

    builData = (inputData) => {
        console.log(inputData);
        // Xử lý dữ liệu để đưa vào biểu đồ
        let labels = inputData.resultsBooking.map((entry) => entry.month);
        let counts = inputData.resultsBooking.map((entry) => entry.quantity);
        let countsCancle = inputData.resultsBookingCancle.map(
            (entry) => entry.quantity
        );

        // console.log("check labels", labels);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Số lượng lịch hủy",
                    data: countsCancle,
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "Số lượng lịch đặt khám",
                    data: counts,
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
            ],
        };

        this.setState({
            chartData: data,
        });
    };

    render() {
        const { chartData } = this.state;
        return (
            <>
                {chartData &&
                chartData.labels &&
                chartData.labels.length > 0 ? (
                    <Bar options={options} data={chartData} />
                ) : (
                    <p>No data available</p>
                )}
            </>
        );
    }
}
