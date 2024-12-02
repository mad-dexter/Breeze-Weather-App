import { useApplicationContext } from "../context/ApplicationContext";
import { useCityContext } from "../context/CityContext";
import styles from "./MoreWeatherInfo.module.css";

function MoreWeatherInfo() {
  const { currentCondition, isLoading } = useCityContext();
  const { convertTemperature } = useApplicationContext();

  if (isLoading) return <></>;

  return (
    <section className={styles.moreWeatherInfo}>
      <h3 className="headingTertiary">Air conditions</h3>
      <div className={styles.moreWeatherItemContainer}>
        <div className={styles.moreWeatherItem}>
          <ion-icon
            name="thermometer-outline"
            class="icon-small icon-light"
          ></ion-icon>
          <div className={styles.moreWeatherText}>
            <p className="forecastTertiary">Real Feel</p>
            <p className="siblingHeadingTertiary">
              {`${convertTemperature(
                currentCondition.Temperature?.Imperial?.Value
              )}`}
            </p>
          </div>
        </div>

        <div className={styles.moreWeatherItem}>
          <ion-icon
            name="leaf-outline"
            class="icon-small icon-light"
          ></ion-icon>
          <div className={styles.moreWeatherText}>
            <p className="forecastTertiary">Wind</p>
            <p className="siblingHeadingTertiary">
              {`${currentCondition.Wind?.Speed?.Metric?.Value} ${currentCondition.Wind?.Speed?.Metric?.Unit}`}
            </p>
          </div>
        </div>

        <div className={styles.moreWeatherItem}>
          <ion-icon
            name="water-outline"
            class="icon-small icon-light"
          ></ion-icon>
          <div className={styles.moreWeatherText}>
            <p className="forecastTertiary">Precipitation</p>
            <p className="siblingHeadingTertiary">
              {`${currentCondition.PrecipitationSummary?.Precipitation?.Metric?.Value} ${currentCondition.PrecipitationSummary?.Precipitation?.Metric?.Unit}`}
            </p>
          </div>
        </div>

        <div className={styles.moreWeatherItem}>
          <ion-icon
            name="sunny-outline"
            class="icon-small icon-light"
          ></ion-icon>
          <div className={styles.moreWeatherText}>
            <p className="forecastTertiary">UV Index</p>
            <p className="siblingHeadingTertiary">
              {`${currentCondition.UVIndex} (${currentCondition.UVIndexText})`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MoreWeatherInfo;
