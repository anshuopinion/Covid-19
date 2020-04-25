import React from "react";
// import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.scss";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({
  data: { date, totalconfirmed, totaldeceased, totalrecovered },
}) => {
  // Cards Data array
  const totalactive =
    parseInt(totalconfirmed) -
    (parseInt(totaldeceased) + parseInt(totalrecovered));
  const cardData = [
    {
      cardName: "Confirmed",
      count: parseInt(totalconfirmed),
      date: `${date} 2020`,
      para: "No. of Confirmed cases of covid-19 ",
      styleCard: styles.card,
      styleColor: styles.infectedColor,
      styleBorder: styles.infected,
    },
    {
      cardName: "Active",
      count: totalactive,
      para: "No. of Active cases of covid-19 ",
      styleColor: styles.activeColor,
      styleBorder: styles.active,
    },
    {
      cardName: "Recovered",
      count: parseInt(totalrecovered),
      para: "No.  of  recoveries from covid-19 ",
      styleColor: styles.recoveredColor,
      styleBorder: styles.recovered,
    },
    {
      cardName: "Deaths",
      count: parseInt(totaldeceased),
      para: "No.  of  deaths from covid-19 ",
      styleColor: styles.deathsColor,
      styleBorder: styles.deaths,
    },
  ];

  if (!totalconfirmed) {
    return "Loading.....";
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {cardData.map((card) => (
            <div className={cx(styles.card, card.styleBorder)}>
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

                <h4>{`${date} 2020`}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
export default Cards;
