import styles from "./NoWeatherData.module.css";

function NoWeatherData() {
  return (
    <div className={styles.noWeatherData}>
      🤔 No Weather data to display. <br />
      <span style={{ fontSize: "2rem", fontWeight: 500 }}>
        Please search for a location or select any of the pre-searched
        locations.
      </span>
    </div>
  );
}

export default NoWeatherData;
