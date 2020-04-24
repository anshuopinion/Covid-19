import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({
  data: { date, totalconfirmed, totaldeceased, totalrecovered },
}) => {
  if (!totalconfirmed) {
    return "Loading.....";
    console.log(totalconfirmed);
  } else {
    return (
      <div className={styles.container}>
        <Grid
          container
          spacing={3}
          justify="center"
          className={styles.gridTotal}
        >
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.infected)}
          >
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                className={styles.infectedColor}
              >
                Infected
              </Typography>
              <Typography variant="h5" className={styles.infectedColor}>
                <CountUp
                  start={0}
                  end={parseInt(totalconfirmed)}
                  duration={2.5}
                  seperation=","
                />
              </Typography>

              <Typography color="textSecondary">{`${date} 2020`}</Typography>
              <Typography variant="body2">
                Number of active cases of covid-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.deaths)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Deaths
              </Typography>
              <Typography variant="h5" className={styles.deathsColor}>
                <CountUp
                  start={0}
                  end={parseInt(totaldeceased)}
                  duration={2.5}
                  seperation=","
                />
              </Typography>
              <Typography color="textSecondary">{`${date} 2020`}</Typography>
              <Typography variant="body2">
                Number of deaths caused by covid-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recovered
              </Typography>
              <Typography variant="h5" className={styles.recoveredColor}>
                <CountUp
                  start={0}
                  end={parseInt(totalrecovered)}
                  duration={2.5}
                  seperation=","
                />
              </Typography>
              <Typography color="textSecondary">{`${date} 2020`}</Typography>
              <Typography variant="body2">
                Number of recoveries from covid-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Cards;
