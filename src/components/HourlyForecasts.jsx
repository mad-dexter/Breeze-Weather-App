import { useCityContext } from "../context/CityContext";
import HourlyForecastItem from "./HourlyForecastItem";

import styles from "./HourlyForecasts.module.css";

function HourlyForecasts() {
  const { hourlyForecast, isLoading } = useCityContext();

  if (isLoading) return <></>;

  return (
    <section className={styles.forecast}>
      <h3 className="headingTertiary">Today&apos;s Forecast</h3>
      <div className={styles.forecastItems}>
        {hourlyForecast.map((item) => (
          <HourlyForecastItem key={item.EpochDateTime} hourlyForecast={item} />
        ))}
      </div>
    </section>
  );
}

export default HourlyForecasts;
