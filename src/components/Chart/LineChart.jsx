import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, defaults } from "react-chartjs-2";

import styles from "./LineChart.module.scss";
const LineChart = ({ theme }) => {
  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "average";
  defaults.global.tooltips.backgroundColor = "rgba(255, 255, 255, 0.8)";
  defaults.global.tooltips.displayColors = true;
  defaults.global.tooltips.borderColor = "#c62828";
  defaults.global.tooltips.borderWidth = 1;
  defaults.global.tooltips.titleFontColor = "#000";
  defaults.global.tooltips.bodyFontColor = "#000";
  defaults.global.tooltips.caretPadding = 4;
  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "nearest";
  defaults.global.legend.display = true;
  defaults.global.legend.position = "bottom";
  defaults.global.hover.intersect = false;
  defaults.scale.gridLines.drawOnChartArea = false;

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const trimmedDailyDate = dailyData.filter(({ date }, i) => {
    if (i > dailyData.length - 30) {
      return date;
    }
    return null;
  });

  const lineChart = trimmedDailyDate.length ? (
    <Line
      data={{
        labels: trimmedDailyDate.map(({ date }, i) => date),
        datasets: [
          {
            data: trimmedDailyDate.map(({ confirmed }) => confirmed),
            fill: "false",
            borderColor: "rgba(0,0,255,1)",
            backgroundColor: "rgba(0,0,255,1)",
            label: "Confirmed",

            pointHoverRadius: 2,
          },
          {
            data: trimmedDailyDate.map(({ recovered }) => recovered),
            fill: "false",
            backgroundColor: "rgba(0,255,0,1)",
            label: "Recovered",
            borderColor: "rgba(0,255,0,1)",
            pointHoverRadius: 2,
          },
          {
            data: trimmedDailyDate.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "rgba(255,0,0,1)",
            backgroundColor: "rgba(255,0,0,1)",
            fill: false,
          },
        ],
      }}
      options={{
        responsive: true,

        legend: {
          display: false,
          labels: { fontColor: theme ? "#fff" : "#000", fontSize: 10 },
        },
        title: {
          display: true,
          text: "India Covid-19 Chart",
          fontSize: 10,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                color: theme ? "#fff" : "#000",
              },

              position: "right",
              ticks: {
                maxTicksLimit: 5,
                fontColor: theme ? "#fff" : "#000",
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
                maxTicksLimit: 10,
                fontColor: theme ? "#fff" : "#000",
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.LineChart}>{lineChart}</div>
    </div>
  );
};
export default LineChart;
