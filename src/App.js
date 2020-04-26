import React from "react";
import styles from "./App.module.scss";
import Banner from "./components/Banner/Banner";
import { Cards, LineChart, Spicker, Footer, BarChart } from "./components";
import { fetchData } from "./api";
class App extends React.Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleStateChange = async (stateData) => {
    if (!stateData) {
      const fetchedData = await fetchData();
      this.setState({ data: fetchedData, stateName: "" });
    } else {
      const stateDataArray = stateData.split(",");

      const modifiedStateData = {
        stateName: stateDataArray[0],
        confirmed: stateDataArray[1],
        recovered: stateDataArray[2],
        deaths: stateDataArray[3],
        dailyconfirmed: stateDataArray[4],
        dailydeaths: stateDataArray[5],
        dailyrecovered: stateDataArray[6],
      };
      const fetchedData = await fetchData(modifiedStateData);
      console.log(modifiedStateData);
      this.setState({ data: fetchedData, stateName: fetchedData.stateName });
    }
  };
  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Banner className={styles.banner} />
        <LineChart className={styles.chart} />
        <Cards data={data} className={styles.cards} />
        <Spicker
          className={styles.spicker}
          handleStateChange={this.handleStateChange}
        />
        <BarChart data={data} />
        <Footer className={styles.footer} />
      </div>
    );
  }
}
export default App;
