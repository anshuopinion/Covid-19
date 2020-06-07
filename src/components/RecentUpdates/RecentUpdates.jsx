import React, { useEffect, useState } from "react";
import { fetchRecentUpdates } from "../../api/index";
import { formatDistance, format } from "date-fns";
import styles from "./RecentUpdates.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
const RecentUpdates = () => {
  const [fetchedRecentUpdates, setFetchedRecentUpdates] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedRecentUpdates(await fetchRecentUpdates());
    };
    fetchAPI();
  }, []);

  const filteredRecentUpdates = fetchedRecentUpdates
    .filter((recentUpdate, i) => {
      if (fetchedRecentUpdates.length - 15 <= i) {
        return recentUpdate;
      } else return null;
    })
    .reverse();

  const showUpdates = () => {
    setIsUpdate(!isUpdate);
  };

  const updates = (
    <div className={styles.Container}>
      <h3 className={styles.CurrentDate}>{format(new Date(), `d MMM`)}</h3>
      <div className={styles.UpdateContainer}>
        {filteredRecentUpdates.map((recentUpdate, i) => {
          const timeUpdate = new Date(recentUpdate.timestamp * 1000);

          recentUpdate.update = recentUpdate.update.replace("\n", "<br>");
          return (
            <div key={i} className={styles.Updates}>
              <h4
                dangerouslySetInnerHTML={{
                  __html: recentUpdate.update,
                }}
              ></h4>
              <div>
                <p>{formatDistance(timeUpdate, new Date()) + " ago"} </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={styles.MainBox}>
      <button className={styles.BtnRecent} onClick={showUpdates}>
        Recent Updates{"   "}
        <i>
          <FontAwesomeIcon icon={faBell} />
        </i>
      </button>
      {isUpdate ? updates : null}
    </div>
  );
};
export default RecentUpdates;
