import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Dummy Data
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Orders",
      data: [40, 60, 80, 50, 100, 90, 50, 10],
      backgroundColor: "rgba(153, 102, 255, 0.6)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
};

// Optional Chart Options
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
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const BarChart = () => {
  return (
    <div className="p-4 w-full h-full">
      <h2 className="text-lg font-bold mb-4">Monthly Orders</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
