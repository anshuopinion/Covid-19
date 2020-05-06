import React, { useEffect, useState } from "react";
import { fetchZone } from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchBar from "../../SearchBar/SearchBar";
import styles from "./Zone.module.scss";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Zone = () => {
  const [fetchedZone, setFetchedZone] = useState([]);
  const [districtName, setDistrictName] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedZone(await fetchZone());
    };

    fetchAPI();
  }, []);

  const searchZone = (event) => {
    setDistrictName(event.target.value);
  };

  const filteredZones = fetchedZone.filter((zones) => {
    return (
      zones.district.toLowerCase().indexOf(districtName.toLowerCase()) !== -1
    );
  });

  return (
    <div className={styles.container}>
      <h3> District Zone Tracker</h3>

      <SearchBar searchZone={searchZone} />
      <div className={styles.TableWapper}>
        <table>
          <thead>
            <tr>
              <th>District</th>
              <th>State</th>
              <th>Zone</th>
            </tr>
          </thead>
          <tbody>
            {filteredZones.map((data, i) => (
              <tr key={i}>
                <td>{data.district}</td>
                <td>{data.state}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: data.zone }}
                  />
                  <br />
                  {data.zone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Zone;
