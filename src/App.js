import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Banner from "./components/Banner/Banner";
import {
  Cards,
  LineChart,
  Spicker,
  Footer,
  BarChart,
  Table,
} from "./components";
import { fetchData } from "./api";
const App = () => {
  const [data, setData] = useState([]);
  const [stateName, setStateName] = useState("");
  const [theme, setTheme] = useState(getThemeMode());

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

  return (
    <div className={theme ? styles.darkMode : styles.lightMode}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <Banner setTheme={setTheme} theme={theme} />
        </div>
        <div className={styles.linechart}>
          <LineChart theme={theme} />
        </div>
        <div className={styles.cards}>
          <Cards data={data} theme={theme} />
        </div>
        <div className={styles.tabled}>
          <Table stateName={stateName} theme={theme} />
        </div>
        <div className={styles.spicker}>
          <Spicker handleStateChange={handleStateChange} theme={theme} />
        </div>
        <div className={styles.barChart}>
          <BarChart data={data} theme={theme} />
        </div>

        <div className={styles.footer}>
          <Footer theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default App;
