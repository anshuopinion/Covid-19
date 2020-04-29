import React, { useEffect, useState } from "react";
import { fetchDis } from "../../api";
import styles from "./Table.module.scss";
const Table = ({ stateName }) => {
  const [fetchedDis, setFetchedDis] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedDis(await fetchDis());
    };
    fetchAPI();
  }, []);

  return stateName ? (
    <div className={styles.container}>
      <h3>District Infected By Covid-19 in {stateName}</h3>
      <table className={styles.contentTable}>
        <thead>
          <tr>
            <th>District</th>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>
        {fetchedDis.map((each, j) => {
          if (each.state === stateName) {
            return (
              <tbody key={j}>
                {each.districtData.map((disData, i) => (
                  <tr key={i}>
                    <td className={styles.dis}>{disData.district}</td>
                    <td>{disData.confirmed}</td>
                    <td>{disData.active}</td>
                    <td>{disData.recovered}</td>
                    <td>{disData.deceased}</td>
                  </tr>
                ))}
              </tbody>
            );
          }
          return <tbody key={j}></tbody>;
        })}
      </table>
    </div>
  ) : null;
};
export default Table;
