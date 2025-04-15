import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x-axis
  LinearScale, // y-axis
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Dummy data
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Users",
      data: [120, 190, 300, 500, 200, 300],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.4,
    },
  ],
};

// Optional: chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
  Users: {
    y: {
      beginAtZero: true,
    },
  },
};

const LineChart = () => {
  return (
    <div className="w-full h-full p-4 rounded-2xl shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
