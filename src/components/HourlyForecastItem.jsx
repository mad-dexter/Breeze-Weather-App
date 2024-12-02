import { useApplicationContext } from "../context/ApplicationContext";
import styles from "./HourlyForecastItem.module.css";

function extractTimeForUI(date) {
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    time.splice(3, 2);
    return time.join(""); // return adjusted time or original string
  }

  const formattedTime = tConvert(
    String(date).substring(
      String(date).indexOf("T") + 1,
      String(date).lastIndexOf("+")
    )
  );

  return formattedTime;
}

function HourlyForecastItem({ hourlyForecast }) {
  const { convertTemperature } = useApplicationContext();

  return (
    <div className={styles.forecastItem}>
      <p className="forecastTertiary">
        {extractTimeForUI(hourlyForecast.DateTime)}
      </p>
      <img
        src={`../assets/weatherIcons/${String(
          hourlyForecast.WeatherIcon
        ).padStart(2, "0")}-s.png`}
        className="weatherIconSmall"
      />
      <p className="siblingHeadingTertiary">{`${convertTemperature(
        hourlyForecast.Temperature?.Value
      )}`}</p>
    </div>
  );
}

export default HourlyForecastItem;
