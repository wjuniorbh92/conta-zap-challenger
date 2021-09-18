// import {  useState } from "react";
import React from "react";
import { Bar } from "react-chartjs-2";
// import api from "../../services/api";

export default function BarChart({ label, dataGraph, labels }) {
  // const [optionSelected, setOptionSelected] = useState("");

  // const [options, setOptions] = useState([]);

  const data = {
    labels: labels,

    datasets: [
      {
        label: label,
        data: dataGraph,
        backgroundColor: ["blue", "tomato", "green", "red"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div>
        <Bar
          data={data}
          width={400}
          height={350}
          options={{ maintainAspectRatio: false, indexAxis: "y" }}
          redraw={false}
        />
      </div>
    </div>
  );
}
