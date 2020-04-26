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
    const dailyconfirmed = modifiedData.dailyconfirmed;
    const dailydeceased = modifiedData.dailydeaths;
    const dailyrecovered = modifiedData.dailyrecovered;
    return {
      date,
      stateName,
      totalconfirmed,
      totaldeceased,
      totalrecovered,
      dailyconfirmed,
      dailydeceased,
      dailyrecovered,
    };
  }
  try {
    //stateModifer
    const {
      data: { cases_time_series: timeStamp },
    } = await axios.get(`${url1}`);

    const {
      date,
      totalconfirmed,
      totaldeceased,
      totalrecovered,
      dailyrecovered,
      dailyconfirmed,
      dailydeceased,
    } = timeStamp[timeStamp.length - 1];
    return {
      date,
      totalconfirmed,
      totaldeceased,
      totalrecovered,
      dailyrecovered,
      dailyconfirmed,
      dailydeceased,
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
      dailyconfirmed: dailyData.dailyconfirmed,
      dailydeaths: dailyData.dailydeceased,
      dailyrecovered: dailyData.dailyrecovered,
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
      dailyconfirmed: stateData.deltaconfirmed,
      dailydeaths: stateData.deltadeaths,
      dailyrecovered: stateData.deltarecovered,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
