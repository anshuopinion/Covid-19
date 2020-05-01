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
  theme,
}) => {
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Active", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: theme
              ? [
                  "rgba(0, 0, 255, 1)",
                  "rgba(255, 145, 0,1)",
                  "rgba(0, 255,0, 1)",
                  "rgba(255, 0, 0, 1)",
                ]
              : [
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
        scaleLabel: "<%= Number(value).toFixed(2).replace('.', ',') + ' $'%>",

        legend: { display: false },
        titile: { display: true, text: `Current State in ${stateName}` },

        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: theme ? "#fff" : "#000",
              },
              ticks: {
                fontColor: theme ? "#fff" : "#000",
                callback: (value) => {
                  if (value >= 100) return value / 1000 + "k";
                  else return value;
                },
                fontSize: 10,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
                color: theme ? "#fff" : "#000",
              },
              ticks: {
                fontColor: theme ? "#fff" : "#000",
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
