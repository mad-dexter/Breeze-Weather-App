import { useApplicationContext } from "../context/ApplicationContext";
import { useCityContext } from "../context/CityContext";
import styles from "./TodayWeather.module.css";

function TodayWeather() {
  const { currentCondition, isLoading, selectedCity } = useCityContext();
  const { convertTemperature } = useApplicationContext();

  if (isLoading) return <></>;

  return (
    <section className={styles.todayWeather}>
      <div className={styles.weatherInfo}>
        <h1 className={styles.primaryHeading}>
          {`${selectedCity.cityName} `}
          {<span className="flag">{selectedCity.emoji}</span>}
        </h1>
        <p className={styles.citySubheader}>{currentCondition.WeatherText}</p>
        {currentCondition.HasPrecipitation ? (
          <p className={styles.citySubheader}>
            Chance of rain: {currentCondition.PrecipitationType}%
          </p>
        ) : (
          <></>
        )}

        <p className={styles.siblingHeading}>
          {convertTemperature(currentCondition.Temperature?.Imperial?.Value)}
        </p>
      </div>
      <div>
        <img
          src={`../assets/weatherIcons/${String(
            currentCondition.WeatherIcon
          ).padStart(2, "0")}-s.png`}
          className={styles.weatherIcon}
        />
      </div>
    </section>
  );
}

export default TodayWeather;
