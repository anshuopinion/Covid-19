import axios from "axios";
const url1 = "https://api.covid19india.org/data.json";
export const fetchData = async (modifiedData) => {
  if (modifiedData) {
    const {
      data: { cases_time_series: timeStamp },
    } = await axios.get(`${url1}`);

    const { date } = timeStamp[timeStamp.length - 1];
    const stateName = modifiedData.stateName;
    const totalconfirmed = modifiedData.confirmed;
    const totaldeceased = modifiedData.deaths;
    const totalrecovered = modifiedData.recovered;
    return { date, stateName, totalconfirmed, totaldeceased, totalrecovered };
  }
  try {
    //stateModifer
    const {
      data: { cases_time_series: timeStamp },
    } = await axios.get(`${url1}`);

    const { date, totalconfirmed, totaldeceased, totalrecovered } = timeStamp[
      timeStamp.length - 1
    ];
    return {
      date,
      totalconfirmed,
      totaldeceased,
      totalrecovered,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const {
      data: { cases_time_series: timeStamp },
    } = await axios.get(`${url1}`);

    const modifiedData = timeStamp.map((dailyData) => ({
      confirmed: dailyData.dailyconfirmed,
      deaths: dailyData.dailydeceased,
      recovered: dailyData.dailyrecovered,
      date: dailyData.date,
    }));
    return modifiedData;
  } catch (error) {
    console.log("Error");
  }
};

export const fetchStates = async () => {
  try {
    const {
      data: { statewise },
    } = await axios.get(`${url1}`);

    const modifiedData = statewise.map((stateData) => ({
      stateName: stateData.state,
      confirmed: stateData.confirmed,
      recovered: stateData.recovered,
      deaths: stateData.deaths,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
