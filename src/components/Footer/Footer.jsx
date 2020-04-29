import React from "react";
import styles from "./Footer.module.scss";
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
          <i className="fab fa-youtube fa-2x"></i>
          <div> Subscribe Us. On Youtube</div>
        </a>
        <a
          href="https://telegram.me/anshusopinion"
          className={(styles.button, styles.telegram)}
        >
          <i className="fab fa-telegram fa-2x"> </i>
          <div>Join Our Telegram Channel</div>
        </a>

        <p>Covid-19 Tracker is Made by &copy; AnshuOpinion 2020</p>
      </footer>
    </div>
  );
};
export default Footer;
