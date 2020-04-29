import React from "react";
import styles from "./App.module.scss";
import Banner from "./components/Banner/Banner";
import {
  Cards,
  LineChart,
  Spicker,
  Footer,
  BarChart,
  Table,
} from "./components";
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
        dailyconfirmed: stateDataArray[4],
        dailydeaths: stateDataArray[5],
        dailyrecovered: stateDataArray[6],
      };
      const fetchedData = await fetchData(modifiedStateData);

      this.setState({ data: fetchedData, stateName: fetchedData.stateName });
    }
  };
  render() {
    const { data, stateName } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.banner}>
          <Banner />
        </div>
        <div className={styles.linechart}>
          <LineChart />
        </div>
        <div className={styles.cards}>
          <Cards data={data} />
        </div>
        <div className={styles.tabled}>
          <Table stateName={stateName} />
        </div>
        <div className={styles.spicker}>
          <Spicker handleStateChange={this.handleStateChange} />
        </div>
        <div className={styles.barChart}>
          <BarChart data={data} />
        </div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}
export default App;
