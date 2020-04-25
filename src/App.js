import React from "react";
import styles from "./App.module.scss";
import Banner from "./components/Banner/Banner";
import { Cards, Chart, Spicker, Footer } from "./components";
import { fetchData } from "./api";
class App extends React.Component {
  state = {
    data: {},
    stateName: "",
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
      };
      const fetchedData = await fetchData(modifiedStateData);

      this.setState({ data: fetchedData, stateName: fetchedData.stateName });
    }
  };
  render() {
    const { data, stateName } = this.state;
    return (
      <div className={styles.container}>
        <Banner className={styles.banner} />
        <Cards data={data} className={styles.cards} />
        <Spicker
          className={styles.spicker}
          handleStateChange={this.handleStateChange}
        />
        <Chart className={styles.chart} data={data} stateName={stateName} />
        <Footer className={styles.footer} />
      </div>
    );
  }
}
export default App;
