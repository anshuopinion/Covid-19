import React from "react";
import { Bar } from "react-chartjs-2";

import styles from "./BarChart.module.scss";
const BarChart = ({
  data: {
    totalconfirmed: confirmed,
    totalrecovered: recovered,
    totaldeceased: deaths,
  },
  stateName,
}) => {
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Active", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(255, 145, 0, 0.5)",
              "rgba(0, 255,0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              confirmed,
              confirmed - recovered - deaths,
              recovered,
              deaths,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        titile: { display: true, text: `Current State in ${stateName}` },

        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
        },
      }}
    />
  ) : null;
  return <div className={styles.container}>{barChart}</div>;
};

export default BarChart;
