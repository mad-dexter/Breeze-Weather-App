import { useCityContext } from "../context/CityContext";
import WeeklyForecastItem from "./WeeklyForecastItem";

import styles from "./WeeklyForecast.module.css";

function WeeklyForecast() {
  const { dailyForecast5, isLoading } = useCityContext();

  if (isLoading) return <></>;

  return (
    <section className={styles.forecastData}>
      <h3 className="headingTertiary">5-days forecast</h3>

      {dailyForecast5.map((item) => (
        <WeeklyForecastItem key={item.EpochDate} forecast={item} />
      ))}
    </section>
  );
}

export default WeeklyForecast;
