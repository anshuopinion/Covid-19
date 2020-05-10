import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Banner from "./components/Banner/Banner";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import {
  Cards,
  LineChart,
  Spicker,
  Footer,
  BarChart,
  Table,
  Zone,
  ToggleButton,
  RecentUpdates,
} from "./components";
import { fetchData } from "./api";

const GlobalStyle = createGlobalStyle`
body{
  background-color:${(props) =>
    props.theme.mode === true ? "#202040" : "#fff"};
  color::${(props) => (props.theme.mode === true ? "#fff" : "#202040")};
  transition: ${() => " background-color 250ms ease-in , color 300ms ease-out"};
}
`;

function App() {
  const [data, setData] = useState([]);
  const [stateName, setStateName] = useState("");
  const [theme, setTheme] = useState(getThemeMode());
  const [chartType, setChartType] = useState(4);

  useEffect(() => {
    const fetchedData = async () => {
      setData(await fetchData());
    };
    fetchedData();
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(theme));
  }, [theme]);

  function getThemeMode() {
    const saveThemeData = JSON.parse(localStorage.getItem("dark"));
    return saveThemeData || false;
  }

  const handleStateChange = async (stateData) => {
    if (!stateData) {
      const fetchedData = await fetchData();
      setStateName("");
      setData(fetchedData);
    } else {
      const stateDataArray = stateData.split(",");

      const modifiedStateData = {
        stateName: stateDataArray[0],
        confirmed: stateDataArray[1],
        recovered: stateDataArray[2],
        deaths: stateDataArray[3],
        dailyconfirmed: stateDataArray[4],
        dailydeaths: stateDataArray[5],
        dailyrecovered: stateDataArray[6],
      };
      const fetchedData = await fetchData(modifiedStateData);

      setData(fetchedData);
      setStateName(fetchedData.stateName);
      // this.setState({ data:, stateName: fetchedData.stateName });
    }
  };

  //change chart

  const changeChart = (value) => {
    setChartType(value);
  };

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <>
        <GlobalStyle />
        <div
          className={
            (styles.container, theme ? styles.darkMode : styles.lightMode)
          }
        >
          <div className={styles.banner}>
            <Banner setTheme={setTheme} theme={theme} />
          </div>
          <div>
            <RecentUpdates />
          </div>
          <div>
            <Zone />
          </div>

          <div className={styles.linechart}>
            <LineChart theme={theme} chartType={chartType} />
          </div>
          <div>
            <ToggleButton changeChart={changeChart} theme={theme} />
          </div>
          <div className={styles.cards}>
            <Cards data={data} theme={theme} />
          </div>
          <div className={styles.spicker}>
            <Spicker handleStateChange={handleStateChange} theme={theme} />
          </div>
          <div className={styles.barChart}>
            <BarChart data={data} theme={theme} />
          </div>

          <div className={styles.tabled}>
            <Table stateName={stateName} theme={theme} />
          </div>
          <div></div>
          <div className={styles.footer}>
            <Footer theme={theme} />
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
