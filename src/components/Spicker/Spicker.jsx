import React, { useState, useEffect } from "react";
// import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./Spicker.module.scss";
import { fetchStates } from "../../api";

const Spicker = ({ handleStateChange, theme }) => {
  const [fetchedStates, setFetchedStates] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedStates(await fetchStates());
    };
    fetchAPI();
  }, [setFetchedStates]);

  return (
    <div className={theme ? styles.darkMode : styles.lightMode}>
      <div className={styles.selectorContainer}>
        <h3>Select State</h3>
        <select
          className={styles.selectState}
          defaultValue=""
          onChange={(e) => handleStateChange(e.target.value)}
        >
          <option value="">India</option>
          {fetchedStates
            .sort((a, b) => {
              if (a.stateName.toLowerCase() < b.stateName.toLowerCase())
                return -1;
              if (a.stateName.toLowerCase() > b.stateName.toLowerCase())
                return 1;
              return 0;
            })
            .map((stateData, i) => (
              <option
                key={i}
                value={[
                  stateData.stateName,
                  stateData.confirmed,
                  stateData.recovered,
                  stateData.deaths,
                  stateData.dailyconfirmed,
                  stateData.dailydeaths,
                  stateData.dailyrecovered,
                ]}
              >
                {stateData.stateName}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
export default Spicker;
