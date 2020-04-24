import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./Spicker.module.css";
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
    <FormControl className="styles.formControl">
      <NativeSelect
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
      </NativeSelect>
    </FormControl>
  );
};
export default Spicker;
