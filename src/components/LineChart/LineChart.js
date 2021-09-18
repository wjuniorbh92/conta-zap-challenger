import { Line } from "react-chartjs-2";
import React from "react";

export default function LineChart({ labels, label, dataGraph }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: dataGraph,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} width={500} height={250} options={options} />
    </div>
  );
}
