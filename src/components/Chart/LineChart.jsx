import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, defaults } from "react-chartjs-2";

import styles from "./LineChart.module.scss";
const LineChart = () => {
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
        labels: trimmedDailyDate.map(({ date }, i) => {
          if (i === 0) {
            return 0;
          }
          return date;
        }),
        datasets: [
          {
            data: trimmedDailyDate.map(({ confirmed }) => confirmed),
            fill: "false",
            backgroundColor: "blue",
            label: "Confirmed",
            borderColor: "blue",
            pointHoverRadius: 2,
          },
          {
            data: trimmedDailyDate.map(({ recovered }) => recovered),
            fill: "false",
            backgroundColor: "green",
            label: "Recovered",
            borderColor: "green",
            pointHoverRadius: 2,
          },
          {
            data: trimmedDailyDate.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: false,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: "India Covid-19 Chart",
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              position: "right",
              ticks: {
                maxTicksLimit: 5,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                maxTicksLimit: 15,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};
export default LineChart;
