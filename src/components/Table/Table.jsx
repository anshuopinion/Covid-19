import React, { useEffect, useState } from "react";
import { fetchDis } from "../../api";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import styles from "./Table.module.scss";

const FunTable = ({ stateName, theme }) => {
  const [fetchedDis, setFetchedDis] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedDis(await fetchDis());
    };
    fetchAPI();
  }, []);

  return stateName ? (
    <div className={theme ? styles.darkMode : styles.lightMode}>
      <div className={styles.container}>
        <h3>District Infected By Covid-19 in {stateName}</h3>
        <Table className={styles.contentTable}>
          <Thead>
            <Tr>
              <Th>District</Th>
              <Th>Confirmed</Th>
              <Th>Active</Th>
              <Th>Recovered</Th>
              <Th>Deaths</Th>
            </Tr>
          </Thead>
          {fetchedDis.map((each, j) => {
            if (each.state === stateName) {
              return (
                <Tbody key={j}>
                  {each.districtData.map((disData, i) => (
                    <Tr key={i}>
                      <Td className={styles.dis}>{disData.district}</Td>
                      <Td>
                        {disData.confirmed === 0 ? "-" : disData.confirmed}
                      </Td>
                      <Td>{disData.active === 0 ? "-" : disData.active}</Td>
                      <Td>
                        {disData.recovered === 0 ? "-" : disData.recovered}
                      </Td>
                      <Td>{disData.deceased === 0 ? "-" : disData.deceased}</Td>
                    </Tr>
                  ))}
                </Tbody>
              );
            }
            return <Tbody key={j}></Tbody>;
          })}
        </Table>
      </div>
    </div>
  ) : null;
};
export default FunTable;
