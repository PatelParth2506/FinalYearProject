import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

// Dummy data
const data = {
  labels: ["Electronics", "Fashion", "Home & Kitchen", "Books"],
  datasets: [
    {
      label: "Category Distribution",
      data: [300, 150, 100, 50],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};

const PieChart = () => {
  return (
    <div className="w-full h-full p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold">Sales by Category</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
