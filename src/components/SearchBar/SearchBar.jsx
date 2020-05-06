import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ searchZone }) => {
  return (
    <div>
      <form>
        <FontAwesomeIcon icon={faSearch} size="2x" className={styles.Icon} />
        <input
          type="text"
          onChange={searchZone}
          placeholder="Search Your District"
        />
      </form>
    </div>
  );
};

export default SearchBar;
