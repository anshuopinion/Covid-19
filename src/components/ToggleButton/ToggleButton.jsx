import React from "react";
import styles from "./ToggleButton.module.scss";
function ToggleButton({ changeChart, theme }) {
  return (
    <div className={theme ? styles.darkMode : styles.lightMode}>
      <div className={styles.container}>
        <button className={styles.confirmed} onClick={() => changeChart(0)}>
          Confirmed
        </button>
        <button className={styles.active} onClick={() => changeChart(1)}>
          Active
        </button>
        <button className={styles.recovered} onClick={() => changeChart(2)}>
          Recovered
        </button>
        <button className={styles.deaths} onClick={() => changeChart(3)}>
          Deaths
        </button>
      </div>
    </div>
  );
}
export default ToggleButton;
