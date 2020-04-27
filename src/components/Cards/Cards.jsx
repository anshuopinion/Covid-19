import React from "react";
// import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.scss";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({
  data: {
    date,
    totalconfirmed,
    totaldeceased,
    totalrecovered,
    dailyconfirmed,
    dailyrecovered,
    dailydeceased,
  },
}) => {
  // Cards Data array
  const totalactive =
    parseInt(totalconfirmed) -
    (parseInt(totaldeceased) + parseInt(totalrecovered));
  const cardData = [
    {
      cardName: "Confirmed",
      daily: dailyconfirmed,
      count: parseInt(totalconfirmed),
      date: `${date} 2020`,
      styleCard: styles.card,
      styleColor: styles.infectedColor,
      styleBorder: styles.infected,
    },
    {
      cardName: "Active",
      daily: dailyconfirmed - dailyrecovered - dailydeceased,
      count: totalactive,
      styleColor: styles.activeColor,
      styleBorder: styles.active,
    },
    {
      cardName: "Recovered",
      daily: parseInt(dailyrecovered),
      count: parseInt(totalrecovered),
      styleColor: styles.recoveredColor,
      styleBorder: styles.recovered,
    },
    {
      cardName: "Deaths",
      daily: parseInt(dailydeceased),
      count: parseInt(totaldeceased),
      styleColor: styles.deathsColor,
      styleBorder: styles.deaths,
    },
  ];

  if (!totalconfirmed) {
    return "Loading.....";
  } else {
    return (
      <div className={styles.container}>
        <h4 className={styles.date}>{`${date} 2020`}</h4>
        <div className={styles.mainGrid}>
          {cardData.map((card, id) => (
            <div className={cx(styles.card, card.styleBorder)} key={id}>
              <div className={styles.cardContent}>
                <h4 className={styles.cardName}>{card.cardName}</h4>
                <h4 className={styles.counter}>
                  <CountUp
                    start={0}
                    end={card.count}
                    duration={2.5}
                    seperation=","
                  />
                </h4>
                <h4 className={styles.daily}>[ + {card.daily} ]</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
export default Cards;
