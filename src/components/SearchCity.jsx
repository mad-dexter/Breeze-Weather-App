import { Link } from "react-router-dom";

import styles from "./SearchCity.module.css";

function SearchCity({ cityName, cityID }) {
  return (
    <li className={styles.cityItem}>
      <Link to={`/${cityID}`}>{cityName}</Link>
    </li>
  );
}

export default SearchCity;
