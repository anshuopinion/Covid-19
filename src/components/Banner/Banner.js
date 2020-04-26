import React from "react";
import CovidBanner from "../../images/Covid.png";
import styles from "./Banner.module.scss";
import flag from "../../images/flag.jpg";
const banner = (props) => {
  return (
    <div className="container">
      <div className={styles.banner}>
        <img src={flag} alt="Flag" />
        <div className={styles.covidBanner}>
          <img src={CovidBanner} alt="Covid Banner" />
        </div>
        <div className={styles.tracker}>
          {" "}
          <h4>Indian Tracker</h4>
        </div>
      </div>
    </div>
  );
};

export default banner;
