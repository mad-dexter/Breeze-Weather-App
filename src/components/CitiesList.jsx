import { useEffect } from "react";
import { useCityContext } from "../context/CityContext";
import styles from "./CitiesList.module.css";
import CityItem from "./CityItem";

function CitiesList() {
  const { selectedCityList, getCurrentConditionForSavedCities } =
    useCityContext();

  useEffect(function () {
    // Load the current weather condition
    getCurrentConditionForSavedCities();
  }, []);

  return (
    <section className={styles.cityData}>
      <h3 className="headingTertiary">Saved Cities</h3>
      {selectedCityList.map((item) => (
        <CityItem
          cityName={item.cityName}
          key={item.cityID}
          cityID={item.cityID}
          currentCondition={item.currentCondition}
        ></CityItem>
      ))}
    </section>
  );
}

export default CitiesList;
