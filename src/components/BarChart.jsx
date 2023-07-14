import React from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title } from "chart.js/auto";
function BarChart({ datos }) {
    return (<Bar data={datos} />);
}

export default BarChart