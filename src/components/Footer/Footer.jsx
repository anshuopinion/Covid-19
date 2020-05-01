import React from "react";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faTelegram } from "@fortawesome/free-brands-svg-icons";
const Footer = ({ theme }) => {
  return (
    <div
      className={(styles.container, theme ? styles.darkMode : styles.lightMode)}
    >
      <footer>
        <a
          href="https://youtube.com/anshuopinion"
          className={(styles.button, styles.youtube)}
        >
          <FontAwesomeIcon className={styles.Icon} icon={faYoutube} size="2x" />
          <div> Subscribe Us. On Youtube</div>
        </a>
        <a
          href="https://telegram.me/anshusopinion"
          className={(styles.button, styles.telegram)}
        >
          <FontAwesomeIcon
            className={styles.Icon}
            icon={faTelegram}
            size="2x"
          />
          <div>Join Our Telegram Channel</div>
        </a>

        <p>Covid-19 Tracker is Made by &copy; AnshuOpinion 2020</p>
      </footer>
    </div>
  );
};
export default Footer;
