import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import SearchCity from "./SearchCity";
import { useCityContext } from "../context/CityContext";
import Switch from "./Switch";

import styles from "./SearchHeader.module.css";
import { useApplicationContext } from "../context/ApplicationContext";

function SearchHeader() {
  // Accept the list of cities from the global context
  const { cities, isLoading, loadCities } = useCityContext();
  const {
    dayMode,
    unit: unitContext,
    toggleUnit,
    toggleDayMode,
  } = useApplicationContext();

  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState(unitContext === "F" ? false : true);

  useEffect(
    function () {
      loadCities(query);
    },
    [query]
  );

  useEffect(
    function () {
      // Toggle dark mode when ever the app changes
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [dayMode]
  );

  function onUnitChange(checkBoxVal) {
    setUnit(checkBoxVal);
    if (checkBoxVal) {
      // Here the code for celcius should be triggered
      toggleUnit("C");
    } else {
      // Here the code for farenheight should be triggered
      toggleUnit("F");
    }
  }

  function ondayNightChange(checkBoxVal) {
    toggleDayMode(checkBoxVal);
  }

  if (isLoading) return <Spinner />;

  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder="Search for cities"
        className={styles.searchTextBox}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul id="cityList" className={styles.cityList}>
        {cities.map((city) => (
          <SearchCity
            key={city.Key}
            cityName={city.LocalizedName}
            cityID={city.Key}
          />
        ))}
      </ul>

      {/* The utility controls */}
      {!window.location.href.endsWith("/") ? (
        <div className="inline-double align-center justify-items-center">
          <Switch
            id="unitSwitch"
            valueProp={unit}
            onChange={onUnitChange}
            leftText={"°C"}
            rightText={"°F"}
          />
          <Switch
            id="daySwitch"
            valueProp={dayMode}
            onChange={ondayNightChange}
            leftText={<ion-icon name="moon" class="icon-medium"></ion-icon>}
            rightText={<ion-icon name="sunny" class="icon-medium"></ion-icon>}
          />
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

export default SearchHeader;
