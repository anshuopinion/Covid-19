import React from "react";
import CovidBanner from "../../images/Covid.png";
import styles from "./Banner.module.scss";
import flag from "../../images/flag.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
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
            <FontAwesomeIcon
              className={styles.Icon}
              icon={theme ? faSun : faMoon}
              size="3x"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default banner;
