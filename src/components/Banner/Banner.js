import React from "react";
import CovidBanner from "../../images/Covid.png";
import styles from "./Banner.module.css";
import flag from "../../images/flag.jpg";
const banner = (props) => {
  return (
    <div className="container">
      <div className={styles.flag}>
        <img src={flag} alt="Flag" />
        <h4>India Covid-19 Statistics</h4>
      </div>
      <div className={styles.covidBanner}>
        <img src={CovidBanner} alt="Covid Banner" />
      </div>
    </div>
  );
};

export default banner;
