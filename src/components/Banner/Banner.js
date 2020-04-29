import React from "react";
import CovidBanner from "../../images/Covid.png";
import styles from "./Banner.module.scss";
import flag from "../../images/flag.jpg";
const banner = ({ setTheme, theme }) => {
  return (
    <div className={theme ? styles.darkMode : styles.lightMode}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <img src={flag} alt="Flag" />
          <div className={styles.covidBanner}>
            <img src={CovidBanner} alt="Covid Banner" />
          </div>
          <div onClick={() => setTheme(!theme)} className={styles.tracker}>
            <i
              className={theme ? "far fa-sun  fa-3x" : "far fa-moon fa-3x"}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default banner;
