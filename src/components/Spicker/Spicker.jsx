import React, { useState, useEffect } from "react";
// import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./Spicker.module.scss";
import { fetchStates } from "../../api";

const Spicker = ({ handleStateChange }) => {
  const [fetchedStates, setFetchedStates] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedStates(await fetchStates());
    };
    fetchAPI();
  }, [setFetchedStates]);
  return (
    <div className={styles.selectorContainer}>
      <h3>Select State</h3>
      <select
        className={styles.selectState}
        defaultValue=""
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option value="">India</option>
        {fetchedStates.map((stateData, i) => (
          <option
            key={i}
            value={[
              stateData.stateName,
              stateData.confirmed,
              stateData.recovered,
              stateData.deaths,
            ]}
          >
            {stateData.stateName}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Spicker;
