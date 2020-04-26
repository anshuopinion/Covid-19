import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line } from "react-chartjs-2";

import styles from "./LineChart.module.scss";
const LineChart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "blue",
            fill: false,
          },
          {
            data: dailyData.map(({ recovered }) => recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0,255,0,0.5)",
            fill: false,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: false,
          },
        ],
      }}
      option={{
        title: {
          display: true,
          text: "India Covid-19 Chart",
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 2,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <h2>National Covid- 19 Chart</h2>
      {lineChart}
    </div>
  );
};
export default LineChart;
